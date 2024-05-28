import React from "react";
import "./Header.css";
import { NavLink } from "react-router-dom";


function Header() {
    return(
        <header>
            <h1><a href="/">Fish Blog</a></h1>
            <ul>
                
                <li><NavLink className="nav-link" to={"/"}>HOME</NavLink></li>
                <li><NavLink className="nav-link" to={"/posts"}>Posts</NavLink></li>
                <li><NavLink className="nav-link" to={"/about"}>About</NavLink></li>
            </ul>
        </header>
    );
}

export default Header;