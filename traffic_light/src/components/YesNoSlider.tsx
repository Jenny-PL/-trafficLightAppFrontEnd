import React from "react";
import "./YesNoSlider.css";

interface YesNoSliderProps {
    decision: string;
}

//capture info about whether slider is on yes or no, and lift that state up!
function YesNoSlider({decision}:YesNoSliderProps): JSX.Element {

    // const slider = document.getElementById('slideToggle')
    // if (slider.value) {
    //     return True;
    // }

    return (
        <>
        <label className="toggle">
        <input id="slideToggle" className="toggle-checkbox" type="checkbox" defaultChecked/>
    {/* only currenlty checked checkbox input is submitted to server. when input value not specified, it is 'on' by default. */}
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
