var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FoodSchema = new Schema({
    "Food":{
        type: String,
        required: true
    },
    "Category" : {
        type: String,
        required: true
    },
    "Quantity" : {
        type: String,
        required : false
    },
    "Calories" : {
        type: Number,
        required: false
    },
    "Carbs" : {
        type: Number,
        required : false
    },
    "Protein" : {
        type: Number,
        required : false
    },
    "Fats" : {
        type: Number,
        required : false
    }
})

var Food = mongoose.model("Food",FoodSchema);
module.exports = Food;