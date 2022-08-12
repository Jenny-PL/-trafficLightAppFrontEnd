import React, { MouseEventHandler } from 'react';
import "./SongFormPopUp.css";
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import {useEffect} from "react";

interface SongFormPopUpProps {
    // handleClose: MouseEventHandler<HTMLSpanElement>;
    // handleClose: Function;
    setChosenSong: Function;
    chosenSong: string;
    togglePopup: Function;
}

// interface uploadFileProps {
//     url: string;
//     file: File;
//     //change file to correct props type!
// }
// let songFileList : any;
const url = "http://127.0.0.1:5000" //change to heroku deployed url when able
  //database: trafficlight
  // collection: wakeup
let songFile: any;

const config = { headers: {  
        'Content-Type':'multipart/form-data'
       }
    }


function SongFormPopUp({setChosenSong, chosenSong, togglePopup}:SongFormPopUpProps): JSX.Element {
    // const navigate = useNavigate(); // this is for routing to a new link

    const onInputChange = (event: React.FormEvent<HTMLInputElement>) => {
        event.preventDefault();
        // setChosenSong(event.currentTarget.value);
        // songFileList = event.currentTarget.files;
        songFile = event.currentTarget.files![0];
        setChosenSong(songFile);
        console.log("here is the chosen file:", songFile);
        let songData = new FormData();
        songData.append('song-file', songFile);
        axios.post(`${url}/alarmsong`, songData, config)
        .then((response) => {
            //  config; //need to add headers to response somehow?
            console.log(chosenSong, 'Song sent to database', response.data);
            })
        .catch((error) => {
            console.log('Error with sending song to database', error.response.status);
            console.log('The data from response with an error:', error.response.data);
            });
    };
       

    // const onSubmit = (event: React.FormEvent<HTMLInputElement>) => {
    //     event.preventDefault();
    //     axios.post(`${url}/alarmsong`, chosenSong)
    //     .then((response) => {
    //         //  config; //need to add headers to response somehow?
    //         console.log(chosenSong, 'Song sent to database', response.data);
    //         })
    //     .catch((error) => {
    //         console.log('Error with sending song to database', error.response.status);
    //         console.log('The data from response with an error:', error.response.data);
    //         });
    // };

        // setChosenSong(songFile);

        // console.log(event.currentTarget.value);
        // console.log("here is the chosen song:", chosenSong);


        // const audioUrl = require("url:../sounds/track3.mp3");
        // let url = 
        // // let url = "addURLhere";
        // let file = new Audio(chosenSong);
        // // let file = event.target.files[0];
        // uploadFile(url,file);


 


    // trigger on component mount
    //  useEffect(() => {
    //     const onInputChange = (event: React.FormEvent<HTMLInputElement>) => {
    //         setChosenSong(event.currentTarget.value);}
    //     },[]);    


//BUG: value is a string with file path --> need to instead upload, then convert to binary.

        // https://stackoverflow.com/questions/43013858/how-to-post-a-file-from-a-form-with-axios/66964246#66964246
        // https://developer.mozilla.org/en-US/docs/Web/API/FormData/Using_FormData_Objects
  
    return (
    <div className="popup-box">
        <div className="box">
            <div className="close-icon" onClick={event =>togglePopup(event)}>
                x
            </div>
                <label htmlFor="add-song">An a wake-up song (wav file):
                <form>
                    <input type="file"
                        id="songInput" 
                        name="song"
                        accept="audio/*"
                        // accept="audio/mpeg" 
                        // value={chosenSong} 
                        onChange={onInputChange}></input>
                        {/* <input type='submit' onSubmit={onSubmit}></input> */}
                    </form>
                   
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
