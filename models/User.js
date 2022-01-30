var mongoose = require('mongoose');
var genderType = require('../const/genderType')
var acitivityType = require('../const/activityType')
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    "name": {
        type: String,
        required: true
    },
    "age": {
        type: Number,
        required: false
    },
    "gender": {
        type: String,
        enum: genderType,
        required: false
    },
    "email": {
        type: String,
        required: true,
        unique: true
    },
    "password": {
        type: String,
        required: true
    },
    "pic_url": {
        type: String,
        required: false
    },
    "height": {
        type: Number,
        required: false
    },
    "weight": {
        type: Number,
        required: false
    },
    "activity_type": {
        type: String,
        enum: acitivityType,
        required: false
    },
    "created_date": {
        type: Date,
        required: false,
        default: new Date()
    },
    "is_activated": {
        type: Boolean,
        default: false
    }
});


var User = mongoose.model("User", UserSchema);

module.exports = User