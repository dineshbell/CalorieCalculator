const express = require("express");
const app = express();
const mongoose = require("mongoose");
const CalorieCal = require("./data_schema");
// const CalorieIntake = require('./data_schema')
// const CalorieBurned = require('./data_schema')
const cors = require("cors");

mongoose
  .connect(
    "mongodb+srv://dineshbellam:bellam@cluster0.dwfidd1.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => console.log("DB Connection established"));

app.use(express.json());
app.use(cors({ origin: "*" }));

// app.post('/calorie-intake', async(req, res) => {
app.post("/calorie-cal", async (req, res) => {
  try {
    const {
       date,
      userName,
      totalCaloriesIntake,
      targetCaloriesIntake,
      targetAchievedForCaloriesIntake,
      food,
      quantity,
      totalCaloriesBurned,
      targetCaloriesBurned,
      targetAchievedForCaloriesBurned,
      activity,
      steps,
    } = req.body;
    let newcalorieCal = new CalorieCal({
      date,
      userName,
      targetCaloriesIntake,
      totalCaloriesIntake,
      targetAchievedForCaloriesIntake,
      food,
      quantity,
      totalCaloriesBurned,
      targetCaloriesBurned,
      targetAchievedForCaloriesBurned,
      activity,
      steps,
    });

    await newcalorieCal.save();

    res.status(200).send("Sucessful");
  } catch (err) {
    console.log(err);
    res.status(500).send("server error");
  }
});

app.get("/calorie-cal", async (req, res) => {
  try {
    const caloriesData = await CalorieCal.find().sort({ date: -1 });
    res.json(caloriesData);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});


app.get("/calorie-cal/:id", async (req, res) => {
  try {
    const caloriesData = await CalorieCal.findById(req.params.id);
    res.json(caloriesData);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

 app.put('/calorie-cal/:id', async (req, res) => {
   try {
    const {id} = req.params;
     const { userName,date,food,quantity,steps,activity,totalCaloriesIntake, 
      targetCaloriesIntake, totalCaloriesBurned, targetCaloriesBurned } = req.body;
     const dailyIntake = await CalorieCal.findByIdAndUpdate(id, {
       totalCaloriesIntake,
       targetCaloriesIntake,
       totalCaloriesBurned,
       targetCaloriesBurned,
       userName,date,food,quantity,steps,activity
     });
     res.json(dailyIntake);
   } catch (error) {
     console.error(error);
     res.status(500).json({ message: 'Server Error' });
   }
 });

app.delete("/calorie-cal/:id", async (req, res) => {
  try {
    const caloriecal = await CalorieCal.findByIdAndDelete(req.params.id);
    res.json({ message: "Record deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// // CalorieBurned

// app.post('/calorie-burned', async(req, res) => {
//   try{
//     const { date, userName,totalCaloriesBurned,  targetCaloriesBurned,  targetAchievedForCaloriesBurned,activity, steps } = req.body;
//     let newcalorieBurned = new CalorieBurned({ date, userName,totalCaloriesBurned,  targetCaloriesBurned,  targetAchievedForCaloriesBurned,activity, steps });

//     await newcalorieBurned.save();

//     res.status(200).send('Sucessful');
//   }
//   catch (err) {
//     console.log(err)
//     res.status(500).send('Internal server error');
//   }
// });

// app.get('/calorie-burned', async (req, res) => {
//   try {
//     const caloriesData = await CalorieBurned.find().sort({date: -1});
//     res.json(caloriesData);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server Error');
//   }
// });

// app.put('/calorie-burned/:id', async (req, res) => {
//   try {
//     const { id } = req.params;
//     const {totalCaloriesBurned, targetCaloriesBurned } = req.body;
//     const dailyIntake = await CalorieIntake.findByIdAndUpdate(id, {
//       totalCaloriesBurned,
//       targetCaloriesBurned
//     }, { new: true });
//     res.json(dailyIntake);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server Error' });
//   }
// });

// app.delete('/calorie-burned/:id', async (req, res) => {
//   try {
//     const calorieBurned = await CalorieIntake.findById(req.params.id);
//     if (!calorieBurned) {
//       return res.status(404).json({ message: 'Record not found' });
//     }
//     await calorieBurned.remove();
//     res.json({ message: 'Record deleted' });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

app.listen(3004, () => {
  console.log("Server is Running....");
});
