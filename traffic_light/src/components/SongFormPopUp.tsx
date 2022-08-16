import React, { MouseEventHandler } from 'react';
import "./SongFormPopUp.css";
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import {useEffect} from "react";
import SongListComponent from "./SongListComponent";

interface SongFormPopUpProps {
    // handleClose: MouseEventHandler<HTMLSpanElement>;
    // handleClose: Function;
    setChosenSong: Function;
    chosenSong: string;
    togglePopup: Function;
    songList: any;
    setfileURL: Function;
}

// interface uploadFileProps {
//     url: string;
//     file: File;
//     //change file to correct props type!
// }
// let songFileList : any;
// const url = "http://127.0.0.1:5000" //change to heroku deployed url when able
const url = "https://traffic-light-clock-be.herokuapp.com"
  //database: trafficlight
  // collection: wakeup
let songFile: any;

const config = { headers: {  
        'Content-Type':'multipart/form-data'
       }
    }


function SongFormPopUp({setChosenSong, chosenSong, togglePopup, songList, setfileURL}:SongFormPopUpProps): JSX.Element {
    // const navigate = useNavigate(); // this is for routing to a new link

    const onInputChange = (event: React.FormEvent<HTMLInputElement>) => {
        event.preventDefault();
        // setChosenSong(event.currentTarget.value);
        // songFileList = event.currentTarget.files;
        songFile = event.currentTarget.files![0];
        setChosenSong(songFile);
        // converts audio File to url for src in audio tag
        console.log("here is the chosen file:", songFile);
        let songData = new FormData();
       
        songData.append('song-file', songFile);
        axios.post(`${url}/alarmsong`,  songData, config)
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

    return (
    <div className="popup-box">
        <div className="box">
            <div className="close-icon" onClick={event =>togglePopup(event)}>
                x
            </div>
                <label htmlFor="add-song">Add a wake-up song (upload an audio file):
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
        {/* this is to make sure the songList is populated before rendering: */}
        {songList !== ['testOne', 'testTwo']? <SongListComponent songList={songList} setChosenSong={setChosenSong} setfileURL={setfileURL}/>: null}
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
