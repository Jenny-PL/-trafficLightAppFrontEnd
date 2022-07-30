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

  // const [formData, setFormData] = useState({
  //   alarmTime: "00:00",
  //   wakeToggle: true,
  //   musicAudioToggle: true,
  //   visualDisplay: true })

  //   processSubmittedDataFunction(formData);
  //   setFormData({
  //   alarmTime: "00:00",
  //   wakeToggle: true,
  //   musicAudioToggle: true,
  //   visualDisplay: true 
  //  }) 

//  const onInputChange = (event: React.FormEvent<HTMLInputElement>)  => {
//   setFormData({
//      ...formData, 
//      [event.target.name]: event.target.value
//   })
// }

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
          <label htmlFor="alarm">Ok to wake time: 
              <input type='time' id="alarm" name="alarm" onChange={event => onInputChange(event)} value={alarmTime}/>
          </label>
            {/* <input type='time' id="alarm" name="alarm" onChange={event => onInputChange(event)} value={formData.name}}/> */}

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
  console.log(location, " useLocation Hook-- here it is!");
  const alarmTime = location.state?.alarmTime;
  const wakeUpToggle = location.state?.wakeUpToggle;
  const audioToggle = location.state?.audioToggle;
  const visualDisplay = location.state?.visualDisplay;

  if (visualDisplay === true) {
    navigate('/visualcountdown', {state: { alarmTime: alarmTime,  wakeUpToggle: wakeUpToggle,
      audioToggle: audioToggle, visualDisplay: visualDisplay}}); 
  }

  const now = new Date();
  //naviagate to <Route path="wakeup" element={<OkayToWakeUp/> } />
  if (alarmTime === now && wakeUpToggle === false) {
    navigate('/wakeup', {state: { alarmTime: alarmTime,  wakeUpToggle: wakeUpToggle,
      audioToggle: audioToggle, visualDisplay: visualDisplay}}); 
  } else if (alarmTime === now && wakeUpToggle === true) {
    navigate('/wakeup-audio', {state: { wakeUpToggle: wakeUpToggle,
      audioToggle: audioToggle, visualDisplay: visualDisplay}});
  }

  return (
    <>
      <main>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/set">Modify Alarm</Link>
      </nav>
        <h2>Okay to wake at:</h2>
        <AlarmTimeDisplay alarmTime={alarmTime}/>
        <TrafficLight/>
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