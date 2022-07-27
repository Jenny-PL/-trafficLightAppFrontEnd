import React from "react";
import "./HomeButton.css";

function HomeButton(props:{person:string}): JSX.Element {
    return (
    <button>Home, {props.person}</button>
)}

// alternate is to use an error function, as we've done before: 
// const HomeButton = () => {
//     return (
//     <button>Home</button>
// )}


export default HomeButton;