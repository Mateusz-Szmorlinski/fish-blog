import React from "react";
import "./NotFound.css";
import { NavLink } from "react-router-dom";

function NotFound() {
    return(
        <section id="not-found">
            <h1 className="oswald-font">Page not found</h1>
            <NavLink to={"/"} className="gabriela-font">Go to home page</NavLink>
        </section>
    );
}

export default NotFound;