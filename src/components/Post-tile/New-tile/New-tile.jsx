import React from "react";
import Tile from "../Tile.jsx";
import "./New-tile.css";

function NewTile(props) {
    return (
        <div className="new-container">
            <span>NEW</span>
            <Tile
                image={props.image}
                title={props.title}
                text={props.text}
            />
        </div>
    );
}

export default NewTile;