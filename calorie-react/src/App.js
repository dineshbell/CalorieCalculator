import React from "react";
import './App.css';
import {
  BrowserRouter,
  Route,
  Routes
} from "react-router-dom";
import MyCaloriesTable from "./components/mycaloriestable";
import ButtonAppBar from "./components/Appbar";
import CalorieManagement from "./components/caloriemanagent";


function App() {
  return (
   <>
   <BrowserRouter>
    <ButtonAppBar/>
    <div className="calorie-body">
    <div  className="calorie-container">
    <Routes>
          <Route path='/' element={<MyCaloriesTable/>}></Route>
          <Route path='/calorie-management/' element={<CalorieManagement/>}></Route>
          <Route path='/calorie-management/:id' element={<CalorieManagement/>}></Route>
    </Routes>
    </div>
    </div>
    </BrowserRouter>
    </>
  );
}

export default App;
