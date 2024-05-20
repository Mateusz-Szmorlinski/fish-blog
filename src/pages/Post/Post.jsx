import React from "react";
import "./Post.css";
import { useParams } from "react-router-dom";
import data from "../../testData/testData.json";

function Post() {
    const { postTitle } = useParams();
    let postData = data.find(item => item.title === postTitle.replace(/%20/g, " "));

    return(
        <section id="post">
            <h2>{postData.title}</h2>
            <img src={process.env.PUBLIC_URL + "/images/" + postData.image} alt="" />
            <p>{postData.content}</p>
        </section>
    );
}

export default Post;