import React, { useState, useEffect } from "react";
import "./Tile.css";
import { NavLink } from "react-router-dom";
import { useImage } from "../../Data/Images/Images";
import Loading from "../Loading/Loading";

function Tile(props) {
    const { fetchImageURL } = useImage();
    const [image, setImage] = useState(null);

    useEffect(() => {
        async function fetchImage(){
            try {
                const url = await fetchImageURL("/images/" + props.image);
                setImage(url);
            } catch (error) {
                console.error('Error fetching image URL:', error);
            }
        };

        fetchImage();
    }, [image, fetchImageURL]);

    return (
        <div className="tile">
            <div className="wrapper">
                {image ? <img src={image}/> : <Loading />}
            </div>
            <h3><NavLink to={"/posts/" + props.title}>{props.title}</NavLink></h3>
            <p>{props.text}</p>
            {/* <NavLink to={"/posts/" + props.title}><button>read<img src="./icons/arrow.svg" /></button></NavLink> */}
        </div>
    );
}

export default Tile;