import React from "react";
import "./VisualCountdown.css";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import {useEffect, useState} from "react";

// progress circle
// yarn add react-circular-progressbar



interface VisualCountdownProps {
    alarmTime: string, //example: '18:08'
    alarmSetAt: Date // example: 'Tue Aug 09 2022 21:05:57 GMT-0700 (Pacific Daylight Time)'
}


function VisualCountdown({alarmTime, alarmSetAt}:VisualCountdownProps): JSX.Element {
//BUG: add code to calculate % based on diff between alarmTime and currentTime

    const now = new Date();
    // trigger a re-render every 60sec:
    const [time, setTime] = useState(now);
    useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 6000);
    return () => {
        clearInterval(interval);
    };
    }, []);


    let percentage: number;
    console.log( "It is:", time)
    
    let currentHrs = time.getHours();
    let currentMins = time.getMinutes();

    let alarmHrs: string = alarmTime.substring(0,2);
    let alarmHours: number = Number(alarmHrs)
    let alarmMins: string = alarmTime.substring(3,5);
    let alarmMinutes: number = Number(alarmMins);

    let alarmSetString = alarmSetAt.toString();
    let alarmSetArray = alarmSetString.split(" ");
    let alarmSetAtTime = alarmSetArray[4] // example: 21:05:57
    console.log(alarmSetAtTime);

    let alarmSetAtHrs:string = alarmSetAtTime.substring(0,2);
    let alarmSetHours: number = Number(alarmSetAtHrs);
    let alarmSetAtMins:string = alarmSetAtTime.substring(3,5);
    let alarmSetMins: number = Number(alarmSetAtMins);

    let hoursDiff:number = alarmHours - currentHrs; // 10-8: 2
    let minsDiff:number = alarmMinutes - currentMins; //30 -50: -20
    minsDiff = hoursDiff*60 - minsDiff // 100mins

    let origDiffHours = alarmHours - alarmSetHours;
    let origDiffMins = alarmMinutes - alarmSetMins;
    origDiffMins = origDiffHours*60 - origDiffMins;

    percentage = (origDiffMins - minsDiff)*100;






    return (
        <CircularProgressbar value={percentage} />
    )
}

export default VisualCountdown;