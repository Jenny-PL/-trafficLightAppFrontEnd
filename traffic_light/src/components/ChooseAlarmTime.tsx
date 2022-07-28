import React, {useState} from "react";
import "./ChooseAlarmTime.css";
import { useNavigate }  from 'react-router-dom';


// interface ChooseAlarmTimeProps {
//     passTimeToTrafficClock: Function;
// }
// {passTimeToTrafficClock}:ChooseAlarmTimeProps
// const defaultTime = "00:00";

function ChooseAlarmTime(): JSX.Element {
    // const [alarmTime, setAlarmTime] = useState(defaultTime);
    // const navigate = useNavigate();

// navigates to new page, upon submission
// On submit, want to render this route:  <Route path="alarm" element={<BasicAlarm /> } />
// needs to save the alarmTime state to be used in 'basic alarm' route

    // const handleFormSubmission = (event: React.FormEvent<HTMLFormElement>) => {
    //     event.preventDefault();
    //     passTimeToTrafficClock(alarmTime);
    //     navigate('/alarm', {state: { alarmTime: alarmTime }});  
//one way to pass on state is through navigating to the Link... how to access then?
    
    return (
        <div>
            <label htmlFor="alarm">Ok to wake time: </label>
            {/* <form onSubmit={event => handleFormSubmission(event)}> */}
            {/* <input type='time' id="alarm" name="alarm" onChange={event => onFormSubmit(event)} value={alarmTime}/> */}
            <input type='time' id="alarm" name="alarm"/>
            {/* <input type='submit' value='Set Alarm' /> */}
            {/* </form> */}
        </div>

)}

export default ChooseAlarmTime;