import React from "react";
import "./CurrentTimeDisplay.css";

// interface YesNoSliderProps {
// }

function CurrentTimeDisplay(): JSX.Element {
    let currentTime = new Date();

    return (
        <div>
            <p>{currentTime.toDateString()}</p>
        </div>

)}

export default CurrentTimeDisplay;