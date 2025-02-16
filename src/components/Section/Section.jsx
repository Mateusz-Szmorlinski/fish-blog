import React from "react";
import "./Section.css";
import ImageSlider from "../Slider/Slider";



function Section({ slides, title, mainText, secondaryText, orientation, style }) {
    let side = orientation;
    if (orientation != "left") {
        side = "right";
    }

    return(
        <section style={style || {}} className="slider-section">
            <div className={"slider-text " + side}>
                <h2 className="title oswald-font">{title}</h2>
                <p className="main-text poppins-font">{mainText}</p>
            </div>
            <ImageSlider slides={slides} className={"slider " + side}/>
            <div className="text-wrapper secondary-text">
                {secondaryText != undefined && secondaryText.map((paragraph, index) => {
                    return <p key={index} className="poppins-font">{paragraph}</p>;
                })}
            </div> 
        </section>
    );
}

export default Section;