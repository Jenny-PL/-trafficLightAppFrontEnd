import React, { MouseEventHandler } from 'react';
import "./SongFormPopUp.css";
import {useNavigate} from 'react-router-dom';
import {useEffect} from "react";

interface SongFormPopUpProps {
    handleClose: MouseEventHandler<HTMLSpanElement>;
    setChosenSong: Function;
}

function SongFormPopUp({handleClose, setChosenSong}:SongFormPopUpProps): JSX.Element {
    const navigate = useNavigate(); // this is for routing to a new link

    const onInputChange = (event: React.FormEvent<HTMLInputElement>) => {
        setChosenSong(event.currentTarget.value);}

     // trigger on component mount
    //  useEffect(() => {
    //     const onInputChange = (event: React.FormEvent<HTMLInputElement>) => {
    //         setChosenSong(event.currentTarget.value);}
    //     },[]);    


//BUG: value is a string with file path --> need to instead upload, then convert to binary.
    const handleFormSubmission = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // need to pass on selected song as a param when navigate back to set alarm Form
        navigate('/set'); 
      }
    
    return (
    <div className="popup-box">
        <div className="box">
            {/* <span className="close-icon" onClick={event => handleClose(event)}> */}
            <span className="close-icon" onClick={handleClose}>
                x
            </span>
            <form onSubmit={event => handleFormSubmission(event)}>
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
            {/* <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleFormInput}
            ></input>
            <label>Owner</label> */}
        <input type="submit"></input>
        </form>

        </div>
    </div>
)}

export default SongFormPopUp;
