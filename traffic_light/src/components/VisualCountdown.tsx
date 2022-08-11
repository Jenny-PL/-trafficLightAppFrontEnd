import React from "react";
import "./VisualCountdown.css";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import {useEffect, useState} from "react";

// progress circle
// yarn add react-circular-progressbar

interface VisualCountdownProps {
    alarmTime: Date; //'Tue Aug 09 2022 21:05:57 GMT-0700 (Pacific Daylight Time)'
    alarmSetAt: Date; 
    currentTime: Date;
}


function VisualCountdown({alarmTime, alarmSetAt, currentTime}:VisualCountdownProps): JSX.Element {
    let percentage: number;
   
    console.log( "It is:", currentTime) 
    console.log("alarm time", alarmTime); 
    
    let origDiff = alarmTime.getTime() - alarmSetAt.getTime();
    console.log("orig time diff: ", origDiff)
    let currentDiff = alarmTime.getTime() -  currentTime.getTime()
    console.log("current Time diff: ", currentDiff)

    percentage = ((origDiff-currentDiff)/origDiff)*100
    console.log("perecentage is:", percentage )

    return (
        <CircularProgressbar value={percentage} />
    )
}

export default VisualCountdown;