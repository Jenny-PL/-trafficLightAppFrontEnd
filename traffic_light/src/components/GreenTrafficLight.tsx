import React from "react";
import "./GreenTrafficLight.css";

// interface GreenTrafficLightProps {
// }
// {person}:GreenTrafficLightProps

function GreenTrafficLight(): JSX.Element {
    
    return (
        <>
    <div className="container">
        <div className="trafficlight"></div>
            <div className="redlightG"></div>
            <div className="yellowlightG"></div>
            <div className="greenlightG"></div>
    </div>
    </>
)}

export default GreenTrafficLight;