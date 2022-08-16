import React, { useState, useEffect } from "react";
import axios from 'axios';
import './App.css';
import PageSetAlarmForm from "./components/PageSetAlarmForm";
import PageNotTimeYet from "./components/PageNotTimeYet";
import PageOkayToWakeUp from "./components/PageOkayToWakeUp";
import PageWakeUpWithAudio from "./components/PageWakeUpWithAudio";
import TrafficLight from "./components/TrafficLight";
import { Routes, Route, Link } from "react-router-dom";

function App() {

  const url = "https://traffic-light-clock-be.herokuapp.com"

  const [alarmTime, setAlarmTime] = React.useState(new Date());
  const [wakeUpToggle, setWakeUpToggle] = React.useState<boolean>(false);
  const [audioToggle, setAudioToggle] = React.useState<boolean>(false);
  const [visualDisplay, setVisualDisplay] = React.useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [chosenSong, setChosenSong] = React.useState<any>(null);
  const [alarmSetAt, setAlarmSetAt] = React.useState(new Date());
  const [songList, setSongList] = React.useState(['testOne', 'testTwo'])
  const [fileURL, setfileURL] = React.useState('');

//useEffect allows the component to render, then make the API call asynchronously 
//The empty dependency array means it will only be called 1x

// Load list of available songs names from the DB
useEffect(() => {
  console.log("in use effect")
  axios.get(`${url}/playmusic`)
  .then((response) => {
        const responseSongList = response.data;
        console.log('List of songs from DB obtained', response.status);
        setSongList(responseSongList);
      }) 
      .catch((error) => {
        console.log('Error with getting songs from DB', error.response.status);
        console.log('The data from response with an error:', error.response.data);
      });
  }, []); 

  // React router
  return (
    <div className="App">
      <header className="App-header">
      </header>
      <Routes>
        <Route path="/" element={<PageHome />} />
        <Route path="set" element={<PageSetAlarmForm setAlarmTime={setAlarmTime} setWakeUpToggle={setWakeUpToggle} setAudioToggle={setAudioToggle} setVisualDisplay={setVisualDisplay} setChosenSong={setChosenSong} alarmTime={alarmTime} chosenSong={chosenSong} songList={songList} setfileURL={setfileURL}/> } />
        <Route path="alarm" element={<PageNotTimeYet alarmTime={alarmTime} wakeUpToggle={wakeUpToggle} setCurrentTime={setCurrentTime} currentTime={currentTime} visualDisplay={visualDisplay} setAlarmTime={setAlarmTime} setAlarmSetAt={setAlarmSetAt} chosenSong={chosenSong}/> } />
        <Route path="wakeup" element={<PageOkayToWakeUp alarmTime={alarmTime} audioToggle={audioToggle} visualDisplay={visualDisplay} alarmSetAt={alarmSetAt} currentTime={currentTime}/> } />
        <Route path="wakeup-audio" element={<PageWakeUpWithAudio alarmTime={alarmTime} audioToggle={audioToggle} visualDisplay={visualDisplay} alarmSetAt={alarmSetAt} chosenSong={chosenSong} currentTime={currentTime} fileURL={fileURL} setfileURL={setfileURL}/> } />
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
        <Link to="/set">Set alarm</Link>
      </nav>
    </>
  );
}

export default App;