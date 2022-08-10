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
    alarmTime: string;
    wakeUpToggle: boolean;
    setCurrentTime: Function;
    currentTime: string; 
    visualDisplay: boolean;
    setAlarmSetAt: Function;
    setAlarmTime: Function;
    }

interface navToWakePageProps {
  alarmTime: string;
  wakeUpToggle: boolean;
  currentTime:  string; 
  setAlarmTime: Function;
}

interface modifyAlarmProps {
  alarmTime: string;
}
  
  function PageNotTimeYet({alarmTime, wakeUpToggle, setCurrentTime, currentTime, visualDisplay, setAlarmSetAt, setAlarmTime}: PageNotTimeYetProps) { 
    const navigate = useNavigate(); // this is for routing to a new link

    // naviagate to '/wakeup' or '/wakeup-audio' when currentTime >= alarmTime:
    function navToWakePage({alarmTime, wakeUpToggle, currentTime, setAlarmTime}: navToWakePageProps) {
      console.log("inside navegate to wake page function!")
      console.log("alarmTime is:", alarmTime); //'2022-08-10T02:07'
      console.log('current time is:', currentTime) // '8/10/2022, 1:05:09 PM'

      // This will check if alarmTime has been modified to comparable syntax:
      console.log("M in alarmtime?", alarmTime.includes('M'));
      
      if (alarmTime.includes('M')){
        if (currentTime >= alarmTime  && wakeUpToggle === false) {
          navigate('/wakeup')
        }
        else if (currentTime >= alarmTime && wakeUpToggle) {
          navigate('/wakeup-audio');
      }
      }
    }

    //helper function to modify alarmTime and re-set state. only runs 1x on first render, per useRef
    function modifyAlarm({alarmTime}:modifyAlarmProps){
      // The code below modifies to match currentTime syntax: '2022-08-10T02:07' --> '8/10/2022, 2:07:00 AM'
      let years = alarmTime.substring(0,4);
      let month = alarmTime.substring(5,7);
      let day = alarmTime.substring(8,10);
      let hours = alarmTime.substring(11,13);
      let minutes = alarmTime.substring(14,16);
      let suffix: string = "AM";
      //drop the 0 in front of days, months, and hours:
      if (Number(day) < 10) {day = alarmTime.substring(9,10)}
      if (Number(month) < 10) {month = alarmTime.substring(6,7)}
      if (Number(hours) < 10) {hours = alarmTime.substring(12,13)}
    
      if (Number(hours) < 12) {suffix = 'AM'}
      else if(Number(hours) === 12) {suffix = 'PM';}
      else if (Number(hours) > 12) {suffix = 'PM'; hours = String(Number(hours)-12)}
  
      let alarmTimeString = `${month}/${day}/${years}, ${hours}:${minutes}:00 ${suffix}`;
      console.log("alarmTimeString is:", alarmTimeString); //'2022-08-10T02:07' --> '8/10/2022, 2:07:00 AM'
      console.log('current time is:', currentTime);

      // Send modified alarmTime up to App level via state (only want to do this 1x)
      return alarmTimeString;
      }


  // const refContainer = useRef(initialValue);
  // This is to keep track of the time the alarm was initially set. 
  const firstRender = useRef(true);
  const firstTime = useRef(new Date());
  
    //currentTimeDisplay component has similar useEffect hook; is it necessary in both places?
    useEffect(() => { 
      if (firstRender.current) {
        firstRender.current = false;
        firstTime.current = new Date(); // this is a Date object
        setAlarmSetAt(firstTime.current.toLocaleString());
        let alarmTimeString = modifyAlarm({alarmTime})
        setAlarmTime(alarmTimeString); //this will modify the alarmTime syntax only on first render
        console.log("this should only print 1x: the time the alarm was set,", firstTime.current.toLocaleString())
        return;
      }
      navToWakePage({alarmTime, wakeUpToggle, currentTime, setAlarmTime});
      const interval = setInterval(() => 
      setCurrentTime(new Date().toLocaleString()),
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
          {visualDisplay ? <VisualCountdown alarmTime={alarmTime} alarmSetAt={firstTime.current} /> : null}
          <CurrentTimeDisplay/>
        </main>
      </>
    );
  }

  export default PageNotTimeYet;