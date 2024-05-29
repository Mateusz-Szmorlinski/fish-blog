import React, { useEffect, useState } from "react";
import "./Post.css";
import { useParams } from "react-router-dom";
import { useImage } from "../../Data/Images/Images";
import { usePosts } from "../../Data/Posts/Posts";
import NotFound from "../NotFound/NotFound";
import Loading from "../../components/Loading/Loading";

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

    if (postData !== null) {
        return (
            <section id="post">
                <div id="main">
                    {image ? <img src={image} alt="Blog Post" /> : <Loading />}
                    {postData && <h1>{postData.title}</h1>}
                </div>
                {postData && <p>{postData.content}</p>}
                {!postData && <Loading />}
            </section>
        );
    } else {
        return <NotFound />
    }

    
}

export default Post;