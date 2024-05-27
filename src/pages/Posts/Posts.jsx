import React, { useEffect, useState } from "react";
import Tile from "../../components/Post-tile/Tile";
import { usePosts } from "../../Data/Posts/Posts";

function Posts() {
    const [postsData, setPostdData] = useState(null);
    const { error, loading, fetchPosts } = usePosts();

    async function fetchData() {
        data = await fetchPosts();
        setPostdData(data);
    }

    useEffect(() => {
        fetchData;
    }, []);

    return(
        <section id="posts">
            {postsData ? (postsData.map((post, index) => {
                return(<Tile
                    key={index}
                    title={post.title}
                    image={post.image}
                    text={post.content}
                />);
            })) : <p>Loading...</p>}
            {postsData && <button id="load">load more</button>}
        </section>
    );
}

export default Posts;