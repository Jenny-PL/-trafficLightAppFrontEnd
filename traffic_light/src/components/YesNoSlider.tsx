import React from "react";
import "./YesNoSlider.css";

// interface YesNoSliderProps {
// }

function YesNoSlider(): JSX.Element {
    return (
        <div>
        <label className="toggle">
        <input className="toggle-checkbox" type="checkbox" defaultChecked/>
        <div className="toggle-switch"></div>
        <span className="toggle-label">Choose Your Option</span>
        </label>
        </div>

)}

export default YesNoSlider;