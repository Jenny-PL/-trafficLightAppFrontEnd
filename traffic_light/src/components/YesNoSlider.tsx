import React from "react";
import "./YesNoSlider.css";

interface YesNoSliderProps {
    decision: string;
}

function YesNoSlider({decision}:YesNoSliderProps): JSX.Element {
    return (
        <>
        <label className="toggle">
        <input className="toggle-checkbox" type="checkbox" defaultChecked/>
        <div className="toggle-switch"></div>
        <span className="toggle-label">{decision}</span>
        </label>
        </>

)}

export default YesNoSlider;


// interface HomeButtonProps {
//     person: string;
// }
// function HomeButton({person}:HomeButtonProps): JSX.Element {
//     return (
//     <button>Home, {person}</button>
// )}
