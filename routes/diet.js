// var food = require('../const/foodItems')
var Food = require('../models/Food')
var express = require('express')
var router = express.Router()
var bmiCalculator = require('../helper/bmiCalculator')
var dietHelper = require('../helper/dietHelper')
var {createDietController, updateDietController, getDietController} = require('../controllers/dietController');

// router.post('/insertData', async (req,res) => {
//     let foodInsert = await Food.insertMany(food);
//     console.log(foodInsert);
//     res.json(foodInsert);
// })

//Route 1 --- create diet plan for user with user id as reqeuest parameter
router.get('/createDiet/:id', createDietController);

//Route 2 --- update diet plan for user with user id as request parameter
router.post('/updateDiet/:id', updateDietController)

//Route 3 --- get diet details for user with user id as request parameter
router.get('/getDiet/:id', getDietController)

module.exports = router;