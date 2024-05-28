import React from "react";
import "./Header.css";
import { NavLink } from "react-router-dom";


function Header() {
    return(
        <header>
            <h1><a href="/">Fish Blog</a></h1>
            <ul>
                
                <li><NavLink className="nav-link" href="/">HOME</NavLink></li>
                <li><NavLink className="nav-link" href="/posts">Posts</NavLink></li>
                <li><NavLink className="nav-link" href="/about">About</NavLink></li>
            </ul>
        </header>
    );
}

export default Header;