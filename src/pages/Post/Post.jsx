import React, { useEffect, useState } from "react";
import "./Post.css";
import { useParams } from "react-router-dom";
import { usePosts } from "../../Data/Posts/Posts";
import NotFound from "../NotFound/NotFound";
import Loading from "../../components/Loading/Loading";
import ImageText from "../../components/PostsComponents/ImageText/ImageText";
import SEO from "../../components/SEO/SEO";


function Post({ inputData }) {
    const [postData, setPostData] = useState(null);
    const { postTitle } = useParams();
    const { fetchOnePost } = usePosts();

    const fetchPostData = async () => {
        try {
            const data = await fetchOnePost("title", postTitle.replace(/%20/g, " "));
            setPostData(data);
        } catch (err) {
            console.error("Error fetching post:", err);
        }
    };

    useEffect(() => {
        if (inputData && inputData.title) {
            setPostData(inputData);
        } else {
            fetchPostData();
        }
    }, [inputData]);

    if (postData !== null) {
        return (
            <article id="post">
                {postData.SEO && Array.isArray(postData.content) && <SEO title={postData.title} description={postData.SEO.description} keywords={postData.SEO.keywords}/>}
                {Array.isArray(postData.content) && <div id="main">
                    {postData && <h1 className="oswald-font">{postData.title}</h1>}
                    {postData.image ? <img src={postData.image} alt="Blog Post" /> : <Loading />}
                </div>}
                {Array.isArray(postData.content) ? postData.content.map((item, index) => {
                    switch (item.type) {
                        case "left":
                            return <ImageText key={index} orientation={"left"} text={item.text} image={item.ImageURL}/>;
                        case "right":
                            return <ImageText key={index} orientation={"right"} text={item.text} image={item.ImageURL}/>;
                        case "image":
                            return <img key={index} src={item.ImageURL} alt={item.imageAlt ? item.imageAlt : ""}/>;
                        case "text":
                            return <p key={index} className="poppins-font">{item.text}</p>;
                        default:
                            console.log("Paragraph doesn't have a type. Post id: " + postData.id);
                            return <p key={index} className="poppins-font">{item.text}</p>;
                    }
                }) : <NotFound />}
                
                {!postData && <Loading />}
            </article>
        );
    } else {
        return <NotFound />
    }

    
}

export default Post;