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
    chosenSong: File | null; //need to change this to audiofile? binary?
    alarmSetAt: Date;
    currentTime: Date;
}

//play wake up song!
function PageWakeUpWithAudio({alarmTime, audioToggle, visualDisplay, chosenSong, alarmSetAt, currentTime}:PageWakeUpWithAudioProps) {
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
        <audio controls autoPlay> 
            <source src={chosenSong} type="audio/mpeg"/>
        </audio>
        {audioToggle ? <> <AudioBook/> <MusicPlay/> </> : null}
        {visualDisplay ? <VisualCountdown alarmTime={alarmTime} alarmSetAt={alarmSetAt} currentTime={currentTime}/> : null}
         {/* do not currently have a separate toggle for music and audio */}
        </main>
        
    </>
    );
}

export default PageWakeUpWithAudio;