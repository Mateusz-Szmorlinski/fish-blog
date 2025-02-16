import React, { useEffect, useState } from "react";
import { useImage } from "../../Data/Images/Images";
import "./Hero.css";

function Hero({ posts }) {
    let main = posts[0];
    let otherImages = posts + posts + posts;
    const { fetchImageURL } = useImage();
    const [image, setImage] = useState(null);

    useEffect(() => {
        async function fetchImage() {
            try {
                const url = await fetchImageURL("/images/" + post.image);
                setImage(url);
            } catch (error) {
                console.error("Error fetching image URL:", error);
            }
        }

        fetchImage();
    }, [image, fetchImageURL]);

    return (
        <div id="hero">
            {/* Main image */}
            <div className="main-image-wrapper" onClick={() => exportImages(0)}>
                <img src={"./images/" + main.image} alt="Main" />
            </div>

            {/* tiles of other smaller images to show around main image */}
            {otherImages.map((image, index) => (
                <div
                    key={index}
                    className="image-wrapper"
                >
                    <img src={"./images/" + image.url} alt={`Image ${index + 1}`} />
                </div>
            ))}
        </div>
  );
}

export default Hero;
