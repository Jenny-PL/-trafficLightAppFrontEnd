import React from "react";
import "./TrafficLight.css";

// interface TrafficLightProps {
// }
// {person}:TrafficLightProps

function TrafficLight(): JSX.Element {
    
    return (
    <>
    <div className="container">
        <div className="trafficlight"></div>
            <div className="redlight"></div>
            <div className="yellowlight"></div>
            <div className="greenlight"></div>
    </div>
    </>

)}

export default TrafficLight;