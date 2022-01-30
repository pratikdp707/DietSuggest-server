var express = require('express');
var router = express.Router()



var {registerController, loginController, getUserController, googleLoginController, confirmEmailController, changePasswordController, updateDetailsController} = require('../controllers/auth.controller.js')


//Route 1 --- Register a User
router.post('/register', registerController)

//Route 2 --- User Login
router.post('/login', loginController)

//Route 3 --- Get logged in user details
router.post('/getUser/:token', getUserController)

//Route 4 --- Google Login
router.post('/googleLogin', googleLoginController)

//Route 5 --- Confirm Email
router.post('/confirmEmail', confirmEmailController);

//Route 6 --- Change Password
router.post('/changePassword', changePasswordController);

//Route 7 --- Update Details
router.post('/updateDetails/:id', updateDetailsController)

module.exports = router;