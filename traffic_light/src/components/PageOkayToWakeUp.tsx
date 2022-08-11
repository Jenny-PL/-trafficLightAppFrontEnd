import React from "react";
import { Link }  from 'react-router-dom';
import CurrentTimeDisplay from "./CurrentTimeDisplay";
import GreenTrafficLight from "./GreenTrafficLight";
import MusicPlay from "./MusicPlay";
import AudioBook from "./AudioBook";
import VisualCountdown from "./VisualCountdown";
import "./PageOkayToWakeUp.css";

interface PageOkayToWakeUpProps {
    alarmTime: Date;
    audioToggle: boolean;
    visualDisplay: boolean;
    alarmSetAt: Date;
    currentTime: Date;
}
function PageOkayToWakeUp({alarmTime, audioToggle, visualDisplay, alarmSetAt, currentTime}:PageOkayToWakeUpProps) {
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
            {audioToggle ? <> <AudioBook/> <MusicPlay/> </> : null}
            {visualDisplay ? <VisualCountdown alarmTime={alarmTime} alarmSetAt={alarmSetAt} currentTime={currentTime}/> : null}
        </main>
    </>
    );
}
export default PageOkayToWakeUp;