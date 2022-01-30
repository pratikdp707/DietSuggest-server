const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { response } = require('express');
var responseHelper = require('../helper/responseHelper')
var User = require('../models/User')
const jwt_secret_key = process.env.JWT_SECRET_KEY;
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT)

exports.registerController = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (user) {
            responseHelper.error(res, "Sorry! User with this email already exists");
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        user = await User.create({
            name: name,
            email: email,
            password: hashedPassword
        })
        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = await jwt.sign(data, jwt_secret_key);
        responseHelper.success(res, authToken);
    } catch (error) {
        responseHelper.error(res, error);
    }
}

exports.loginController = async (req, res) => {
    const { email, password } = req.body

    try {
        let user = await User.findOne({ email });
        if (!user) {
            responseHelper.error(res, "Sorry! No user with this email found");
        }

        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            responseHelper.error(res, "You have entered incorrect password")
        }
        const payload = {
            user: {
                id: user.id
            }
        }

        const authToken = jwt.sign(payload, jwt_secret_key);
        responseHelper.success(res, authToken);

    } catch (error) {
        responseHelper.error(res, error);
    }
}

exports.getUserController = async (req, res) => {
    const authToken = req.params.token
    console.log(authToken)
    try {
        if (!authToken) {
            responseHelper.error(res, "Authentication Failed");
        }
        const data = jwt.verify(authToken, jwt_secret_key);
        console.log(data);
        const id = data.user.id;
        console.log(id);
        const user = await User.findById(id).select("-password");
        console.log(user);
        responseHelper.success(res, user);

    } catch (error) {
        responseHelper.error(res, error);
    }
}

exports.googleLoginController = async (req, res) => {
    const { idToken } = req.body;
    // console.log(idToken);
    try {
        const googleUser = await client.verifyIdToken({ idToken, audience: process.env.GOOGLE_CLIENT })
        const { email_verified, email, name, picture } = googleUser.payload;
        if (email_verified) {
            const user = await User.findOne({ email });
            if (user) {
                const payload = {
                    user: {
                        id: user.id
                    }
                }
                const authToken = jwt.sign(payload, jwt_secret_key);
                responseHelper.success(res, authToken);
            } else {
                const password = email + name;
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(password, salt);
                newUser = await User.create({
                    name: name,
                    password: hashedPassword,
                    email: email,
                    pic_url: picture
                })
                const payload = {
                    user: {
                        id: newUser.id
                    }
                }
                const authToken = jwt.sign(payload, jwt_secret_key);
                responseHelper.success(res, authToken);
            }
        }
    } catch (error) {
        responseHelper.error(res, error);
    }
}

exports.confirmEmailController = async (req, res) => {
    const { email } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            responseHelper.error(res, "Sorry! No user with this email exists");
        }
        responseHelper.success(res, user.email);
    } catch (error) {
        responseHelper.error(res, error);
    }
}

exports.changePasswordController = async (req, res) => {
    const {email, oldPassword, newPassword} = req.body;
    try {
        const user = await User.findOne({email});
        const passwordCompare = await bcrypt.compare(oldPassword, user.password);
        if(!passwordCompare){
            responseHelper.error(res, "Old password does not match.")
        }
        const salt =await bcrypt.genSalt(10);
        const hashedPassword =await bcrypt.hash(newPassword, salt);
        const result = await User.findOneAndUpdate({email}, {
            $set:{
                "password": hashedPassword
            }
        })
        if(result){
            responseHelper.success(res, "Your password has been changed");
        }

    } catch (error) {
        responseHelper.success(res, error);
    }
}

exports.updateDetailsController = async(req, res) => {
    const id = req.params.id;
    try {
        const user = await User.findByIdAndUpdate(id, req.body);
        if(user){
            await User.findByIdAndUpdate(id, {
                $set : {
                    "is_activated": true
                }
            })
        }
        responseHelper.success(res, user)
    } catch (error) {
        responseHelper.error(res, error);
    }
}