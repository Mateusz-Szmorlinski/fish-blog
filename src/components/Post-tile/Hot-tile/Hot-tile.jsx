import React from "react";
import Tile from "../Tile.jsx";
import "./Hot-tile.css";

function HotTile(props) {
    return (
        <div className="hot-container">
            <span>HOT</span>
            <Tile
                image={props.image}
                title={props.title}
                text={props.text}
            />
        </div>
    );
}

export default HotTile;