import React from "react";
import "./AlarmTimeDisplay.css";

interface alarmTimeDisplayProps {
    alarmTime: string
}

function AlarmTimeDisplay({alarmTime}: alarmTimeDisplayProps): JSX.Element {

    const modifyAmPm: Function = (alarmTime:string) => {
        let hrs: string = alarmTime.substring(0,2);
        let hours: number = Number(hrs)
        let suffix: string = ' AM';
        let minutes: string = alarmTime.substring(3,5);
       
        if (hours > 12) {
            hours = hours - 12;
            suffix = ' PM'
            let modAlarmTime: string = hours + ':' + minutes + suffix;
            return modAlarmTime;
        } else {
            let modAlarmTime: string = hours + ':' + minutes + suffix;
            return modAlarmTime;
            }
        }

    let modifiedTime: string = modifyAmPm(alarmTime);

    return ( 
        <div>
        <p> {modifiedTime} </p> 
        </div>
    )
}

export default AlarmTimeDisplay;