import React from "react";
import "./VisualCountdown.css";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

// progress circle
// yarn add react-circular-progressbar



// interface VisualCountdownProps {
// }
// ((}:VisualCountdownProps)

function VisualCountdown(): JSX.Element {
//BUG: add code to calculate % based on diff between alarmTime and currentTime
    const percentage = 66;
   

    return (
        <CircularProgressbar value={percentage} />
    )
}

export default VisualCountdown;