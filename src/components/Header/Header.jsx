import React, { useEffect, useState } from "react";
import "./Header.css";
import { NavLink } from "react-router-dom";
import { useUser } from "../../Data/Users/Users";
import { usePayments } from "../../Data/Payments/Payments";


function Header() {
    const { currentUser } = useUser();
    const [mobile, setMobile] = useState(false);
    const [visibility, setVisibility] = useState(false);

    function toggleVisibility() {
        setVisibility(!visibility);
    }

    useEffect(() => {
        function handleResize() {
            if (window.innerWidth <= window.innerHeight) {
                setMobile(true);
            } else if (window.innerWidth > window.innerHeight) {
                setMobile(false);
            }
        };

        if (window.innerWidth <= 800) {
            setMobile(true);
        } else if (window.innerWidth > 800) {
            setMobile(false);
        }

        window.addEventListener('resize', handleResize);
    }, []);

    return (
        <header>
            <h1><a className="gabriela-font" href="/">Fish Blog</a></h1>
            {mobile && 
                <div id="burger-nav" style={visibility ? {top: "0"} : {top: "-120svh"}}>
                    <ul>
                        <li><NavLink className="nav-link gabriela-font" onClick={toggleVisibility} to={"/"}>HOME</NavLink></li>
                        <li><NavLink className="nav-link gabriela-font" onClick={toggleVisibility} to={"/posts"}>Posts</NavLink></li>
                        <li><NavLink className="nav-link gabriela-font" onClick={toggleVisibility} to={"/about"}>About</NavLink></li>
                    </ul>
                    <button onClick={toggleVisibility}><img src={process.env.PUBLIC_URL + "./icons/X.svg"}/></button>
                </div>}
            <button id="burger-button" onClick={toggleVisibility}>
                <img src={process.env.PUBLIC_URL + "./icons/burger.svg"} />
            </button>
            <ul id="normal-nav">
                <li><NavLink className="nav-link gabriela-font" to={"/"}>HOME</NavLink></li>
                <li><NavLink className="nav-link gabriela-font" to={"/posts"}>Posts</NavLink></li>
                <li><NavLink className="nav-link gabriela-font" to={"/about"}>About</NavLink></li>
            </ul>
        </header>
    );
}

export default Header;