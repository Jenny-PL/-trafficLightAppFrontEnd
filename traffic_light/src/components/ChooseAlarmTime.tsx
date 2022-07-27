import React, {useState} from "react";
import "./ChooseAlarmTime.css";
import { useNavigate }  from 'react-router-dom';


// interface ChooseAlarmTimeProps {
//     onFormSubmit: Function;
// }
// {onFormSubmit}:ChooseAlarmTimeProps

const defaultTime = "00:00";

function ChooseAlarmTime(): JSX.Element {
    const [alarmTime, setAlarmTime] = useState(defaultTime);
    const navigate = useNavigate();


// changes alarm time state
    const onFormSubmit = (event: React.FormEvent<HTMLInputElement>) => {
        event.preventDefault();
        let newTime = event.currentTarget.value
        setAlarmTime(newTime);
    }
// navigates to new page, upon submission
// On submit, want to render this route:  <Route path="alarm" element={<BasicAlarm /> } />
    const handleFormSubmission = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        navigate('/alarm');
    }


    return (
        <div>
            <label htmlFor="alarm">Ok to wake time: </label>
            <form onSubmit={event => handleFormSubmission(event)}>
            <input type='time' id="alarm" name="alarm" onChange={event => onFormSubmit(event)} value={alarmTime}/>
            <input type='submit' value='Set Alarm'></input>
            </form>
        </div>

)}

export default ChooseAlarmTime;