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
            <div className="image-wrapper">
                {image ? <NavLink to={"/posts/" + props.title}><img src={image}/></NavLink>: <Loading />}
            </div>
            <div className="text-wrapper">
                <h3><NavLink to={"/posts/" + props.title}>{props.title}</NavLink></h3>
                {/* <p>{props.text}</p> */}
            </div>
            {/* <NavLink to={"/posts/" + props.title}><button>read<img src="./icons/arrow.svg" /></button></NavLink> */}
        </div>
    );
}

export default Tile;