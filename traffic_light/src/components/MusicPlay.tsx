import "./MusicPlay.css";
import React from 'react';

interface MusicPlayProps {
    setfileURL: Function;
    songList: any;
    fileURL: string;
}

const url = "https://traffic-light-clock-be.herokuapp.com"

const MusicPlay: Function = ({setfileURL, songList, fileURL}:MusicPlayProps) => {

    let uploadedSongs = songList['songList'];
    let count: number = 0;
    let songName =  uploadedSongs[count];
    const [playSong, setPlaySong] = React.useState(`${url}/alarmsong/${songName}`)


// BUG: This load doesn't seem to run!  How to get the onEnded function to run?
    const loadSongs = () => {
        count += 1;
        let audio = document.getElementById('playlist');
        audio?.setAttribute('autoPlay', ""); 
        if (count > uploadedSongs.length-1) {
            count = 0;
            let dbURL = `${url}/alarmsong/${songName}`;
            setPlaySong(dbURL);
        }
        else {
            let dbURL = `${url}/alarmsong/${songName}`;
            setPlaySong(dbURL);
        }
    }

    return (
        <>
        <p >🎵</p>
        <p> Play music</p>
        <audio id="playlist" onEnded={() => loadSongs()} controls > 
            <source src={playSong} type="audio/mpeg"/>
            <source src={playSong} type="audio/wav"/>
        </audio>
        </>
    )
  };

export default MusicPlay;