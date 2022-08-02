import React from "react";
import CurrentTimeDisplay from "./CurrentTimeDisplay";
import "./SetAlarmForm.css";
import { useNavigate, Link }  from 'react-router-dom';
// import './App.css';


// Set Alarm Page
function SetAlarmForm() {
    const navigate = useNavigate(); // this is for routing to a new link
  
    const [alarmTime, setAlarmTime] = React.useState<string>("00:00");
    const [wakeUpToggle, setWakeUpState] = React.useState<boolean>(true);
    const [audioToggle, setAudioState] = React.useState<boolean>(true);
    const [visualDisplay, setVisualDisplayState] = React.useState<boolean>(true);
  
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
    
    const onInputChange = (event: React.FormEvent<HTMLInputElement>) => {
      setAlarmTime(event.currentTarget.value);}
    const onWakeUpChange = (event: React.FormEvent<HTMLInputElement>) => {
      setWakeUpState(event.currentTarget.checked);}
    const onAudioChange = (event: React.FormEvent<HTMLInputElement>) => {
      setAudioState(event.currentTarget.checked);}
    const onVisualChange = (event: React.FormEvent<HTMLInputElement>) => {
        setVisualDisplayState(event.currentTarget.checked);}
  
    const handleFormSubmission = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      console.log("alarm time is:", alarmTime)
      // passing on state through params with navigate, react router
      navigate('/alarm', {state: { alarmTime: alarmTime,  wakeUpToggle: wakeUpToggle,
    audioToggle: audioToggle, visualDisplay: visualDisplay}}); 
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
                    {/* <input id="slideToggle" className="toggle-checkbox" type="checkbox" name="wakeToggle"defaultChecked onChange={onInputChange} checked={formData.wakeToggle}/> */}
                    <div className="toggle-switch"></div>
                    <span className="toggle-label">Wake-Up Song</span>
                </label>
                </div>

                <div id="audioMusicToggle">
                    <label className="toggle">
                    <input id="slideToggle" className="toggle-checkbox" type="checkbox" onChange={event => onAudioChange(event)} checked={audioToggle}/>
                    {/* <input id="slideToggle" className="toggle-checkbox" type="checkbox" name="audioToggle" defaultChecked onChange={onInputChange} checked={formData.audioToggle}/> */}
                    <div className="toggle-switch"></div>
                    <span className="toggle-label">Music and audiobooks available</span>
                    </label>
                </div>
  
                <div id="visualCountToggle">
                    <label className="toggle">
                    <input id="slideToggle" className="toggle-checkbox" type="checkbox" onChange={event => onVisualChange(event)} checked={visualDisplay}/>
                    {/* <input id="slideToggle" className="toggle-checkbox" type="checkbox" defaultChecked name="visualDisplay" onChange={onInputChange} checked={formData.visualDisplay}/> */}
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