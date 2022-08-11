import React from "react";
import "./VisualCountdown.css";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import {useEffect, useState} from "react";

// progress circle
// yarn add react-circular-progressbar



interface VisualCountdownProps {
    alarmTime: string, //example: '2022-08-10T02:07'
    alarmSetAt: string // example: 'Tue Aug 09 2022 21:05:57 GMT-0700 (Pacific Daylight Time)'
}


function VisualCountdown({alarmTime, alarmSetAt}:VisualCountdownProps): JSX.Element {
//BUG: add code to calculate % based on diff between alarmTime and currentTime

    const now = new Date().toLocaleString();
    // trigger a re-render every 60sec:
    const [time, setTime] = useState(now);
    useEffect(() => {
    const interval = setInterval(() => setTime(new Date().toLocaleString()), 6000);
    return () => {
        clearInterval(interval);
    };
    }, []);

    let percentage: number;
    percentage = 60;

    //BUG: alarmSetAt: Wed Aug 10 2022 20:03:58 GMT-0700 (Pacific Daylight Time)
    //BUG: alarmTime: 2022-08-11T10:03
    console.log("Alarm was set at", alarmSetAt) // 8/10/2022, 2:10:14 PM  
    //new Date(2022,7,10,14,10,14) --> 2022-08-10T21:10:14.000Z
    console.log("alarm time", alarmTime); //  8/11/2022, 5:02:00 AM
    console.log("current time: ", time); // 8/10/2022, 2:10:08 PM

    //helper function to translate from  '8/11/2022, 5:02:00 AM' --> 2022-08-10T21:10:14.000Z 
    // with new Date(2022,7,10,14,10,14): new Date(year, month:0-11, date, hour, mins, seconds)
    function translateToDate(time: string) {
        let timeList = time.split(" "); // ['8/11/2022,', '5:02:00', 'AM']
        let dateList = time[0].split("/"); // ['8', '11', 2022,']
        let month = String(Number(dateList[0]) -1);
        let day = dateList[1];
        let year = dateList[2].replace(",", "");
        let clockList = time[1].split(":"); // ['5', '02', '00']
        let hrs = clockList[0];
        let mins = clockList[1];
        let secs = clockList[2];

        let hours = "";
        if (timeList[2] === "PM") {
            hours = String(12 + Number(hrs));
        }
        else if (timeList[2] === "AM"){
            hours = String(hrs);
        }
        return new Date(year,month,day,hours,mins,secs);
    }

    let timeDate = translateToDate(time);
    let alarmSetAtDate = translateToDate(alarmSetAt);
    let alarmTimeDate = translateToDate(alarmTime);

    let origDiff = alarmTimeDate.getTime() - alarmSetAtDate.getTime()
    console.log("orig time diff: ", origDiff)
    let currentDiff = alarmTimeDate.getTime() -  timeDate.getTime()
    console.log("current Time diff: ", currentDiff)

    percentage = (currentDiff/origDiff)*100
    console.log("perecentage is:", percentage )
    


    // let currentHrs = time.getHours();
    // let currentMins = time.getMinutes();

    // let alarmHrs: string = alarmTime.substring(0,2);
    // let alarmHours: number = Number(alarmHrs)
    // let alarmMins: string = alarmTime.substring(3,5);
    // let alarmMinutes: number = Number(alarmMins);

    // let alarmSetString = alarmSetAt.toString();
    // let alarmSetArray = alarmSetString.split(" ");
    // let alarmSetAtTime = alarmSetArray[4] // example: 21:05:57
    // console.log(alarmSetAtTime);

    // let alarmSetAtHrs:string = alarmSetAtTime.substring(0,2);
    // let alarmSetHours: number = Number(alarmSetAtHrs);
    // let alarmSetAtMins:string = alarmSetAtTime.substring(3,5);
    // let alarmSetMins: number = Number(alarmSetAtMins);

    // let hoursDiff:number = alarmHours - currentHrs; // 10-8: 2
    // let minsDiff:number = alarmMinutes - currentMins; //30 -50: -20
    // minsDiff = hoursDiff*60 - minsDiff // 100mins

    // let origDiffHours = alarmHours - alarmSetHours;
    // let origDiffMins = alarmMinutes - alarmSetMins;
    // origDiffMins = origDiffHours*60 - origDiffMins;

    // percentage = (origDiffMins - minsDiff)*100;

    return (
        <CircularProgressbar value={percentage} />
    )
}

export default VisualCountdown;