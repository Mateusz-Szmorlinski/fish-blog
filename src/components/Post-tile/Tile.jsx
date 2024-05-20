import React, { useState } from "react";
import "./Tile.css";
import { NavLink } from "react-router-dom";

function Tile(props) {
    const { fetchImageURL } = useImage();

    return (
        <div className="tile">
            <div className="wrapper">
                <img src={fetchImageURL("/images/" + props.image)} alt="" />
            </div>
            <h3>{props.title}</h3>
            <p>{props.text}</p>
            <NavLink to={"/posts/" + props.title}><button>read<img src="./icons/arrow.svg" /></button></NavLink>
        </div>
    );
}

export default Tile;