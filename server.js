const express = require('express')
const app = express();
const mongoose = require('mongoose');
const CalorieIntake = require('./data_schema')
const CalorieBurned = require('./data_schema')
const cors = require('cors')


mongoose.connect('mongodb+srv://dineshbellam:bellam@cluster0.dwfidd1.mongodb.net/?retryWrites=true&w=majority').then(
    () => console.log('DB Connection established')
)

app.use(express.json());
app.use(cors({origin:"*"}))


app.post('/calorie-intake', async(req, res) => {
  try{  
    const { date, userName,totalCaloriesIntake,  targetCaloriesIntake, targetAchievedForCaloriesIntake, food, quantity } = req.body;
    let newcalorieIntake = new CalorieIntake({  date, userName,totalCaloriesIntake,  targetCaloriesIntake, targetAchievedForCaloriesIntake, food, quantity });
    
    await newcalorieIntake.save();

    res.status(200).send('Sucessful');
  }
  catch (err) {
    console.log(err)
    res.status(500).send('Internal server error');
  }
}); 


app.get('/calorie-intake', async (req, res) => {
  try {
    const caloriesData = await CalorieIntake.find().sort({date: -1});
    res.json(caloriesData);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

app.put('/calorie-intake/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { totalCaloriesIntake, targetCaloriesIntake, totalCaloriesBurned, targetCaloriesBurned } = req.body;
    const dailyIntake = await CalorieIntake.findByIdAndUpdate(id, {
      totalCaloriesIntake,
      targetCaloriesIntake,
      totalCaloriesBurned,
      targetCaloriesBurned
    }, { new: true });
    res.json(dailyIntake);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

app.delete('/calorie-intake/:id', async (req, res) => {
  try {
    const calorieIntake = await CalorieIntake.findById(req.params.id);
    if (!calorieIntake) {
      return res.status(404).json({ message: 'Record not found' });
    }
    await calorieIntake.remove();
    res.json({ message: 'Record deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



// CalorieBurned



app.post('/calorie-burned', async(req, res) => {
  try{  
    const { date, userName,totalCaloriesBurned,  targetCaloriesBurned,  targetAchievedForCaloriesBurned,activity, steps } = req.body;
    let newcalorieBurned = new CalorieIntake({ date, userName,totalCaloriesBurned,  targetCaloriesBurned,  targetAchievedForCaloriesBurned,activity, steps });
    
    await newcalorieBurned.save();

    res.status(200).send('Sucessful');
  }
  catch (err) {
    console.log(err)
    res.status(500).send('Internal server error');
  }
});


app.get('/calorie-burned', async (req, res) => {
  try {
    const caloriesData = await CalorieBurned.find().sort({date: -1});
    res.json(caloriesData);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


app.put('/calorie-burned/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const {totalCaloriesBurned, targetCaloriesBurned } = req.body;
    const dailyIntake = await CalorieIntake.findByIdAndUpdate(id, {
      totalCaloriesBurned,
      targetCaloriesBurned
    }, { new: true });
    res.json(dailyIntake);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});


app.delete('/calorie-intake/:id', async (req, res) => {
  try {
    const calorieBurned = await CalorieIntake.findById(req.params.id);
    if (!calorieBurned) {
      return res.status(404).json({ message: 'Record not found' });
    }
    await calorieBurned.remove();
    res.json({ message: 'Record deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



app.listen(3004,()=>{
    console.log("Server is Running....")
})