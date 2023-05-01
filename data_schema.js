const mongoose = require('mongoose');


let CalorieCal = new mongoose.Schema ({
    date: { 
     type: Date, 
     default: Date.now
     },
    userName: { type: String, require: true},
    totalCaloriesIntake: { type: Number, required: false },
    targetCaloriesIntake: {type: Number,required: true },
    targetAchievedForCaloriesIntake: { type: Boolean, required: false },
    food: {type: String, required: true},
    quantity: {type: Number, required: true },
    totalCaloriesBurned: { type: Number, required: false },
    targetCaloriesBurned: { type: Number, required: true },
    targetAchievedForCaloriesBurned: { type: Boolean, required: false },
    activity: { type: String, required: true },
    steps: { type: Number, required: true },
  },
     {timestamps : true},
  )

//  let CalorieBurned = new mongoose.Schema({
//   //  date: { type: Date, required: true },
//    userName: { type: String, required: true },
//    totalCaloriesBurned: { type: Number, required: true },
//    targetCaloriesBurned: { type: Number, required: true },
//    targetAchievedForCaloriesBurned: { type: Boolean, required: true },
//    activity: { type: String, required: true },
//    steps: { type: Number, required: true },

// },

//   {timestamps : true},

// )
  
  
  
  // define models for the calorie intake and calorie burned records
  // module.exports = mongoose.model('CalorieIntake', CalorieIntake);
  // module.exports = mongoose.model('CalorieBurned', CalorieBurned);
  module.exports = mongoose.model('CalorieCal', CalorieCal);
  