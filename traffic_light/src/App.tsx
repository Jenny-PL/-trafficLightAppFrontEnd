import React, { useState, useEffect } from "react";
import './App.css';
import ChangeAlarmTime from "./components/ChangeAlarmTime";
import HomeButton from "./components/HomeButton";
import YesNoSlider from "./components/YesNoSlider";
import CurrentTimeDisplay from "./components/CurrentTimeDisplay";


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome. Is it time to wake up?</h1>
        <p>Add a clickable traffic light</p>
      </header>

      <HomeButton person="Jenny"/>
      <YesNoSlider/>
      <ChangeAlarmTime/>
      <CurrentTimeDisplay/>
    </div>
  );
}

export default App;
