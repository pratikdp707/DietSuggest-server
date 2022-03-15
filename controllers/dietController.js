var responseHelper = require('../helper/responseHelper')
var User = require('../models/User')
var dietHelper = require('../helper/dietHelper')
var bmiCalculator = require('../helper/bmiCalculator')
var recommendationHelper = require('../helper/recommendationHelper')
var Diet = require('../models/Diet')

exports.createDietController = async (req, res) => {
    const id = req.params.id;
    console.log(id);
    try {
        let user = await User.findById(id);
        if (!user) {
            responseHelper.error(res, "No such user exists");
        }
        console.log(user);
        await Diet.findOneAndDelete({"user._id" : id})
        let height = user["height"] / 100;
        console.log("height : " + height)
        let weight = user["weight"];
        console.log("weight : " + weight)
        let currentKiloCalorieRequirementPerDay = dietHelper.currentkCal(user);
        console.log("currentKiloCalorieRequirementPerDay : " + currentKiloCalorieRequirementPerDay)
        let idealKiloCalorieRequirementPerDay = dietHelper.idealkCal(user);
        console.log("idealKiloCalorieRequirementPerDay : " + idealKiloCalorieRequirementPerDay)
        let idealWeight = dietHelper.idealWeight(user);
        console.log("idealWeight : " + idealWeight)
        let bmi = bmiCalculator.calculateBMI(height, weight);
        console.log("bmi : " + bmi)
        let status = bmiCalculator.statusOfBMI(bmi);
        console.log("status : " + status)
        let bmi_data = {
            bmi,
            status
        }
        console.log("bmi_data : " + bmi_data.bmi + bmi_data.status)
        let foodItems = recommendationHelper.calculateFoodMetricsForUser(user);
        console.log(foodItems)
        const diet = new Diet({
            user,
            currentKiloCalorieRequirementPerDay,
            idealKiloCalorieRequirementPerDay,
            idealWeight,
            foodItems,
            bmi_data,
            "created_date": new Date()
        })
        diet.save();
        if (diet) {
            responseHelper.success(res, diet);
        }

    } catch (error) {
        responseHelper.error(res, error)
    }
}

exports.updateDietController = async (req, res) => {
    const id = req.params.id;
    try {
        let user = await User.findById(id);
        if (!user) {
            responseHelper.error(res, "No such user exists");
        }
        let height = user["height"] / 100;
        console.log("height : " + height)
        let weight = user["weight"];
        console.log("weight : " + weight)
        let currentKiloCalorieRequirementPerDay = dietHelper.currentkCal(user);
        console.log("currentKiloCalorieRequirementPerDay : " + currentKiloCalorieRequirementPerDay)
        let idealKiloCalorieRequirementPerDay = dietHelper.idealkCal(user);
        console.log("idealKiloCalorieRequirementPerDay : " + idealKiloCalorieRequirementPerDay)
        let idealWeight = dietHelper.idealWeight(user);
        console.log("idealWeight : " + idealWeight)
        let bmi = bmiCalculator.calculateBMI(height, weight);
        console.log("bmi : " + bmi)
        let status = bmiCalculator.statusOfBMI(bmi);
        console.log("status : " + status)

        let foodItems = recommendationHelper.calculateFoodMetricsForUser(user);
        console.log(foodItems)

        await Diet.findOneAndDelete({"user._id" : id})

        const diet =new Diet({
                user,
                currentKiloCalorieRequirementPerDay,
                idealKiloCalorieRequirementPerDay,
                idealWeight,
                foodItems,
                bmi,
                status,
                "modified_date": new Date()
        })
        // const diet = new Diet({
        //     user,
        //     currentKiloCalorieRequirementPerDay,
        //     idealKiloCalorieRequirementPerDay,
        //     idealWeight,
        //     foodItems,
        //     bmi,
        //     status,
        //     "modified_date": new Date()
        // })
        diet.save();
        console.log(diet);
        if (diet) {
            responseHelper.success(res, diet);
        }

    } catch (error) {
        responseHelper.error(res, error)
    }
}

exports.getDietController= async (req, res) => {
    const id = req.params.id;
    console.log(id)
    const diet = await Diet.find({"user._id" : id});
    console.log(diet)
    if(diet){
        responseHelper.success(res, diet);
    } else {
        responseHelper.error(res, "Failed to fetch user diet details")
    }
}