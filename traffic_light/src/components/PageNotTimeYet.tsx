import React from "react";
import "./PageNotTimeYet.css";
import {useEffect, useState} from "react";
import { useNavigate, Link }  from 'react-router-dom';
import AlarmTimeDisplay from "./AlarmTimeDisplay";
import RedTrafficLight from "./RedTrafficLight";
import CurrentTimeDisplay from "./CurrentTimeDisplay";

//MAJOR BUG: Why is page navigating to /wakeup before statement in ine 41 is true??
interface PageNotTimeYetProps {
    alarmTime: string;
    wakeUpToggle: boolean;
    setCurrentTime: Function;
    currentTime: Date;
    }

interface navToWakePageProps {
  alarmTime: string;
  wakeUpToggle: boolean;
  currentTime: Date;
}
  
  function PageNotTimeYet({alarmTime, wakeUpToggle, setCurrentTime, currentTime}: PageNotTimeYetProps) { 
    const navigate = useNavigate(); // this is for routing to a new link

    // naviagate to '/wakeup' or '/wakeup-audio' when currentTime >= alarmTime:
    function navToWakePage({alarmTime, wakeUpToggle, currentTime}: navToWakePageProps) {
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
      console.log(currentTimeString.valueOf());
      console.log("type for value of:", typeof currentTimeString.valueOf());
      console.log(typeof currentTimeString);
      console.log("true or false?", currentTimeString >= alarmTime && wakeUpToggle===false);
      console.log("I'm in PageNotYetTime");

      if (currentTimeString >= alarmTime && wakeUpToggle === false)
      if (currentTimeString.valueOf() >= alarmTime.valueOf() && wakeUpToggle === false)  {
        console.log("in navigate logic- to wakeup")
        navigate('/wakeup')
      } else if (currentTimeString >= alarmTime && wakeUpToggle) {
        console.log("in navigate logic- to wakeup with audio")
        navigate('/wakeup-audio');
      }
    }
    //TODO: Make visualCountdown page, then uncomment this:
    // if (visualDisplay === true) {
    //   navigate('/visualcountdown', {state: { alarmTime: alarmTime,  wakeUpToggle: wakeUpToggle,
    //     audioToggle: audioToggle, visualDisplay: visualDisplay}}); 
    // }
  
    //currentTimeDisplay component has similar useEffect hook; is it necessary in both places?
    useEffect(() => { 
      navToWakePage({alarmTime, wakeUpToggle, currentTime});
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

  export default PageNotTimeYet;