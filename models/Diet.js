var mongoose = require("mongoose");
var User = require("./User");
var Food = require("./Food");
var Schema = mongoose.Schema;

var DietSchema = new Schema({
    "user": {
        type: User.schema,
        required: true
    },
    "currentKiloCalorieRequirementPerDay": {
        type: String,
        required: true
    },
    "idealKiloCalorieRequirementPerDay": {
        type: String,
        required: true
    },
    "idealWeight": {
        type: String,
        required: true
    },
    "foodItems": {
        type: [Food.schema],
        required: false
    },
    "bmi": {
        type: String,
        required: true
    },
    "status": {
        type: String,
        required: true
    },
    "created_date": {
        type: Date,
        required: false
    },
    "modified_date": {
        type: Date,
        required: false
    }
});

var Diet = mongoose.model("Diet", DietSchema);
module.exports = Diet;
