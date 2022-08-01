import React, { useState, useEffect } from "react";
import axios from 'axios';
import './App.css';
import MusicPlay from "./components/MusicPlay";
import AudioBook from "./components/AudioBook";
import AlarmTimeDisplay from "./components/AlarmTimeDisplay";
import RedTrafficLight from "./components/RedTrafficLight";
import GreenTrafficLight from "./components/GreenTrafficLight";
import TrafficLight from "./components/TrafficLight";
import VisualCountdown from "./components/VisualCountdown";
import CurrentTimeDisplay from "./components/CurrentTimeDisplay";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import { useNavigate }  from 'react-router-dom';
// import { useParams } from "react-router-dom"; 
// useParams is for dynamic routing- may not use


interface navToWakePageProps {
  alarmTime: string;
  wakeUpToggle: boolean;
  audioToggle: boolean;
  visualDisplay: boolean;
  currentTime: Date;
}

//audioTag
//  <audio controls>
//   <source src="horse.mp3" type="audio/mpeg">
// </audio>


// fileupload tag html input
// also front end libraries to upload files
// <label for="avatar">Choose a profile picture:</label>
//<input type="file"
//       id="avatar" name="avatar"
//       accept="image/png, image/jpeg"></input> 


function App() {

  //To DO: add axios call for POST to db 

  //useEffect allows the component to render, then make the API call asynchronously 
  //after the app is fully rendered; the empty dependency array means it will only be called 1x

  // useEffect(() => {
  //   axios.get('some great url to make an API call to')
  //     .then((response) => {
  //       console.log('The data we get back from the HTTP response:', response.data);
  //     })
  //     .catch((error) => {
  //       console.log('Anything that isn\'t status code 2XX is an error:', error.response.status);
  //       console.log('The data from response with an error:', error.response.data);
  //     });
  // }, []);


  return (
    <div className="App">
      <header className="App-header">
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="set" element={<SetAlarmForm /> } />
        <Route path="alarm" element={<NotTimeYet  /> } />
        {/* <Route path="visualcountdown" element={<NotTimeYetWithDisplay />} /> */}
        <Route path="wakeup" element={<OkayToWakeUp/> } />
        <Route path="wakeup-audio" element={<WakeUpWithAudio/> } />
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

// Set Alarm Page
function SetAlarmForm() {
  const navigate = useNavigate(); // this is for routing to a new link

  const [alarmTime, setAlarmTime] = React.useState<string>("00:00");
  const [wakeUpToggle, setWakeUpState] = React.useState<boolean>(true);
  const [audioToggle, setAudioState] = React.useState<boolean>(true);
  const [visualDisplay, setVisualDisplayState] = React.useState<boolean>(true);

  // if you provide initial values for all objects, explicitly stating the type is not necessary.
  // const [formData, setFormData] = useState({
  //   alarmTime: "00:00",
  //   wakeToggle: true,
  //   audioToggle: true,
  //   visualDisplay: true })


  // const onInputChange = (event: React.FormEvent<HTMLInputElement>)  => {
  //   const inputElement = event.currentTarget as HTMLInputElement;
  //   const name = inputElement.name;
  //   let value:any;
  //   if (name === 'alarm') {
  //      value = inputElement.value;
  //   } else {
  //      value = inputElement.checked;
  //   }
  //    // make a new object that is copied from form object
  //    const newForm = { ...formData };
  //   newForm[name] = value;
  //   setFormData(newForm);
  //   };
  
  const onInputChange = (event: React.FormEvent<HTMLInputElement>) => {
    setAlarmTime(event.currentTarget.value);}
  const onWakeUpChange = (event: React.FormEvent<HTMLInputElement>) => {
    setWakeUpState(event.currentTarget.checked);}
  const onAudioChange = (event: React.FormEvent<HTMLInputElement>) => {
    setAudioState(event.currentTarget.checked);}
  const onVisualChange = (event: React.FormEvent<HTMLInputElement>) => {
      setVisualDisplayState(event.currentTarget.checked);}


  const handleFormSubmission = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("alarm time is:", alarmTime)
    // passing on state through params with navigate, react router
    navigate('/alarm', {state: { alarmTime: alarmTime,  wakeUpToggle: wakeUpToggle,
  audioToggle: audioToggle, visualDisplay: visualDisplay}}); 
  }
  // navigate('/alarm', {state: { alarmTime: formData.alarmTime,  wakeUpToggle: formData.wakeToggle,
  //   audioToggle: formData.audioToggle, visualDisplay: formData.visualDisplay}}); 
  //   }
  
  return (
    <>
      <main>
        <h1>Set up Alarm</h1>
        <form onSubmit={event => handleFormSubmission(event)}>
              {/* each of these inputs should have its own onChange event, else a collective onChange event */}
          <CurrentTimeDisplay/>
          <label htmlFor="alarm">Ok to wake time: 
              <input type='time' id="alarm" name="alarm" onChange={event => onInputChange(event)} value={alarmTime}/>
              {/* <input type='time' id="alarm" name="alarmTime" onChange={onInputChange} value={formData.alarmTime}/> */}
          </label>

          <label className="toggle">
            <input id="slideToggle" className="toggle-checkbox" type="checkbox" name="wakeupsong"  onChange={event => onWakeUpChange(event)} checked={wakeUpToggle}/>
            {/* <input id="slideToggle" className="toggle-checkbox" type="checkbox" name="wakeToggle"defaultChecked onChange={onInputChange} checked={formData.wakeToggle}/> */}

            <div className="toggle-switch"></div>
            <span className="toggle-label">Wake-Up Song</span>
          </label>

          <label className="toggle">
            <input id="slideToggle" className="toggle-checkbox" type="checkbox" onChange={event => onAudioChange(event)} checked={audioToggle}/>
            {/* <input id="slideToggle" className="toggle-checkbox" type="checkbox" name="audioToggle" defaultChecked onChange={onInputChange} checked={formData.audioToggle}/> */}
            <div className="toggle-switch"></div>
            <span className="toggle-label">Music and audiobooks available</span>
          </label>

          <label className="toggle">
            <input id="slideToggle" className="toggle-checkbox" type="checkbox" onChange={event => onVisualChange(event)} checked={visualDisplay}/>
            {/* <input id="slideToggle" className="toggle-checkbox" type="checkbox" defaultChecked name="visualDisplay" onChange={onInputChange} checked={formData.visualDisplay}/> */}
            <div className="toggle-switch"></div>
            <span className="toggle-label">Visual Countdown of time left</span>
          </label>

          <input type='submit' value='Set Alarm' />
        </form>
      </main>
      <nav>
        <Link to="/">Home</Link>
      </nav>
    </>
  );
}


// interface NotTimeYetProps {
//   alarmTime: string;
//   wakeUpToggle: boolean;
//   audioToggle: boolean;
    // visualDisplay: boolean;
// }
// {alarmTime, wakeUpToggle, audioToggle}: NotTimeYetProps




// Not time to wake Yet page
function NotTimeYet() { 
  const navigate = useNavigate(); // this is for routing to a new link

// useLocation passes on props through Link with react router (rather than as params in route definition)
  const location:any = useLocation();
  const alarmTime = location.state?.alarmTime;
  const wakeUpToggle = location.state?.wakeUpToggle;
  const audioToggle = location.state?.audioToggle;
  const visualDisplay = location.state?.visualDisplay;

  const [currentTime, setCurrentTime] = useState(new Date());
  // interface navToWakePageProps {
  //   alarmTime: string;
  //   wakeUpToggle: boolean;
  //   audioToggle: boolean;
  //   visualDisplay: boolean;
  //   currentTime: Date;
  // }
  //BUG: how to compare alarmTime (string) with currentTime (Date stamp... currentTimeDisplay element has 
  // same structure as alarmTime... how to access this instead?)
    //naviagate to <Route path="wakeup" element={<OkayToWakeUp/> } />
  function navToWakePage({alarmTime, wakeUpToggle, audioToggle, currentTime, visualDisplay}: navToWakePageProps) {
    let minutes = currentTime.getMinutes();
    let mins :string;
    let currentTimeString: string;
    if (minutes < 10) {
      mins = "0" + minutes;
      currentTimeString = currentTime.getHours() + ":" + mins;
    }
    else {
      currentTimeString = currentTime.getHours() + ":" + currentTime.getMinutes();
    }
    console.log("alarm time is ", alarmTime);
    console.log("currentTimestring is", currentTimeString);
    if (currentTimeString >= alarmTime && wakeUpToggle === false) {
      navigate('/wakeup', {state: { alarmTime: alarmTime,  wakeUpToggle: wakeUpToggle,
        audioToggle: audioToggle, visualDisplay: visualDisplay}}); 
    } else if (currentTimeString >= alarmTime && wakeUpToggle === true) {
      navigate('/wakeup-audio', {state: { wakeUpToggle: wakeUpToggle,
        audioToggle: audioToggle, visualDisplay: visualDisplay}});
    }
  }
  //TODO: Make visualCountdown page, then uncomment this:

  // if (visualDisplay === true) {
  //   navigate('/visualcountdown', {state: { alarmTime: alarmTime,  wakeUpToggle: wakeUpToggle,
  //     audioToggle: audioToggle, visualDisplay: visualDisplay}}); 
  // }

  // This code is already in component CurrentTimeDisplay... how can I avoid having it in here twice?
  // ...pass up in a callback Function?
  // trigger a re-render every 60sec:
  useEffect(() => { 
    navToWakePage({alarmTime, wakeUpToggle, audioToggle, currentTime, visualDisplay});
    const interval = setInterval(() => 
    setCurrentTime(new Date()),
    60000);
    return () => {
        clearInterval(interval);
    };
    }, ); 
    // remove dependency array?
    // or fill array with: [alarmTime, wakeUpToggle, audioToggle, currentTime, visualDisplay, navToWakePage]


  return (
    <>
      <main>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/set">Modify Alarm</Link>
      </nav>
        <h2>Okay to wake at:</h2>
        <AlarmTimeDisplay alarmTime={alarmTime}/>
        <RedTrafficLight/>
        <CurrentTimeDisplay/>
        {/* set ternary expression whether to display visual countdown? or sep routed page  */}
        {/* <VisualCountdown/> */}
      </main>
    </>
  );
}

// alarm with visual countdown display
// function NotTimeYetWithDisplay()
// very similar to above however with <visualCountdown/> rendered


//BUG: why does GreenTrafficLight not display the same as the others?
function OkayToWakeUp() {
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

function WakeUpWithAudio() {
  const location:any = useLocation();
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