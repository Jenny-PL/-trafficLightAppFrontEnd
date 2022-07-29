import React, { useState, useEffect } from "react";
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
import { couldStartTrivia } from "typescript";
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
      <TrafficLight/>
      </main>
      <nav>
        <Link to="/set">Set alarm (with clickable traffic light)</Link>
      </nav>
    </>
  );
}

function SetAlarmForm() {
  const navigate = useNavigate(); // this is for routing to a new link

  const [alarmTime, setAlarmTime] = React.useState<string>("00:00");
  const [wakeUpToggle, setWakeUpState] = React.useState<boolean>(true);
  const [audioToggle, setAudioState] = React.useState<boolean>(true);
  const [visualDisplay, setVisualDisplayState] = React.useState<boolean>(true);

//   const [formData, setFormData] = useState({
//     alarmTime: "00:00",
//     wakeToggle: true,
//     musicAudioToggle: true
//  })
  //   processSubmittedDataFunction(formData);
  //   setFormData({
  //   alarmTime: "00:00",
  //   wakeToggle: true,
  //   musicAudioToggle: true
  //  }) 

//  const onInputChange = (event: React.FormEvent<HTMLInputElement>)  => {
//   setFormData({
//      ...formData, 
//      [event.target.name]: event.target.value
//   })
// }

const onInputChange = (event: React.FormEvent<HTMLInputElement>) => {
  event.preventDefault();
  let newTime = event.currentTarget.value
  setAlarmTime(newTime);
}
// Bug on toggle components: change from true -> false, but then dont change back
  const onWakeUpChange = (event: React.FormEvent<HTMLInputElement>) => {
    let toggleChange  = (event.currentTarget.checked);
    setWakeUpState(toggleChange);}

    const onAudioChange = (event: React.FormEvent<HTMLInputElement>) => {
      let audioToggle = (event.currentTarget.checked);
      setAudioState(audioToggle);}

      const onVisualChange = (event: React.FormEvent<HTMLInputElement>) => {
        setVisualDisplayState(event.currentTarget.checked);}


  const handleFormSubmission = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    //passing on state through params with navigate, react router
    navigate('/alarm', {state: { alarmTime: alarmTime,  wakeUpToggle: wakeUpToggle,
  audioToggle: audioToggle, visualDisplay: visualDisplay}}); 
  }
  
  return (
    <>
      <main>
        <h1>Set up Alarm</h1>
        <form onSubmit={event => handleFormSubmission(event)}>
              {/* each of these inputs should have its own onChange event, else a collective onChange event */}
          <CurrentTimeDisplay/>
          <label htmlFor="alarm">Ok to wake time: </label>
              <input type='time' id="alarm" name="alarm" onChange={event => onInputChange(event)} value={alarmTime}/>
            {/* <input type='time' id="alarm" name="alarm" onChange={event => onInputChange(event)} value={formData.name}}/> */}

            {/* ?? only currenlty checked checkbox input is submitted to server. when input value not specified, it is 'on' by default. */}
            <label className="toggle">
            <input id="slideToggle" className="toggle-checkbox" type="checkbox" defaultChecked onChange={event => onWakeUpChange(event)} checked={wakeUpToggle}/>
           <div className="toggle-switch"></div>
          <span className="toggle-label">Wake-Up Song</span>
          </label>

          <label className="toggle">
            <input id="slideToggle" className="toggle-checkbox" type="checkbox" defaultChecked onChange={event => onAudioChange(event)} checked={audioToggle}/>
           <div className="toggle-switch"></div>
          <span className="toggle-label">Music and audiobooks available</span>
          </label>

          <label className="toggle">
            <input id="slideToggle" className="toggle-checkbox" type="checkbox" defaultChecked onChange={event => onVisualChange(event)} checked={visualDisplay}/>
           <div className="toggle-switch"></div>
          <span className="toggle-label">Visual Countdown of tie left</span>
          </label>
          {/* <YesNoSlider decision="Wake-Up Song"/> */}
          {/* <YesNoSlider decision="Music and audiobooks available"/> */}
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
//   wakeUpToggle: boolean;
//   audioToggle: boolean;
    // visualDisplay: boolean;
// }
// {alarmTime, wakeUpToggle, audioToggle}: NotTimeYetProps

function NotTimeYet() { 
// useLocation passes on props through Link with react router (rather than as params in route definition)
  const location:any = useLocation();
  console.log(location, " useLocation Hook-- here it is!");
  const alarmTime = location.state?.alarmTime;
  const wakeUpToggle = location.state?.wakeUpToggle;
  const audioToggle = location.state?.audioToggle;
  const visualDisplay = location.state?.visualDisplay;

  

  return (
    <>
      <main>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/set">Modify Alarm</Link>
      </nav>
        <h2>Okay to wake at:</h2>
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