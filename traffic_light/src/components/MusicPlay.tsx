import "./MusicPlay.css";
import useSound from "use-sound";

interface MusicPlayProps {
    playCommand: string;
    audio: string;
    onClick: Function
}

const MusicPlay: Function = ({playCommand,audio }:MusicPlayProps) => {
    // const [play] = useSound({audio});
  
    // return <button onClick={play}>{playCommand}</button>;
    return (
        <>
        <p>🎵</p>
        <p> Play music</p>
        </>
    )
  };

export default MusicPlay;