import React from "react";
import "./AlarmTimeDisplay.css";

interface alarmTimeDisplayProps {
    alarmTime: Date // Thu Aug 11 2022 10:44:00 GMT-0700 (Pacific Daylight Time)
} 

function AlarmTimeDisplay({alarmTime}: alarmTimeDisplayProps): JSX.Element {

    const modifyAmPm: Function = () => {
        let hours: number = alarmTime.getHours();
        let suffix: string = ' AM';
        let minutes: number = alarmTime.getMinutes();

        if (hours === 0) {
            hours = hours + 12;
        }

        if (hours > 12) {
            hours = hours - 12;
            suffix = ' PM'
            if (minutes < 10) {
                let modAlarmDisplay = `${hours}:0${minutes} ${suffix}`
                return modAlarmDisplay;
            }
            let modAlarmDisplay = `${hours}:${minutes} ${suffix}`
                return modAlarmDisplay;
            } 
        else {
            if (minutes < 10) {
                let modAlarmDisplay = `${hours}:0${minutes} ${suffix}`
                return modAlarmDisplay;
            }
            let modAlarmDisplay = `${hours}:${minutes} ${suffix}`
            return modAlarmDisplay;
        }
    }

    let modifiedAlarmDisplay = modifyAmPm();
    
    return ( 
        <div>
        <p> {modifiedAlarmDisplay} </p> 
        </div>
    )
}


export default AlarmTimeDisplay;