import React from "react";
import "./FancyStyle.css";


function FancyButton(props) {
    return(
        <button onClick={props.onClick ? props.onClick() : null}><span>{props.text ? props.text : "button"}</span><i></i></button>
    )
}

export default FancyButton;