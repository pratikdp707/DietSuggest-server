var food = require('../const/foodItems')
var dietHelper = require('./dietHelper')
var Food = require('../const/foodItems')

var container = {
    "calculateFoodMetricsForUser": function (user) {
        var idealCal = dietHelper.idealkCal(user);
        var breakFastCal = idealCal * 40 / 100;
        var lunchCal = idealCal * 35 / 100;
        var dinnerCal = idealCal * 25 / 100;
        console.log("breakFastCal : " + breakFastCal)
        console.log("lunchCal : " + lunchCal)
        console.log("dinnerCal : " + dinnerCal)
        var set = food.map(function (obj) {
            var kCal = parseFloat(obj["Calories"]);
            var carbs = parseFloat(obj["Carbs"]).toFixed(2);
            var protein = parseFloat(obj["Protein"]).toFixed(2);
            var fats = parseFloat(obj["Fats"]).toFixed(2);
            switch (obj["Category"]) {
                case "breakfast":
                    var multiple = Math.floor(breakFastCal / kCal);
                    obj["Calories"] = multiple * kCal;
                    obj["Carbs"] = multiple * carbs;
                    obj["Protein"] = multiple * protein;
                    obj["Fats"] = multiple * fats
                    var quantity = obj["Quantity"].split(" ");
                    quantity[0] = parseInt(quantity[0]) * multiple;
                    obj["Quantity"] = quantity.join(" ");
                    // console.log(obj)
                    return obj;
                case "lunch":
                    var multiple = Math.floor(lunchCal / kCal);
                    obj["Calories"] = multiple * kCal;
                    obj["Carbs"] = multiple * carbs;
                    obj["Protein"] = multiple * protein;
                    obj["Fats"] = multiple * fats
                    var quantity = obj["Quantity"].split(" ");
                    quantity[0] = parseInt(quantity[0]) * multiple;
                    obj["Quantity"] = quantity.join(" ");
                    // console.log(obj)
                    return obj;
                case "dinner":
                    var multiple = Math.floor(dinnerCal / kCal);
                    obj["Calories"] = multiple * kCal;
                    obj["Carbs"] = multiple * carbs;
                    obj["Protein"] = multiple * protein;
                    obj["Fats"] = multiple * fats
                    var quantity = obj["Quantity"].split(" ");
                    quantity[0] = parseInt(quantity[0]) * multiple;
                    obj["Quantity"] = quantity.join(" ");
                    // console.log(obj)
                    return obj;
            }
        })
        return set;
    }
}

module.exports = container;
