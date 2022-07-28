import React, { useState, useEffect} from "react";
import './App.css';
import ChooseAlarmTime from "./components/ChooseAlarmTime";
import MusicPlay from "./components/MusicPlay";
import AudioBook from "./components/AudioBook";
import TrafficLight from "./components/TrafficLight";
import VisualCountdown from "./components/VisualCountdown";
import YesNoSlider from "./components/YesNoSlider";
import CurrentTimeDisplay from "./components/CurrentTimeDisplay";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import { useParams } from "react-router-dom"; 
import { useNavigate }  from 'react-router-dom';
// useParams is for dynamic routing- may not use


function App() {

  return (
    <div className="App">
      <header className="App-header">
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="set" element={<SetAlarmForm /> } />
        <Route path="alarm" element={<NotTimeYet  /> } />
        {/* <Route path="alarm" element={<NotTimeYet alarmTime={alarmTime}/> } /> */}
        {/* <Route path="alarm/:alarmTime" element={<NotTimeYet alarmTime={alarmTime}/> } /> */}
        <Route path="wakeup" element={<OkayToWakeUp/> } />
         {/* <Route path="audio" element={<WakeUpWithAudio/> } /> */}
      </Routes>
      <footer>
        &copy; 2022 Ada Developers Academy ✨ Jenny Luong✨
      </footer>
    </div>
  );
}

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

// capture 'onsubmit' to navigate to to NotTimeYet (aka <Route path="alarm" element={<NotTimeYet /> )
// Also need to pass up state from each subComponent
// interface SetAlarmFormProps {
 
// }

const defaultTime = "00:00";

function SetAlarmForm() {
  const navigate = useNavigate();
  const [alarmTime, setAlarmTime] = React.useState<string>(defaultTime);

  // need to add state for y/n slider toggles:
  // const [wakeUpToggle, setWakeUpState] = React.useState<null | string>("on");
  // const [musicOptionToggle, setMusicOption] = useState("on");

  const handleFormSubmission = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // need to tie to ChooseAlarmTime component... right now it is not. 
    let newTime = event.currentTarget.value
    setAlarmTime(newTime); //updates state with inputted alarmTime
  // let wakeToggle = document.getElementById('slideToggle').checked//updates state with 
  // let musicAudioToggle = 

  // navigate('/alarm'); 
  navigate('/alarm', {state: { alarmTime: alarmTime }}); 
}

  return (
    <>
      <main>
        <h1>Set up Alarm</h1>
        <form onSubmit={event => handleFormSubmission(event)}>
          <CurrentTimeDisplay/>
          <ChooseAlarmTime />
          <YesNoSlider decision="Wake-Up Song"/>
          <YesNoSlider decision="Music and audiobooks available"/>
          <input type='submit' value='Set Alarm' />
        </form>
      </main>
      <nav>
        <Link to="/">Home</Link>
      </nav>
    </>
  );
}

// need to pass state from SetAlarmForm()
// when current time == alarmTime, navigate to OkayToWakeUp()

// interface NotTimeYetProps {
//   alarmTime: string;
// }
// {alarmTime}: NotTimeYetProps

function NotTimeYet() {  
  const location:any = useLocation();
  console.log(location, " useLocation Hook");
  const alarmTime = location.state?.alarmTime;

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

export default App;