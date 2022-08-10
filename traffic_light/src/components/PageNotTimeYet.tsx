import React from "react";
import "./PageNotTimeYet.css";
import {useEffect, useState, useRef} from "react";
import { useNavigate, Link }  from 'react-router-dom';
import AlarmTimeDisplay from "./AlarmTimeDisplay";
import RedTrafficLight from "./RedTrafficLight";
import VisualCountdown from "./VisualCountdown";
import CurrentTimeDisplay from "./CurrentTimeDisplay";

//MAJOR BUG: Why is page navigating to /wakeup before statement in ine 41 is true??
interface PageNotTimeYetProps {
    // alarmTime: string;
    alarmTime: Date;
    wakeUpToggle: boolean;
    setCurrentTime: Function;
    currentTime: Date;
    visualDisplay: boolean;
    }

interface navToWakePageProps {
  // alarmTime: string;
  alarmTime: Date;
  wakeUpToggle: boolean;
  currentTime: Date;
}
  
  function PageNotTimeYet({alarmTime, wakeUpToggle, setCurrentTime, currentTime, visualDisplay}: PageNotTimeYetProps) { 
    const navigate = useNavigate(); // this is for routing to a new link

    // naviagate to '/wakeup' or '/wakeup-audio' when currentTime >= alarmTime:
    function navToWakePage({alarmTime, wakeUpToggle, currentTime}: navToWakePageProps) {
      console.log("inside navegate to wake page function!")
      
      // let currentDay = currentTime.getDate();
      // let minutes = currentTime.getMinutes();
      // let hours = currentTime.getHours();
      // let hrs: string;
      // let mins :string;
      // let currentTimeString: string;

      // if (hours < 10 && minutes < 10) {
      //   mins = "0" + minutes;
      //   hrs = "0" + hours;
      //   currentTimeString = hrs + ":" + mins;
      // }
      // else if (hours < 10) {
      //   hrs = "0" + hours;
      //   currentTimeString = hrs + ":" + minutes;
      // }
      // else if (minutes < 10) {
      //   mins = "0" + minutes;
      //   currentTimeString = currentTime.getHours() + ":" + mins;
      // }
      // else {
      //   currentTimeString = currentTime.getHours() + ":" + currentTime.getMinutes();
      // }

      if (currentTime >= alarmTime  && wakeUpToggle === false)) {
        navigate('/wakeup')
      }
      else if ((currentTime >= alarmTime && wakeUpToggle) {
        navigate('/wakeup-audio');
      }

      // console.log("currentTimeString: ",currentTimeString);
      console.log("alarmTime is:", alarmTime); '2022-08-10T02:07'
    
    
      // if (currentTimeString >= alarmTime && wakeUpToggle === false) {
      //   navigate('/wakeup')
      // } else if (currentTimeString >= alarmTime && wakeUpToggle) {
      //   navigate('/wakeup-audio');
      // }
    }


  // const refContainer = useRef(initialValue);
  // This is to keep track of the time the alarm was initially set. 
  const firstRender = useRef(true);
  const firstTime = useRef(new Date());
  
    //currentTimeDisplay component has similar useEffect hook; is it necessary in both places?
    useEffect(() => { 
      navToWakePage({alarmTime, wakeUpToggle, currentTime});
      if (firstRender.current) {
        firstRender.current = false;
        firstTime.current = new Date(); // this is an object
        console.log("this should only print 1x: the time the alarm was set,", firstTime.current)
        return;
      }

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
          {visualDisplay ? <VisualCountdown currentTime={currentTime} alarmTime={alarmTime} alarmSetAt={firstTime.current} /> : null}
          <CurrentTimeDisplay/>
        </main>
      </>
    );
  }

  export default PageNotTimeYet;