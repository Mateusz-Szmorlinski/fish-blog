import React, { useState, useEffect } from "react";
import "./Tile.css";
import { NavLink } from "react-router-dom";
import { useImage } from "../../Data/Images/Images";

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
                {image ? <img src={image} alt="Blog Post" /> : <p>Loading...</p>}
            </div>
            <h3>{props.title}</h3>
            <p>{props.text}</p>
            <NavLink to={"/posts/" + props.title}><button>read<img src="./icons/arrow.svg" /></button></NavLink>
        </div>
    );
}

export default Tile;