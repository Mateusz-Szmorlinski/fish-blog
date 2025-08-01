import React, { useEffect, useState } from "react";
import Tile from "../../components/Post-tile/Tile";
import { usePosts } from "../../Data/Posts/Posts";
import "./Posts.css";
import Loading from "../../components/Loading/Loading";
import SEO from "../../components/SEO/SEO";

function Posts() {
    const [item, setItem] = useState("");
    const [postsData, setPostdData] = useState(null);
    const [load, setLoad] = useState(false);
    const { error, loading, fetchPosts, fetchSearchPosts } = usePosts();

    async function fetchData() {
        let data = await fetchPosts();
        setPostdData(data);
        setLoad(true);
    }

    async function search(event) {
        event.preventDefault();
        setPostdData(null);
        setLoad(false);
        let data = await fetchSearchPosts("title", item)
        // create span to wrap searched phrase in title
        // if (data !== postsData) {
        //     let startIndex = data.title.toLowerCase().indexOf(value.toLowerCase());
        //     let endIndex = startIndex + value.length();
        //     data.forEach(element => {
        //         element.title = element.title.substring(0, startIndex) +
        //             <span>{element.title.substring(startIndex, endIndex)}</span> +
        //             element.title.substring(endIndex);
        //     });
        //     setPostdData(data);
        // }
        setPostdData(data);
        setItem("");
    }

    function handleChange(event) {
        const { value } = event.target;
        setItem(value);
    }

    useEffect(() => {
        fetchData();
    }, []);

    const description = "Explore a comprehensive collection of freshwater aquarium articles, expert guides, fish care tutorials, species profiles, and in-depth insights for aquarium enthusiasts of all levels."
    const keywords = "freshwater aquarium posts, fish care articles, aquarium guides, fish species information, tank maintenance tips, aquarium blog posts, fishkeeping tutorials, aquatic life articles, fish tank advice"

    return (
        <section id="posts">
            <SEO title="Search Fish-Blog Posts" description={description} keywords={keywords}/>
            <form id="search" onSubmit={search}>
                <input
                    type="text"
                    placeholder="Search post..."
                    onChange={handleChange}
                    value={item}
                />
                <button type="submit">
                    <img src={process.env.PUBLIC_URL + "./icons/search.svg"} alt="search icon" />
                </button>
            </form>
            <div id="content">
                {postsData ? (postsData.map((post, index) => {
                    return (<Tile
                        key={index}
                        title={post.title}
                        image={post.image}
                        // text={post.content.substring(0, 100) + "..."}
                    />);
                })) : <Loading />}
            </div>

            {/* {load && <button id="load">load more</button>} */}
        </section>
    );
}

export default Posts;