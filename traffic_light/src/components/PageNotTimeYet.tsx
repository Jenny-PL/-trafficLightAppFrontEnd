import React from "react";
import "./PageNotTimeYet.css";
import {useEffect, useState, useRef} from "react";
import { useNavigate, Link }  from 'react-router-dom';
import AlarmTimeDisplay from "./AlarmTimeDisplay";
import RedTrafficLight from "./RedTrafficLight";
import VisualCountdown from "./VisualCountdown";
import CurrentTimeDisplay from "./CurrentTimeDisplay";
interface PageNotTimeYetProps {
    alarmTime: Date;
    wakeUpToggle: boolean;
    setCurrentTime: Function;
    currentTime: Date; 
    visualDisplay: boolean;
    setAlarmSetAt: Function;
    setAlarmTime: Function;
    chosenSong: any;
    }

interface navToWakePageProps {
  alarmTime: Date;
  wakeUpToggle: boolean;
  currentTime:  Date; 
  chosenSong: any;
}

  function PageNotTimeYet({alarmTime, wakeUpToggle, setCurrentTime, currentTime, visualDisplay, setAlarmSetAt, setAlarmTime, chosenSong}: PageNotTimeYetProps) { 
    const navigate = useNavigate(); // this is for routing to a new link

    // naviagate to '/wakeup' or '/wakeup-audio' when currentTime >= alarmTime:
    function navToWakePage({alarmTime, wakeUpToggle, currentTime, chosenSong}: navToWakePageProps) {
      console.log("inside navigate to wake page function!")
      console.log("alarmTime is:", alarmTime); // Thu Aug 11 2022 10:44:00 GMT-0700 (Pacific Daylight Time)
      console.log('current time is:', currentTime) 
  
        if (currentTime >= alarmTime  && wakeUpToggle === false) {
          navigate('/wakeup')
        }
        else if (currentTime >= alarmTime && wakeUpToggle) {
          navigate('/wakeup-audio');
      } 
    }

  // const refContainer = useRef(initialValue);
  // This is to keep track of the time the alarm was initially set. 
  const firstRender = useRef(true);
  const firstTime = useRef(new Date());
  
    useEffect(() => { 
      if (firstRender.current) {
        firstRender.current = false;
        firstTime.current = new Date(); 
        setAlarmSetAt(firstTime.current);
        console.log("this should only print 1x: the time the alarm was set,", firstTime.current)
        return;
      }
      navToWakePage({alarmTime, wakeUpToggle, currentTime, chosenSong});
      const interval = setInterval(() => 
      setCurrentTime(new Date()),
      6000);
      return () => {
          clearInterval(interval);
      };
      }, ); 
  
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
          {visualDisplay ? <VisualCountdown alarmTime={alarmTime} alarmSetAt={firstTime.current} currentTime={currentTime} /> : null}
          <CurrentTimeDisplay/>
        </main>
      </>
    );
  }

  export default PageNotTimeYet;