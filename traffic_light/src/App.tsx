import React, { useState, useEffect } from "react";
import axios from 'axios';
import './App.css';
import PageSetAlarmForm from "./components/PageSetAlarmForm";
import PageNotTimeYet from "./components/PageNotTimeYet";
import PageOkayToWakeUp from "./components/PageOkayToWakeUp";
import PageWakeUpWithAudio from "./components/PageWakeUpWithAudio";
import TrafficLight from "./components/TrafficLight";
import { Routes, Route, Link } from "react-router-dom";
import { useNavigate }  from 'react-router-dom';


// fileupload tag html input
// also front end libraries to upload files
// <label for="avatar">Choose a profile picture:</label>
//<input type="file"
//       id="avatar" name="avatar"
//       accept="image/png, image/jpeg"></input> 


function App() {

  const url = "http://127.0.0.1:5000/audiobook" //change to heroku deployed url when able
  //database: trafficlight
  // collection: wakeup

  const [alarmTime, setAlarmTime] = React.useState<string>("00:00");
  const [wakeUpToggle, setWakeUpToggle] = React.useState<boolean>(false);
  const [audioToggle, setAudioToggle] = React.useState<boolean>(false);
  const [visualDisplay, setVisualDisplay] = React.useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [chosenSong, setChosenSong] = React.useState<string>("");

  //To DO: add axios call for POST to db 

  //useEffect allows the component to render, then make the API call asynchronously 
  //after the app is fully rendered; the empty dependency array means it will only be called 1x

  useEffect(() => {

    // want to add chosenSong to database.
    axios.post(`${url}/alarmsong`, chosenSong)
      .then((response) => {
        console.log('Song sent to database', response.data);
      })
      .catch((error) => {
        console.log('Error with sending song to database', error.response.status);
        console.log('The data from response with an error:', error.response.data);
      });

  }, []);



  // useEffect(() => {
  //   axios.get('url')
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
        <Route path="/" element={<PageHome />} />
        <Route path="set" element={<PageSetAlarmForm setAlarmTime={setAlarmTime} setWakeUpToggle={setWakeUpToggle} setAudioToggle={setAudioToggle} setVisualDisplay={setVisualDisplay} setChosenSong={setChosenSong} alarmTime={alarmTime} chosenSong={chosenSong}/> } />
        <Route path="alarm" element={<PageNotTimeYet alarmTime={alarmTime} wakeUpToggle={wakeUpToggle} setCurrentTime={setCurrentTime} currentTime={currentTime} visualDisplay={visualDisplay}/> } />
        <Route path="wakeup" element={<PageOkayToWakeUp alarmTime={alarmTime} wakeUpToggle={wakeUpToggle} audioToggle={audioToggle} visualDisplay={visualDisplay}/> } />
        <Route path="wakeup-audio" element={<PageWakeUpWithAudio alarmTime={alarmTime} wakeUpToggle={wakeUpToggle} audioToggle={audioToggle} visualDisplay={visualDisplay} chosenSong={chosenSong}/> } />
        {/* <Route path="visualcountdown" element={<PageNotTimeYetWithDisplay />} /> */}
      </Routes>
      <footer>
        &copy; 2022 Ada Developers Academy ✨ Jenny Luong✨
      </footer>
    </div>
  );
}

// Landing Page
function PageHome() {
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

<<<<<<< HEAD
// interface NotTimeYetProps {
//   alarmTime: string;
//   wakeUpToggle: boolean;
//   audioToggle: boolean;
//   visualDisplay: boolean; }
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
  const chosenSong = location.state?.chosenSong;

  const [currentTime, setCurrentTime] = useState(new Date());

  // naviagate to '/wakeup' or '/wakeup-audio' when currentTime >= alarmTime:
  function navToWakePage({alarmTime, wakeUpToggle, audioToggle, currentTime, visualDisplay, chosenSong}: navToWakePageProps) {
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
    console.log(typeof alarmTime);
    console.log("currentTimestring is", currentTimeString);
    console.log(typeof currentTimeString);
    console.log(currentTimeString <= alarmTime);
    if (currentTimeString >= alarmTime && wakeUpToggle === false) {
      navigate('/wakeup', {state: { alarmTime: alarmTime,  wakeUpToggle: wakeUpToggle,
        audioToggle: audioToggle, visualDisplay: visualDisplay}}); 
    } else if (currentTimeString >= alarmTime && wakeUpToggle === true) {
      navigate('/wakeup-audio', {state: { wakeUpToggle: wakeUpToggle,
        audioToggle: audioToggle, visualDisplay: visualDisplay, chosenSong: chosenSong}});
    }
  }
  //TODO: Make visualCountdown page, then uncomment this:

  // if (visualDisplay === true) {
  //   navigate('/visualcountdown', {state: { alarmTime: alarmTime,  wakeUpToggle: wakeUpToggle,
  //     audioToggle: audioToggle, visualDisplay: visualDisplay}}); 
  // }

  //currentTimeDisplay component has similar useEffect hook; is it necessary in both places?
  useEffect(() => { 
    navToWakePage({alarmTime, wakeUpToggle, audioToggle, currentTime, visualDisplay, chosenSong});
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
        <GreenTrafficLight/>
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

//play wake up song!
function WakeUpWithAudio() {
  const location:any = useLocation();
  const wakeUpToggle = location.state?.wakeUpToggle;
  const audioToggle = location.state?.audioToggle;
  const visualDisplay = location.state?.visualDisplay;
  const chosenSong = location.state?.chosenSong;

    return (
      <>
        <main>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/set">Modify Alarm</Link>
        </nav>
          <h2>You can Wake up!</h2>
          <GreenTrafficLight/>
          <CurrentTimeDisplay/>
          {/* set ternary expression whether to display MusicPlay, and AudioBook */}
          {/* set ternary expression whether to play wakeUpSong, and if so, display a stop button */}
          <audio controls autoPlay> 
            <source src={chosenSong} type="audio/mpeg"/>
          </audio>
          <MusicPlay/>
          <AudioBook/>
          {/* <VisualCountdown/> */}
        </main>
        
      </>
    );
  }

=======
>>>>>>> attempt2liftState
export default App;