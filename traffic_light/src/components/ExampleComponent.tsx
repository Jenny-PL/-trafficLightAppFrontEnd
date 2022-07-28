

// Note: plan to delete this component: Here as an example currently 
import React from "react";
import "./HomeButton.css";

interface HomeButtonProps {
    person: string;
}

function HomeButton({person}:HomeButtonProps): JSX.Element {
    return (
    <button>Home, {person}</button>
)}

export default HomeButton;

// function ComponentName({destructured props}: PropsInterace) {
// }

// alternate is to use an error function, as we've done before: 
// const HomeButton = () => {
//     return (
//     <button>Home</button>
// )}
