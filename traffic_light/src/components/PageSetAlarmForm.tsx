import React from "react";
import CurrentTimeDisplay from "./CurrentTimeDisplay";
import "./PageSetAlarmForm.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate, Link }  from 'react-router-dom';
import SongFormPopUp from "./SongFormPopUp";


interface PageSetAlarmFormProps {
    setAlarmTime: Function;
    setWakeUpToggle: Function;
    setAudioToggle: Function;
    setVisualDisplay: Function;
    alarmTime: Date;
    setChosenSong: Function;
    chosenSong: any; 
    songList: any;
    setfileURL: Function;
}

// Set Alarm Page
function PageSetAlarmForm({setAlarmTime, setWakeUpToggle, setAudioToggle, setVisualDisplay, setChosenSong, alarmTime, chosenSong, songList, setfileURL}: PageSetAlarmFormProps) {
    const navigate = useNavigate(); // this is for routing to a new link

    // pop-up to select song, toggle on/off:
    const [isOpen, setIsOpen] = React.useState<boolean>(false);

    const togglePopup = () => {
      setIsOpen(!isOpen);
    }
      
    const onInputChange = (event: React.FormEvent<HTMLInputElement>) => {
      console.log('here is what you set: ', new Date(event.currentTarget.value)); 
      setAlarmTime(new Date(event.currentTarget.value)); 
    }

    const onWakeUpChange = (event: React.FormEvent<HTMLInputElement>) => {
        event.preventDefault();
        console.log("wake up is checked on?", event.currentTarget.checked); //false at default, changes to true
        togglePopup(); // isOpen should change from false --> true and pop up file upload/song choice window
        setWakeUpToggle(event.currentTarget.checked); //true
    }
    const onAudioChange = (event: React.FormEvent<HTMLInputElement>) => {
      setAudioToggle(event.currentTarget.checked);}
    const onVisualChange = (event: React.FormEvent<HTMLInputElement>) => {
        setVisualDisplay(event.currentTarget.checked);}
  
    const handleFormSubmission = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      console.log("alarm time is:", alarmTime) // 2022-08-10T02:07 alarmTime is passed into the props soley for this consolelog
      console.log(typeof alarmTime)           // object
      navigate('/alarm');
      }
  
    return (
      <>
        <main>
          <h1 >Set up Alarm</h1>
            {isOpen ? <SongFormPopUp setfileURL={setfileURL} togglePopup={togglePopup} setChosenSong={setChosenSong} chosenSong={chosenSong} songList={songList}/> : null}
            <form className="formPage" onSubmit={event => handleFormSubmission(event)}>
              <div id="setTime">
                  <CurrentTimeDisplay/>
                  <label htmlFor="alarm">Ok to wake time: 
                      <input type='datetime-local' id="alarm" name="alarm" onChange={event => onInputChange(event)} />
                  </label>
              </div>

            <div id="toggleDiv">

               <div id="songToggle">
               <label className="toggle">
                    <input id="slideToggle" className="toggle-checkbox" type="checkbox" name="wakeupsong"  onChange={event => onWakeUpChange(event)} defaultChecked={false}/>
                    <div className="toggle-switch"></div>
                    <span className="toggle-label">Wake-Up Song                  </span>
                </label>
              </div>

             <div id="audioMusicToggle">
                <label className="toggle"> 
                    <input id="slideToggle" className="toggle-checkbox" type="checkbox" onChange={event => onAudioChange(event)} defaultChecked={false}/>
                    <div className="toggle-switch"></div>
                    <span className="toggle-label">Music and audiobooks available</span>
                  </label>
                </div>

                <div id="visualCountToggle">
                  <label className="toggle"> 
                    <input id="slideToggle" className="toggle-checkbox" type="checkbox" onChange={event => onVisualChange(event)} defaultChecked={false}/>
                    <div className="toggle-switch"></div>
                    <span className="toggle-label">Visual Countdown of time left </span>
                  </label>
                </div>
                </div>
              
              <div id="setAlarmButton">
                  <input type='submit' value='Set Alarm' />
              </div>
          </form>
        <nav>
          <Link to="/">Home</Link>
        </nav>
        </main>
      </>
    );
  }

export default PageSetAlarmForm;






// Attempted to DRY up code, but due to time constraints reverted to separate states on event functions

  // if you provide initial values for all objects, explicitly stating the type is not necessary.
    // const [formData, setFormData] = useState({
    //   alarmTime: "00:00",
    //   wakeToggle: true,
    //   audioToggle: true,
    //   visualDisplay: true })
  
    // const onInputChange = (event: React.FormEvent<HTMLInputElement>)  => {
    //   const inputElement = event.currentTarget as HTMLInputElement;
    //   const name = inputElement.name;
    //   let value:any;
    //   if (name === 'alarm') {
    //      value = inputElement.value;
    //   } else {
    //      value = inputElement.checked;
    //   }
    //    // make a new object that is copied from form object
    //    const newForm = { ...formData };
    //   newForm[name] = value;
    //   setFormData(newForm);
    //   };

{/* <input id="slideToggle" className="toggle-checkbox" type="checkbox" defaultChecked name="visualDisplay" onChange={onInputChange} checked={formData.visualDisplay}/> */}
