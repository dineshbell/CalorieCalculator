const mongoose = require('mongoose');


let CalorieIntake = new mongoose.Schema ({
  //  date: { 
  //    type: Date, 
  //    required: true
  //   },
  userName: { 
    type: String, 
    required: true
   },
  totalCaloriesIntake: { 
    type: Number, 
    required: true 
  },
  targetCaloriesIntake: {
    type: Number,
     required: true 
    },
  targetAchievedForCaloriesIntake: { 
    type: Boolean, 
    required: true 
  },
  food: {
     type: String, 
     required: true
    },
  quantity: {
     type: Number, 
     required: true 
    },
  },

    {timestamps : true},

)

 const  CalorieBurned = new mongoose.Schema({
  //  date: { type: Date, required: true },
   userName: { type: String, required: true },
   totalCaloriesBurned: { type: Number, required: true },
   targetCaloriesBurned: { type: Number, required: true },
   targetAchievedForCaloriesBurned: { type: Boolean, required: true },
   activity: { type: String, required: true },
   steps: { type: Number, required: true },

},

  {timestamps : true},

)
  
  
  
  // define models for the calorie intake and calorie burned records
  module.exports = mongoose.model('CalorieIntake', CalorieIntake);
  module.exports = mongoose.model('CalorieBurned', CalorieBurned);
  