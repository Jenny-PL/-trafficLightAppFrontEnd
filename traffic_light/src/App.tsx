import React, { useState, useEffect } from "react";
import './App.css';
import ChooseAlarmTime from "./components/ChooseAlarmTime";
import HomeButton from "./components/HomeButton";
import YesNoSlider from "./components/YesNoSlider";
import CurrentTimeDisplay from "./components/CurrentTimeDisplay";
import { Routes, Route, Link } from "react-router-dom";
import { useParams } from "react-router-dom"; 
// useParams is for dynamic routing- may not use


function App() {

  const [alarmTime, setAlarmTime] = useState(7);
 



  return (
    <div className="App">
      <header className="App-header">
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="set" element={<SetAlarmForm /> } />
        <Route path="alarm" element={<BasicAlarm /> } />
        <Route path="alarm/:alarmTime" element={<BasicAlarm /> } />
        <Route path="audio" element={<WakeUpWithAudio/> } />
      </Routes>
      <footer>
        &copy; 2022 Ada Developers Academy ✨ Jenny Luong✨
      </footer>

      {/* <HomeButton person="Jenny"/>
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

function SetAlarmForm() {
  return (
    <>
      <main>
        <h1>Set up Alarm</h1>
        <CurrentTimeDisplay/>
        <ChooseAlarmTime />
        <YesNoSlider decision="Wake-Up Song"/>
        <YesNoSlider decision="Make music and audiobooks available"/>
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
      <nav>
        <Link to="/">Home</Link>
        <Link to="/set">Modify Alarm</Link>
      </nav>
        <h2>Good morning!</h2>
        <CurrentTimeDisplay/>
        <p>Add traffic light component</p>
        <p>Add music & audio book components</p>
      </main>
    </>
  );
}


export default App;
