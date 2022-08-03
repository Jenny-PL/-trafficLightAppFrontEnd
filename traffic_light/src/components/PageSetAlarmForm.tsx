import React from "react";
import CurrentTimeDisplay from "./CurrentTimeDisplay";
import "./PageSetAlarmForm.css";
import { useNavigate, Link }  from 'react-router-dom';
import SongFormPopUp from "./SongFormPopUp";
// import './App.css';

interface PageSetAlarmFormProps {
    chosenSong?: string;
    setAlarmTime: Function;
    setWakeUpToggle: Function;
    setAudioToggle: Function;
    setVisualDisplay: Function;
}

// Set Alarm Page
function PageSetAlarmForm({chosenSong, setAlarmTime, setWakeUpToggle, setAudioToggle, setVisualDisplay}: PageSetAlarmFormProps) {
    const navigate = useNavigate(); // this is for routing to a new link

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
            navigate('/alarm');
            }
      }
  
    return (
      <>
        <main className="formPage">
            <h1>Set up Alarm</h1>
            <form onSubmit={event => handleFormSubmission(event)}>
                <div id="setTime">
                    <CurrentTimeDisplay/>
                    <label htmlFor="alarm">Ok to wake time: 
  {/* BUG: how to access alarmTime here?? */}
                        <input type='time' id="alarm" name="alarm" onChange={event => onInputChange(event)} value={event.currentTarget.value}/>

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
