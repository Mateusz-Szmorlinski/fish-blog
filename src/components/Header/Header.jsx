import React, { useEffect, useState } from "react";
import "./Header.css";
import { NavLink } from "react-router-dom";


function Header() {
    const [mobile, setMobile] = useState(false);
    const [visibility, setVisibility] = useState(false);

    function toggleVisibility() {
        setVisibility(!visibility);
    }

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= window.innerHeight) {
                setMobile(true);
            } else if (window.innerWidth > window.innerHeight) {
                setMobile(false);
            }
        };

        if (window.innerWidth <= window.innerHeight) {
            setMobile(true);
        } else if (window.innerWidth > window.innerHeight) {
            setMobile(false);
        }

        window.addEventListener('resize', handleResize);
    }, []);

    return (
        <header>
            <h1><a href="/">Fish Blog</a></h1>
            {mobile && 
                <div id="burger-nav" style={visibility ? {top: "0"} : {top: "-120svh"}}>
                    <ul>
                        <li><NavLink className="nav-link" onClick={toggleVisibility} to={"/"}>HOME</NavLink></li>
                        <li><NavLink className="nav-link" onClick={toggleVisibility} to={"/posts"}>Posts</NavLink></li>
                        <li><NavLink className="nav-link" onClick={toggleVisibility} to={"/about"}>About</NavLink></li>
                    </ul>
                    <button onClick={toggleVisibility}><img src={process.env.PUBLIC_URL + "./icons/X.svg"}/></button>
                </div>}
            {mobile ?
                <button id="burger-button" onClick={toggleVisibility}>
                    <img src={process.env.PUBLIC_URL + "./icons/burger.svg"} />
                </button>
            :
                (
                    <ul>
                        <li><NavLink className="nav-link" to={"/"}>HOME</NavLink></li>
                        <li><NavLink className="nav-link" to={"/posts"}>Posts</NavLink></li>
                        <li><NavLink className="nav-link" to={"/about"}>About</NavLink></li>
                    </ul>
                )}

        </header>
    );
}

export default Header;