import React from "react";
import { Link }  from 'react-router-dom';
import CurrentTimeDisplay from "./CurrentTimeDisplay";
import GreenTrafficLight from "./GreenTrafficLight";
import MusicPlay from "./MusicPlay";
import AudioBook from "./AudioBook";
import "./PageOkayToWakeUp.css";
import VisualCountdown from "./VisualCountdown";


interface PageWakeUpWithAudioProps {
    alarmTime: Date;
    audioToggle: boolean;
    visualDisplay: boolean;
    chosenSong: any; 
    alarmSetAt: Date;
    currentTime: Date;
}

//play wake up song!
function PageWakeUpWithAudio({alarmTime, audioToggle, visualDisplay, chosenSong, alarmSetAt, currentTime}:PageWakeUpWithAudioProps) {

    // converts audio File to url for src in audio tag
    const blob = window.URL;
    const fileURL = blob.createObjectURL(chosenSong);

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
        <audio autoPlay controls > 
            <source src={fileURL} type="audio/mpeg"/>
            <source src={fileURL} type="audio/wav"/>
        </audio>
        {audioToggle ? <> <AudioBook/> <MusicPlay/> </> : null}
        {visualDisplay ? <VisualCountdown alarmTime={alarmTime} alarmSetAt={alarmSetAt} currentTime={currentTime}/> : null}
         {/* do not currently have a separate toggle for music and audio */}
        </main>
        
    </>
    );
}

export default PageWakeUpWithAudio;