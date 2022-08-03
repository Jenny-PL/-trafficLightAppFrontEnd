import React from "react";
import { Link }  from 'react-router-dom';
import CurrentTimeDisplay from "./CurrentTimeDisplay";
import GreenTrafficLight from "./GreenTrafficLight";
import MusicPlay from "./MusicPlay";
import AudioBook from "./AudioBook";
import "./PageOkayToWakeUp.css";

interface PageOkayToWakeUpProps {
    alarmTime: string;
    wakeUpToggle: boolean;
    audioToggle: boolean;
    visualDisplay: boolean;
}
function PageOkayToWakeUp({alarmTime, wakeUpToggle, audioToggle, visualDisplay}:PageOkayToWakeUpProps) {
    return (
    <>
        <main>
        <nav>
        <Link to="/">Home</Link>
        <Link to="/set">Modify Alarm</Link>
        </nav>
        <h2>You can Wake up!</h2>
        <GreenTrafficLight/>
        <CurrentTimeDisplay/>
        {/* set ternary expression whether to display MusicPlay, and AudioBook */}
        {/* set ternary expression whether to play wakeUpSong, and if so, display a stop button */}
        <MusicPlay/>
        <AudioBook/>
        {/* <VisualCountdown/> */}
        </main>
    </>
    );
}
export default PageOkayToWakeUp;