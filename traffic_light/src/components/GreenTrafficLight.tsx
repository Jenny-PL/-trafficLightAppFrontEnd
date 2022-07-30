import React from "react";
import "./GreenTrafficLight.css";

// interface GreenTrafficLightProps {
// }
// {person}:GreenTrafficLightProps

function GreenTrafficLight(): JSX.Element {
    
    return (
        <>
    <div className="container">
        <div className="GreenTrafficLight"></div>
            <div className="redlight"></div>
            <div className="yellowlight"></div>
            <div className="greenlight"></div>
    </div>
    </>
)}

export default GreenTrafficLight;