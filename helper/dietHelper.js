var bmiCalculator = require('./bmiCalculator')
var activityQuotients = require('../const/activityTypeQuotient')

var calculateIdealWeight = function(user) {
    var height = user["height"] / 100;
    var weight = user["weight"];
    var bmi = bmiCalculator.calculateBMI(height, weight);
    switch(user.gender){
        case "Male":
            return (0.5 * bmi +11.5) * height * height;
        case "Female":
            return (0.4 * bmi + 0.03 * age + 11) * height * height;
    }
}

var calculateIdealkCalRequirementPerDay = function (user) {
    var height = user["height"] / 100;
    var age = user.age;
    var idealWeight = calculateIdealWeight(user)
    switch(user.gender){
        case "Male":
            return ( 66.67 + ( 13.75 * idealWeight ) + ( 5 * height ) - 6.76 * age ) * activityQuotients[user["activity_type"]];
        case "Female":
            return ( 665.1 + (9.56 * idealWeight ) + ( 1.85 * cm ) - ( 4.68 * age )) * activityQuotients[user["activity_type"]];
    }
}

var calculateCurrentkCalRequirementPerDay = function(user) {
    var height = user["height"] / 100;
    var weight = user["weight"];
    var age = user.age;
    switch(user.gender){
        case "Male" : 
            return ( 66.67 + ( 13.75 * weight ) + ( 5*height ) - 6.76 * age ) * activityQuotients[user["activity_type"]];
        case "Female" : 
            console.log("In Female")
            return ( 665.1 + ( 9.56 * weight ) + ( 1.85 * height ) - ( 4.68 * age )) * activityQuotients[user["activity_type"]];
    }
}

var container = {
    idealWeight : calculateIdealWeight,
    idealkCal : calculateIdealkCalRequirementPerDay,
    currentkCal : calculateCurrentkCalRequirementPerDay
}

module.exports = container;