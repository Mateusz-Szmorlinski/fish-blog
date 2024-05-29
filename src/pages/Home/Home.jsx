import React, { useEffect, useState } from "react";
import "./Home.css";
import NewTile from "../../components/Post-tile/New-tile/New-tile";
import HotTile from "../../components/Post-tile/Hot-tile/Hot-tile";
import { usePosts } from "../../Data/Posts/Posts";
import Loading from "../../components/Loading/Loading";

function Home() {
    const { error, loading, fetchNewPosts, fetchHotPosts  } = usePosts();
    const [newPosts, setNewPosts] = useState([]);
    const [hotPosts, setHotPosts] = useState([]);

    if (error) {
        console.log(error);
    }

    async function fetchData() {
        let data = await fetchNewPosts();
        setNewPosts(data);
        data = await fetchHotPosts();
        setHotPosts(data);
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <section id="home">
            <div id="welcome">
                <h1>Welcome to fish blog</h1>
                <h2>This is blog about quarium hobby wich would help you start your own tank and many more</h2>
            </div>
            <img src={process.env.PUBLIC_URL + "/images/home.jpeg"} alt="image of beautiful planted aquarium" />
            <div id="latest">
                {newPosts && newPosts.length > 0 ? (newPosts.map((post, index) => {
                    return (
                        <NewTile
                            key={index}
                            image={post.image}
                            title={post.title}
                            text={post.content.substring(0, 100) + "..."}
                        />
                    );
                })) : <Loading />}
            </div>
            <div id="popular">
                {hotPosts && hotPosts.length > 0 ? (hotPosts.map((post, index) => {
                    return (
                        <HotTile
                            key={index}
                            image={post.image}
                            title={post.title}
                            text={post.content.substring(0, 100) + "..."}
                        />
                    );
                })) : <Loading />}
            </div>
        </section>
    );
}

export default Home;