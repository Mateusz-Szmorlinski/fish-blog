import React from "react";
import "./Footer.css"
import { NavLink } from "react-router-dom";



function Footer() {
    let date = new Date();
    let year = date.getFullYear();

    return(
        <>
        <footer>
            <div className="row">
                <div className="about-container mobile-container">
                    <img src={process.env.PUBLIC_URL + "/images/about.jpeg"} alt="" />
                    <div>
                        <h3 className="oswald-font">About us</h3>
                        <p className="poppins-font" style={{fontSize: "0.8rem", textAlign: "left"}}>Welcome to our blog! Our mission is helping hobbyists create thriving aquatic environments.</p>
                    </div>
                </div>
                <div className="nav-container mobile-container">
                    <h2 className="gabriela-font">Fish-Blog</h2>
                    <ul>
                        <li><NavLink to={"/"} className="gabriela-font">HOME</NavLink></li>
                        <li><NavLink to={"/posts"} className="gabriela-font">Posts</NavLink></li>
                        <li><NavLink to={"/about"} className="gabriela-font">About</NavLink></li>
                    </ul>
                </div>
            </div>
            <p>@Copyrights {year} Fish Blog</p>
        </footer>
        </>        
    );
}

export default Footer;