import React from "react";
import "./RedTrafficLight.css";

function RedTrafficLight(): JSX.Element {
    
    return (
        <>
    <div className="container">
        <div className="trafficlight"></div>
            <div className="redlightR"></div>
            <div className="yellowlightR"></div>
            <div className="greenlightR"></div>
    </div>
    </>
)}

export default RedTrafficLight;