import React from "react";
import CurrentTimeDisplay from "./CurrentTimeDisplay";
import "./SetAlarmForm.css";
import { useNavigate, Link }  from 'react-router-dom';
import SongFormPopUp from "./SongFormPopUp";
// import './App.css';

interface SetAlarmFormProps {
    chosenSong?: string;
}

// Set Alarm Page
function SetAlarmForm({chosenSong}: SetAlarmFormProps) {
    const navigate = useNavigate(); // this is for routing to a new link
  
    const [alarmTime, setAlarmTime] = React.useState<string>("00:00");
    const [wakeUpToggle, setWakeUpToggle] = React.useState<boolean>(false);
    const [audioToggle, setAudioToggle] = React.useState<boolean>(false);
    const [visualDisplay, setVisualDisplay] = React.useState<boolean>(false);

    // pop-up to select song:
    const [isOpen, setIsOpen] = React.useState<boolean>(false);
    const togglePopup = () => {
      setIsOpen(!isOpen);
    };
      
    const onInputChange = (event: React.FormEvent<HTMLInputElement>) => {
      setAlarmTime(event.currentTarget.value);}
    const onWakeUpChange = (event: React.FormEvent<HTMLInputElement>) => {
        console.log("wake up is checked on?", event.currentTarget.checked);
        setWakeUpToggle(event.currentTarget.checked);
        togglePopup();
    }
    const onAudioChange = (event: React.FormEvent<HTMLInputElement>) => {
      setAudioToggle(event.currentTarget.checked);}
    const onVisualChange = (event: React.FormEvent<HTMLInputElement>) => {
        setVisualDisplay(event.currentTarget.checked);}
  
    const handleFormSubmission = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      console.log("alarm time is:", alarmTime)
      // passing on state through params with navigate, react router
        if (chosenSong !== "") {
        navigate('/alarm', {state: { alarmTime: alarmTime,  wakeUpToggle: wakeUpToggle,
            audioToggle: audioToggle, visualDisplay: visualDisplay, chosenSong: chosenSong}}); 
            }
        else {
            navigate('/alarm', {state: { alarmTime: alarmTime,  wakeUpToggle: wakeUpToggle,
                audioToggle: audioToggle, visualDisplay: visualDisplay}}); 
        }
      }

    // navigate('/alarm', {state: { alarmTime: formData.alarmTime,  wakeUpToggle: formData.wakeToggle,
    //   audioToggle: formData.audioToggle, visualDisplay: formData.visualDisplay}}); 
    
    return (
      <>
        <main className="formPage">
            <h1>Set up Alarm</h1>
            <form onSubmit={event => handleFormSubmission(event)}>
                    {/* each of these inputs should have its own onChange event, else a collective onChange event */}
                <div id="setTime">
                    <CurrentTimeDisplay/>
                    <label htmlFor="alarm">Ok to wake time: 
                        <input type='time' id="alarm" name="alarm" onChange={event => onInputChange(event)} value={alarmTime}/>
                        {/* <input type='time' id="alarm" name="alarmTime" onChange={onInputChange} value={formData.alarmTime}/> */}
                    </label>
                </div>
            
                <div id="songToggle">
                <label className="toggle">
                    <input id="slideToggle" className="toggle-checkbox" type="checkbox" name="wakeupsong"  onChange={event => onWakeUpChange(event)} checked={wakeUpToggle}/>
                    {isOpen && (<SongFormPopUp  handleClose={togglePopup}/>)}
                    <div className="toggle-switch"></div>
                    <span className="toggle-label">Wake-Up Song</span>
                </label>
                </div>

                <div id="audioMusicToggle">
                    <label className="toggle">
                    <input id="slideToggle" className="toggle-checkbox" type="checkbox" onChange={event => onAudioChange(event)} checked={audioToggle}/>
                    <div className="toggle-switch"></div>
                    <span className="toggle-label">Music and audiobooks available</span>
                    </label>
                </div>
  
                <div id="visualCountToggle">
                    <label className="toggle">
                    <input id="slideToggle" className="toggle-checkbox" type="checkbox" onChange={event => onVisualChange(event)} checked={visualDisplay}/>
                    <div className="toggle-switch"></div>
                    <span className="toggle-label">Visual Countdown of time left</span>
                    </label>
                </div>
  
                <div id="setAlarmButton">
                    <input type='submit' value='Set Alarm' />
                </div>
            </form>
        </main>
        <nav>
          <Link to="/">Home</Link>
        </nav>
      </>
    );
  }

export default SetAlarmForm;






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
