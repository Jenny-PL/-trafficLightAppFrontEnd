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

  const url = "http://127.0.0.1:5000" //change to heroku deployed url when able
  //database: trafficlight
  // collection: wakeup

  const [alarmTime, setAlarmTime] = React.useState(new Date());
  const [wakeUpToggle, setWakeUpToggle] = React.useState<boolean>(false);
  const [audioToggle, setAudioToggle] = React.useState<boolean>(false);
  const [visualDisplay, setVisualDisplay] = React.useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [chosenSong, setChosenSong] = React.useState<any>(null);
  const [alarmSetAt, setAlarmSetAt] = React.useState(new Date());

  //To DO: add axios call for POST to db 

  //useEffect allows the component to render, then make the API call asynchronously 
  //after the app is fully rendered; the empty dependency array means it will only be called 1x

 

    // want to add chosenSong to database.
    // convert chosenSong string --> binary?!

  //   let binarySong: BinaryData;
  //   const chosenSongToAudio = (chosenSong) =>{
  //     //convert file path to binary to store in DB?
  //     binarySong = ArrayBufferToBinary(chosenSong);
  //   }

  //   //What is this array buffer?  how do I get it?
  //   function ArrayBufferToBinary(chosenSong) {
  //     // Convert an array buffer to a string bit-representation: 0 1 1 0 0 0...
  //     var uint8 = new Uint8Array(chosenSong);
  //     return uint8.reduce((binary, uint8) => binary + uint8.toString(2), "");
  // }
//   const config = { headers: {  
//     'Content-Type': 'file.type',
//     'Access-Control-Allow-Origin': '*'}
// }

// useEffect(() => {
//   console.log("in use effect", chosenSong)

// //  const add_song = (chosenSong:any) => {
//     // axios.post(`${url}/alarmsong`, config)
//   axios.post(`${url}/alarmsong`, chosenSong)
//       .then((response) => {
//         //  config; //need to add headers to response somehow?
//         console.log(chosenSong, 'Song sent to database', response.data);
//   })
//       .catch((error) => {
//         console.log('Error with sending song to database', error.response.status);
//         console.log('The data from response with an error:', error.response.data);
//       });
//     }, [chosenSong]);



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
        <Route path="alarm" element={<PageNotTimeYet alarmTime={alarmTime} wakeUpToggle={wakeUpToggle} setCurrentTime={setCurrentTime} currentTime={currentTime} visualDisplay={visualDisplay} setAlarmTime={setAlarmTime} setAlarmSetAt={setAlarmSetAt}/> } />
        <Route path="wakeup" element={<PageOkayToWakeUp alarmTime={alarmTime} audioToggle={audioToggle} visualDisplay={visualDisplay} alarmSetAt={alarmSetAt} currentTime={currentTime}/> } />
        <Route path="wakeup-audio" element={<PageWakeUpWithAudio alarmTime={alarmTime} audioToggle={audioToggle} visualDisplay={visualDisplay} alarmSetAt={alarmSetAt} chosenSong={chosenSong} currentTime={currentTime}/> } />
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