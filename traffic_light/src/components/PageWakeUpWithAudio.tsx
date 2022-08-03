import React from "react";
import { Link }  from 'react-router-dom';
import CurrentTimeDisplay from "./CurrentTimeDisplay";
import GreenTrafficLight from "./GreenTrafficLight";
import MusicPlay from "./MusicPlay";
import AudioBook from "./AudioBook";
import "./PageOkayToWakeUp.css";

interface PageWakeUpWithAudioProps {
    alarmTime: string;
    wakeUpToggle: boolean;
    audioToggle: boolean;
    visualDisplay: boolean;
    chosenSong: string; //need to change this to audiofile? binary?
}

//play wake up song!
function PageWakeUpWithAudio({alarmTime, wakeUpToggle, audioToggle, visualDisplay, chosenSong}:PageWakeUpWithAudioProps) {
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
        <audio controls autoPlay> 
            <source src={chosenSong} type="audio/mpeg"/>
        </audio>
        <MusicPlay/>
        <AudioBook/>
        {/* <VisualCountdown/> */}
        </main>
        
    </>
    );
}

export default PageWakeUpWithAudio;