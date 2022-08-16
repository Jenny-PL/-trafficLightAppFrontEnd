import React from "react";
import {useState, useEffect} from "react";
import "./CurrentTimeDisplay.css";

function CurrentTimeDisplay(): JSX.Element {

    const now = new Date();
    // trigger a re-render every 60sec:
    const [time, setTime] = useState(now);

    useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 6000);
    return () => {
        clearInterval(interval);
    };
    }, []);

    // only invoke setInterval once when the component gets mounted 
    // then setInterval calls setTime(Date.now()) every 60 seconds. 
    // Finally, we invoke clearInterval when the component is unmounted.
    // Note that the component gets updated, based on how you've used time in it,
    // every time the value of time changes
    // https://stackoverflow.com/questions/39426083/update-react-component-every-second


    const modifyAmPm: Function = () => {
        let hours: number = time.getHours();
        let suffix: string = ' AM';
        let minutes: number = time.getMinutes();

        if (hours === 12) {
            suffix = ' PM';
        }

        if (hours === 0) {
            hours = hours + 12;
        }

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