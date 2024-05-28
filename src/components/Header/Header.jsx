import React from "react";
import "./Header.css";


function Header() {
    return(
        <header>
            <h1><a href="/">Fish Blog</a></h1>
            <ul>
                <li><a className="nav-link" href="/">HOME</a></li>
                <li><a className="nav-link" href="/posts">Posts</a></li>
                <li><a className="nav-link" href="/about">About</a></li>
            </ul>
        </header>
    );
}

export default Header;