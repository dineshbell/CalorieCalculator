import {
  Grid,
  MenuItem,
  TextField,
  FormControl,
  InputLabel,
  Select,
  Button,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import DatePickerValue from "./DatePicker";
import { food_data, activities } from "../Constants";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import { lightBlue } from "@mui/material/colors";



const CalorieManagement = () => {
  const navigate = useNavigate();


  const { id } = useParams();
  const initialValues = {
    userName: "",
    date: "",
    food: "",
    quantity: 0,
    totalCaloriesIntake: 0,
    targetCaloriesIntake: 0,
    totalCaloriesBurned: 0,
    targetCaloriesBurned: 0,
    targetAchievedForCaloriesIntake: false,
    targetAchievedForCaloriesBurned: false,
    activity: "",
    steps: 0,
  };

  const [myCalories, setmyCalories] = useState(initialValues);
  const handleChange = (e) => {
    let { name, value } = e.target;
    console.log(value);
    setmyCalories((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (id) {
      axios.get("http://localhost:3004/calorie-cal/" + id).then((res) => {
        const {
          userName,
          date,
          food,
          quantity,
          steps,
          activity,
          totalCaloriesIntake,
          targetCaloriesIntake,
          totalCaloriesBurned,
          targetCaloriesBurned,
        } = res.data;
        setmyCalories({
          userName,
          date,
          food,
          quantity,
          steps,
          activity,
          totalCaloriesIntake,
          targetCaloriesIntake,
          totalCaloriesBurned,
          targetCaloriesBurned,
        });
      });
    }
  }, []);

  const totalCalorieIntake = () => {
    if (myCalories.food) {
      let value = food_data.find((eachrow) => eachrow.food === myCalories.food);
      return value.Calories * myCalories.quantity;
    } else {
      return 0;
    }
  };

  const totalCaloriesBurned = () => {
    if (myCalories.activity) {
      let res = activities.find(
        (eachrow) => eachrow.activity == myCalories.activity
      );
      return res["calorie-burned"] * myCalories.steps;
    } else {
      return 0;
    }
  };

  const onClick = () => {
    if (id) {
      axios
        .put("http://localhost:3004/calorie-cal/" + id, {
          ...myCalories,
          totalCaloriesIntake: totalCalorieIntake(),
          totalCaloriesBurned: totalCaloriesBurned(),
        })
        .then((response) => {
          navigate("/");
        });
    } else {
      axios
        .post("http://localhost:3004/calorie-cal", {
          ...myCalories,
          totalCaloriesIntake: totalCalorieIntake(),
          totalCaloriesBurned: totalCaloriesBurned(),
        })
        .then((response) => {
          navigate("/");
        });
    }
  };
  return (
    <div>
    <Grid
      container
      // direction="column"
      style={{color:'black'}}
      justifyContent="flex-start"
      alignItems="flex-start"
      spacing={2}
      backgroundColor={lightBlue}
      fontFamily={"cursive"}
      
    >
      <Grid item xs={12} fontFamily={"cursive"} >
        <TextField
          label="Name"
          name="userName"
          onChange={handleChange}
          value={myCalories.userName}
         
        />
      </Grid>
      <Grid item xs={12}>
        <DatePickerValue
          name="date"
          value={myCalories.date}
          onChange={(newValue) => {
            console.log(newValue);
            setmyCalories((prev) => ({
              ...prev,
              date: moment(newValue).toDate(),
            }));
          }}
        />
      </Grid>

      <Grid item xs={6}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label" style={{color:'black'}}>Food</InputLabel>
              <Select
                displayEmpty
                labelId="demo-simple-select-label"
                value={myCalories.food}
                label="Food"
                name="food"
                onChange={handleChange}
              >
                {food_data.map((eachrow) => {
                  return (
                    <MenuItem value={eachrow.food} key={eachrow.id}>
                      {eachrow.food}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Quantity"
              name="quantity"
              onChange={handleChange}
              value={myCalories.quantity}
              type="number"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Total Calories Intake"
              name="totalCaloriesIntake"
              onChange={handleChange}
              value={totalCalorieIntake()}
              disabled
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Target Calories Intake"
              name="targetCaloriesIntake"
              onChange={handleChange}
              value={myCalories.targetCaloriesIntake}
              type="number"
              fullWidth
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={6}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label"  style={{color:'black'}}>Acitivity</InputLabel>
              <Select
                displayEmpty
                labelId="demo-simple-select-label"
                value={myCalories.activity}
                label="Activity"
                name="activity"
                onChange={handleChange}
              >
                {activities.map((eachrow) => {
                  return (
                    <MenuItem value={eachrow.activity} key={eachrow.id}>
                      {eachrow.activity}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Steps"
              name="steps"
              onChange={handleChange}
              value={myCalories.steps}
              type="number"
              fullWidth
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Total Calories burned"
              name="totalCaloriesBurned" 
              onChange={handleChange}
              value={totalCaloriesBurned()}
              disabled
              fullWidth
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Target Calories Burned"
              name="targetCaloriesBurned"
              onChange={handleChange}
              value={myCalories.targetCaloriesBurned}
              type="number"
              fullWidth
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Button variant="contained" onClick={onClick} style={{backgroundColor:'#0A174E'}}>
          {id ? "Update" : "Submit"}
        </Button>
      </Grid>
    </Grid>
    </div>
  );
};

export default CalorieManagement;
