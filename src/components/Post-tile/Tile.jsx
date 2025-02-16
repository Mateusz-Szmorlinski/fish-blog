import React, { useState, useEffect } from "react";
import "./Tile.css";
import { NavLink } from "react-router-dom";
// import { useImage } from "../../Data/Images/Images";
import Loading from "../Loading/Loading";

function Tile(props) {
    // const { fetchImageURL } = useImage();
    // const [imageURL, setImageURL] = useState(null);

    // async function fetchImage(){
    //     try {
    //         const url = await fetchImageURL("/images/" + props.image);
    //         setImageURL(url);
    //     } catch (error) {
    //         console.error('Error fetching image URL:', error);
    //     }
    // };

    // useEffect(() => {
    //     fetchImage();
    // }, []);

    // console.log(imageURL);

    return (
        <div className="tile">
            <div className="image-wrapper">
                <NavLink to={"/posts/" + props.title}><img src={props.image}/></NavLink>
            </div>
            <div className="text-wrapper">
                <h3 className="gabriela-font"><NavLink to={"/posts/" + props.title}>{props.title}</NavLink></h3>
                <p className="poppins-font">{props.text}</p>
            </div>
            <button className="read-button gabriela-font"><NavLink to={"/posts/" + props.title}>read</NavLink></button>
        </div>
    );
}

export default Tile;