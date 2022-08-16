import "./MusicPlay.css";
import React, {useRef} from 'react';

interface MusicPlayProps {
    songList: any;
}

const url = "https://traffic-light-clock-be.herokuapp.com"

const MusicPlay: Function = ({songList}:MusicPlayProps) => {

    let uploadedSongs = songList['songList'];
    console.log(uploadedSongs);
    let clickCount: number = 0;

    const audio = useRef<HTMLAudioElement>(null);
    const [songTrack, setSongTrack] = React.useState(0)
    const songName =  uploadedSongs[songTrack];
    const [playSong, setPlaySong] = React.useState(`${url}/alarmsong/${songName}`)

// toggle music on/off by clicking on music icon: 
    const toggleMusic = () => {
        console.log('inside toggle music');
        clickCount += 1;
        console.log(clickCount);
        loadSongs(songTrack);
        if (clickCount %2 === 0) {
            audio?.current?.pause();}
        else {
            audio?.current?.play();
            if (audio?.current) {
            audio.current.onended = (event) => loadSongs(songTrack+1); 
        }}
    }

    const loadSongs = (songTrack:any) => {
        setSongTrack(songTrack);       
        if (songTrack > uploadedSongs.length-1) {
            songTrack = 0;
            const songName =  uploadedSongs[songTrack];
            let dbURL = `${url}/alarmsong/${songName}`;
            if (audio?.current) {
            audio.current.src = dbURL;
            setPlaySong(dbURL);
            audio.current.play();}
        }
        else {
            const songName =  uploadedSongs[songTrack];
            let dbURL = `${url}/alarmsong/${songName}`;
            if (audio?.current) {
                audio.current.src = dbURL;
                setPlaySong(dbURL);
                audio.current.play();}
        }
    }


    return (
        <>
        <p onClick={(event) => toggleMusic()}>🎵</p>
        <p> Play music</p>
        <audio ref= {audio} id="playlist" > 
            <source src={playSong} type="audio/mpeg"/>
            <source src={playSong} type="audio/wav"/>
        </audio>
        </>
    )
  };

export default MusicPlay;