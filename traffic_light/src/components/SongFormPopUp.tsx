import "./SongFormPopUp.css";
import axios from 'axios';
import SongListComponent from "./SongListComponent";

interface SongFormPopUpProps {
    setChosenSong: Function;
    chosenSong: string;
    togglePopup: Function;
    songList: any;
    setfileURL: Function;
}

const url = "https://traffic-light-clock-be.herokuapp.com"
  // MongoDB database: trafficlight; collection: wakeup
let songFile: any;

const config = { headers: {  
        'Content-Type':'multipart/form-data'
       }
    }

function SongFormPopUp({setChosenSong, chosenSong, togglePopup, songList, setfileURL}:SongFormPopUpProps): JSX.Element {

    const onInputChange = (event: React.FormEvent<HTMLInputElement>) => {
        event.preventDefault();
        songFile = event.currentTarget.files![0];
        setChosenSong(songFile);
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
                        onChange={onInputChange}></input>
                        {/* <input type='submit' onSubmit={onSubmit}></input> */}
                    </form>
                </label>
        <label>Or, choose a song:</label>
        {songList !== ['testOne', 'testTwo']? <SongListComponent songList={songList} setChosenSong={setChosenSong} setfileURL={setfileURL}/>: null}
        <button onClick={event => togglePopup(event)}>Submit</button>
        </div>
    </div>
)}

export default SongFormPopUp;
