import React from "react";
import "./Footer.css"
import { Link } from "react-router-dom";



function Footer() {
    let date = new Date();
    let year = date.getFullYear();
    return(
        <>
        <footer>
            <div style={{display: "flex", flexDirection: "row"}}>
                <img src={process.env.PUBLIC_URL + "./images/about.jpeg"} alt="" className="oswald-font" />
                <div style={{paddingTop: "0", paddingLeft: "1rem"}}>
                    <h3>About us</h3>
                    <p className="poppins-font" style={{fontSize: "0.8rem", textAlign: "left"}}>Welcome to our blog!Our mission is helping hobbyists create thriving aquatic environments.</p>
                </div>
            </div>
            <div>
                <h2 className="gabriela-font">Fish Blog</h2>
                <ul>
                    <li><Link to={"/"} className="gabriela-font">HOME</Link></li>
                    <li><Link to={"/posts"} className="gabriela-font">Posts</Link></li>
                    <li><Link to={"/about"} className="gabriela-font">About</Link></li>
                </ul>
            </div>
            <p>@Copyrights {year} Fish-blog</p>
        </footer>
        </>        
    );
}

export default Footer;