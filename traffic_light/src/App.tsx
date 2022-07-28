import React, { useState, useEffect } from "react";
import './App.css';
import ChooseAlarmTime from "./components/ChooseAlarmTime";
import MusicPlay from "./components/MusicPlay";
import AudioBook from "./components/AudioBook";
import TrafficLight from "./components/TrafficLight";
import VisualCountdown from "./components/VisualCountdown";
import YesNoSlider from "./components/YesNoSlider";
import CurrentTimeDisplay from "./components/CurrentTimeDisplay";
import { Routes, Route, Link } from "react-router-dom";
import { useParams } from "react-router-dom"; 
import { timeEnd } from "console";
// useParams is for dynamic routing- may not use


function App() {

  // const [alarmTime, setAlarmTime] = useState(7);

  return (
    <div className="App">
      <header className="App-header">
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="set" element={<SetAlarmForm /> } />
        <Route path="alarm" element={<NotTimeYet /> } />
        <Route path="alarm/:alarmTime" element={<NotTimeYet /> } />
        <Route path="wakeup" element={<OkayToWakeUp/> } />
         {/* <Route path="audio" element={<WakeUpWithAudio/> } /> */}
      </Routes>
      <footer>
        &copy; 2022 Ada Developers Academy ✨ Jenny Luong✨
      </footer>
    </div>
  );
}

function passTimeToTrafficClock(alarmTime: string) {
  return alarmTime;
}
const alarmTime = passTimeToTrafficClock

// Landing Page
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
// Think this is where I want to to add the logic to capture 'onsumbit' to navigate to
// to NotTimeYet (aka <Route path="alarm" element={<NotTimeYet /> )
// Also need to pass up state from each subComponent
function SetAlarmForm() {
  return (
    <>
      <main>
        <h1>Set up Alarm</h1>
        <CurrentTimeDisplay/>
        <ChooseAlarmTime passTimeToTrafficClock={passTimeToTrafficClock}/>
        <YesNoSlider decision="Wake-Up Song"/>
        <YesNoSlider decision="Music and audiobooks available"/>
      </main>
      <nav>
        <Link to="/">Home</Link>
      </nav>
    </>
  );
}

// need to pass state from SetAlarmForm()
// when current time == alarmTime, navigate to OkayToWakeUp()
function NotTimeYet() {
  return (
    <>
      <main>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/set">Modify Alarm</Link>
      </nav>
        <h2>Okay to wake at:</h2>
        {/* trying to get the alarm time from ChooseAlarmTimeButton */}
        <p>{alarmTime}</p>
        <TrafficLight/>
        <CurrentTimeDisplay/>
        {/* set ternary expression whether to display visual countdown   */}
        <VisualCountdown/>
      </main>
      
    </>
  );
}

function OkayToWakeUp() {
  return (
    <>
      <main>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/set">Modify Alarm</Link>
      </nav>
        <h2>You can Wake up!</h2>
        <TrafficLight/>
        <CurrentTimeDisplay/>
        {/* set ternary expression whether to display MusicPlay, and AudioBook */}
        {/* set ternary expression whether to play wakeUpSong, and if so, display a stop button */}
        <MusicPlay/>
        <AudioBook/>
        {/* <VisualCountdown/> */}
      </main>
      
    </>
  );
}

// function WakeUpWithAudio() {
//   return (
//     <>
//       <main>
//       <nav>
//         <Link to="/">Home</Link>
//         <Link to="/set">Modify Alarm</Link>
//       </nav>
//         <h2>Good morning!</h2>
//         <CurrentTimeDisplay/>
//         <p>Add traffic light component</p>
//         <p>Add music & audio book components</p>
//       </main>
//     </>
//   );
// }

export default App;