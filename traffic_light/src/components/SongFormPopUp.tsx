import React, { MouseEventHandler } from 'react';
import "./SongFormPopUp.css";
import {useNavigate} from 'react-router-dom';
import {useEffect} from "react";

interface SongFormPopUpProps {
    // handleClose: MouseEventHandler<HTMLSpanElement>;
    // handleClose: Function;
    setChosenSong: Function;
    chosenSong: string;
    togglePopup: Function;
}

function SongFormPopUp({setChosenSong, chosenSong, togglePopup}:SongFormPopUpProps): JSX.Element {
    // const navigate = useNavigate(); // this is for routing to a new link

    const onInputChange = (event: React.FormEvent<HTMLInputElement>) => {
        event.preventDefault();
        setChosenSong(event.currentTarget.value);}

     // trigger on component mount
    //  useEffect(() => {
    //     const onInputChange = (event: React.FormEvent<HTMLInputElement>) => {
    //         setChosenSong(event.currentTarget.value);}
    //     },[]);    


//BUG: value is a string with file path --> need to instead upload, then convert to binary.
//Another BUG: When form is 'submitted', the PageSetAlarmForm component re-renders and alarmTime is lost


        // https://stackoverflow.com/questions/43013858/how-to-post-a-file-from-a-form-with-axios/66964246#66964246
        // https://developer.mozilla.org/en-US/docs/Web/API/FormData/Using_FormData_Objects
  
    return (
    <div className="popup-box">
        <div className="box">
            <div className="close-icon" onClick={event =>togglePopup(event)}>
                x
            </div>
                <label htmlFor="add-song">An a wake-up song (mp3 file):
                    <input type="file"
                        id="songInput" 
                        name="song"
                        accept="audio/mpeg" 
                        value={chosenSong} 
                        onChange={onInputChange}></input>
                </label>
{/* alternately, choose a song from a list of songs: (returned from DB, with pagination?!) */}
        <label>Or, choose a song:</label>
            {/* <label>Choose Song
                <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleFormInput}
            ></input>
            </label> */}
        <button onClick={event => togglePopup(event)}>close</button>
        </div>
    </div>
)}

export default SongFormPopUp;
