import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import "./FloatScroll.css";



function FloatingScroll() {
    const [isVisible, setIsVisible] = useState(false);
    const [isFooterVisible, setIsFooterVisible] = useState(false);

    function Scroll() {
        // Scroll to top smoothly
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    useEffect(() => {
        const toggleVisibility = () => {
            const footer = document.querySelector("footer"); // Select the footer element
            const scrollY = window.scrollY;
            const viewportHeight = window.innerHeight;
            const footerTop = footer?.getBoundingClientRect().top || 0;

            // Show button after scrolling 200px
            setIsVisible(scrollY > 200);
      
            // Hide button when footer is in view
            setIsFooterVisible(footerTop < viewportHeight);
        };

        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    return(
        createPortal((isVisible && !isFooterVisible && <div id="floating-scroll" onClick={Scroll}><img src={process.env.PUBLIC_URL + "/icons/scroll.svg"} alt="" /></div>), document.body)
    )
}

export default FloatingScroll;