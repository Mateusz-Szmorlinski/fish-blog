import React from "react";
import "./About.css";

function About() {
    return(
        <section id="about">
            <h1 className="oswald-font">Aquarium Enthusiast Will Teach You What You Want To Know</h1>
            <p>Welcome to my blog! With over 10 years of experience in fish keeping, I have 
                cultivated a deep passion for this rewarding hobby. Over the years, I have honed my 
                skills in maintaining healthy and thriving aquariums, learning the intricacies of fish 
                care, tank maintenance, and species compatibility. My journey in fish keeping has been 
                driven by a genuine love for aquatic life and a commitment to creating the best possible 
                environments for my fish. Through this blog, I aim to share my extensive knowledge and help 
                fellow enthusiasts achieve success in their fish keeping endeavors.</p>
            <img src={process.env.PUBLIC_URL + "./images/about.jpeg"}/>
            <p>Beyond just caring for fish, I have a true passion for designing beautiful aquascapes. 
                Creating stunning, vibrant underwater landscapes has become an art form for me, blending 
                the natural beauty of aquatic plants with the grace and color of fish. On this blog, I will 
                share my techniques and tips for arranging captivating fish tanks that are both visually 
                appealing and conducive to the well-being of their inhabitants. Whether you're a beginner 
                or an experienced aquarist, my goal is to inspire and guide you in transforming your aquarium 
                into a breathtaking aquatic masterpiece.</p>
        </section>
    );
}

export default About;