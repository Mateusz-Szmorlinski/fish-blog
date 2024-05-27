import React, { useEffect, useState } from "react";
import "./Post.css";
import { useParams } from "react-router-dom";
import { useImage } from "../../Data/Images/Images";
import { usePosts } from "../../Data/Posts/Posts";

function Post() {
    const { fetchImageURL } = useImage();
    const [image, setImage] = useState(null);
    const [postData, setPostData] = useState(null);
    const { postTitle } = useParams();
    const { error, loading, fetchOnePost } = usePosts();

    async function fetchPostData() {
        try {
            let data = await fetchOnePost("title", postTitle.replace(/%20/g, " "));
            setPostData(data);
        } catch (err) {
            console.error('Error fetching post:', err);
        }
    };

    async function fetchImage() {
        try {
            let url = await fetchImageURL("/images/" + postData.image);
            setImage(url);
        } catch (err) {
            console.error('Error fetching image URL:', err);
        }
    };

    useEffect(() => {
        fetchPostData();
    }, []);

    useEffect(() => {
        if (postData !== null) {
            fetchImage();
        }
    }, [postData]);

    return(
        <section id="post">
            {postData ? (<><h2>{postData.title}</h2>
            {image ? <img src={image} alt="Blog Post" /> : <p>Loading...</p>}
            <p>{postData.content}</p></>) : <p>Loading...</p>}
        </section>
    );
}

export default Post;