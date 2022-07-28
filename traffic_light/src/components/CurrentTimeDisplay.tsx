import React from "react";
import "./CurrentTimeDisplay.css";

// interface CurrentTimeDisplayProps {
// }

function CurrentTimeDisplay(): JSX.Element {

    const modifyAmPm: Function = () => {
        const now = new Date();
        let hours: number = now.getHours();
        let suffix: string = ' AM';
        let minutes: number = now.getMinutes();

        if (hours > 12) {
            hours = hours - 12;
            suffix = ' PM'
            if (minutes < 10) {
                let currentTime: string = hours + ':0' + minutes + suffix;
                return currentTime;
            }
            let currentTime: string = hours + ':' + minutes + suffix;
            return currentTime;
        } else {
            if (minutes < 10) {
                let currentTime: string = hours + ':0' + minutes + suffix;
                return currentTime;
            }
            let currentTime: string = hours + ':' + minutes + suffix;
            return currentTime;
        }
    }

    let currentTime: string = modifyAmPm();


    return ( 
        <div>
        <h2>Current Time:</h2>
        <p> {currentTime} </p> 
        </div>
    )
}

export default CurrentTimeDisplay;