import React from "react";
import "./AlarmTimeDisplay.css";

interface alarmTimeDisplayProps {
    alarmTime: string // 2022-08-10T00:54  will be compared with '8/10/2022, 1:05:09 PM'
} 

function AlarmTimeDisplay({alarmTime}: alarmTimeDisplayProps): JSX.Element {
     
    const modifyAmPm: Function = (alarmTime:string) => {

        // Depending on speed of first render and alarmTime state setting:
        // this code will run if alarmTime is in this format: '8/11/2022, 4:42:00 AM'  
        if (alarmTime.includes('M')) {
        console.log("Inside split function in modifyAMPM. alarmTime is: ", alarmTime)
        let timeList = alarmTime.split(" ");
        let suffix = timeList[2];
        let hoursMins = timeList[1];
        let hoursMinsList = hoursMins.split(":");
        let hours = hoursMinsList[0];
        let mins = hoursMinsList[1];

        return `${hours}:${mins} ${suffix}`
        }

        //this code will run if alarmTime is in this format: 2022-08-10T00:54 
        else {
        let hours = alarmTime.substring(11,13);
        let minutes = alarmTime.substring(14,16);
        let suffix = 'PM'
        //drop the 0 in front of hours:
        if (Number(hours) < 10)
        {
        hours = alarmTime.substring(12,13)
        }
        // return AM hours
        if (Number(hours) < 12) {
            suffix = 'AM';
            return `${hours}:${minutes} ${suffix}`;
        }
        // return PM hours, not in military tie:
        else {
            return `${Number(hours)-12}:${minutes} ${suffix}`;
        }
    }
    }

    let modAlarmDisplay: string = modifyAmPm(alarmTime);

    return ( 
        <div>
        <p> {modAlarmDisplay} </p> 
        </div>
    )
}


export default AlarmTimeDisplay;