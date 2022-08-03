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

export default App;