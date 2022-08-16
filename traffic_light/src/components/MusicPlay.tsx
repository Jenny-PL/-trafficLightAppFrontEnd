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
    console.log(uploadedSongs);
    let clickCount: number = 0;
    let audio: HTMLMediaElement = document.getElementById('playlist');

    const [songTrack, setSongTrack] = React.useState(0)
    let songName =  uploadedSongs[songTrack];
    const [playSong, setPlaySong] = React.useState(`${url}/alarmsong/${songName}`)


// toggle music on/off by clicking on music icon: 
    const toggleMusic = () => {
        console.log('inside toggle music');
        clickCount += 1;
        console.log(clickCount);
        loadSongs(songTrack);
        if (clickCount %2 === 0) {
            audio?.pause();}
        else {
            audio?.play();
            audio.onended = (event) => loadSongs(songTrack+1); //not happening!
        }
    }
// BUG: This load doesn't seem to run!  How to get the onEnded function to run?
    const loadSongs = (songTrack:any) => {
        // songTrack += 1;
        setSongTrack(songTrack);       
        if (songTrack > uploadedSongs.length-1) {
            songTrack = 0;
            let dbURL = `${url}/alarmsong/${songName}`;
            setPlaySong(dbURL);
        }
        else {
            let dbURL = `${url}/alarmsong/${songName}`;
            setPlaySong(dbURL);
        }
    }
    // const handleClick = () => {
    //     count += 1;
    //     let audioElement = new Audio(playSong);
    //     audioElement?.setAttribute('autoPlay', ""); 
    //     if (count > uploadedSongs.length-1) {
    //         count = 0;
    //         let dbURL = `${url}/alarmsong/${songName}`;
    //         setPlaySong(dbURL);
    //     }
    //     else {
    //         let dbURL = `${url}/alarmsong/${songName}`;
    //         setPlaySong(dbURL);
    //     }
    //     audioElement.play();
    // }

    return (
        <>

        <p onClick={(event) => toggleMusic()}>🎵</p>
        <p> Play music</p>
      
        <audio id="playlist" onEnded={(event) => loadSongs(songTrack+1)}> 
            <source src={playSong} type="audio/mpeg"/>
            <source src={playSong} type="audio/wav"/>
        </audio>


        {/* <div onClick={() =>audioElement.play()} >🎵</div> */}
        {/* <div onClick={(event) => handleClick()} >🎵</div> */}
        </>
    )
  };

export default MusicPlay;