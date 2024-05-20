import React from "react";
import "./Header.css";


function Header() {
    return(
        <header>
            <h1>brand</h1>
            <ul>
                <li><a href="#">navlink1</a></li>
                <li><a href="#">navlink2</a></li>
                <li><a href="#">navlink3</a></li>
            </ul>
        </header>
    );
}

export default Header;