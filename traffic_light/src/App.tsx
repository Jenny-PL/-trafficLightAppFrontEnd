import React, { useState, useEffect } from "react";
import './App.css';
import ChangeAlarmTime from "./components/ChangeAlarmTime";
import HomeButton from "./components/HomeButton";
import YesNoSlider from "./components/YesNoSlider";
import CurrentTimeDisplay from "./components/CurrentTimeDisplay";
import { Routes, Route, Link } from "react-router-dom";


function App() {
  return (
    <div className="App">
      <header className="App-header">
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="set" element={<SetAlarm /> } />
        <Route path="set" element={<BasicAlarm /> } />
        <Route path="set" element={<WakeUpWithAudio/> } />
      </Routes>

      {/* <HomeButton person="Jenny"/>
      <YesNoSlider/>
      <ChangeAlarmTime/>
      <CurrentTimeDisplay/> */}
    </div>
  );
}

function Home() {
  return (
    <>
      <main>
      <h1>Welcome. Is it time to wake up?</h1>
      </main>
      <nav>
        <Link to="/set">Set alarm (with clickable traffic light)</Link>
      </nav>
    </>
  );
}

function SetAlarm() {
  return (
    <>
      <main>
        <h2>Set up Alarm</h2>
        <CurrentTimeDisplay/>
        <HomeButton person="Jenny"/>
        <YesNoSlider/>
      </main>
      <nav>
        <Link to="/">Home</Link>
      </nav>
    </>
  );
}

function BasicAlarm() {
  return (
    <>
      <main>
        <CurrentTimeDisplay/>
      </main>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/set">Modify Alarm</Link>
      </nav>
    </>
  );
}

function WakeUpWithAudio() {
  return (
    <>
      <main>
        <h2>Good morning!</h2>
        <CurrentTimeDisplay/>
        <p>Add traffic light component</p>
        <p>Add music & audio book components</p>
      </main>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/set">Modify Alarm</Link>
      </nav>
    </>
  );
}


export default App;
