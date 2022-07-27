import React, {useState} from "react";
import "./ChooseAlarmTime.css";
import { Navigate }  from 'react-router-dom';


// interface ChooseAlarmTimeProps {
//     onFormSubmit: Function;
// }
// {onFormSubmit}:ChooseAlarmTimeProps

const defaultTime = "00:00";

// On submit, want to render this route:  <Route path="alarm" element={<BasicAlarm /> } />
function ChooseAlarmTime(): JSX.Element {
    const [alarmTime, setAlarmTime] = useState(defaultTime);

    const onFormSubmit = (event: React.FormEvent<HTMLInputElement>) => {
        event.preventDefault();
        let newTime = event.currentTarget.value
        setAlarmTime(newTime);
        return <Navigate  to='/alarm' />
    }

    return (
        <div>
            <label htmlFor="alarm">Ok to wake time: </label>
            <input type='time' id="alarm" name="alarm" onChange={event => onFormSubmit(event)} value={alarmTime}/>
        </div>

)}

export default ChooseAlarmTime;