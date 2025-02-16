import React, { useEffect, useState } from "react";
import "./Home.css";
import NewTile from "../../components/Post-tile/New-tile/New-tile";
import HotTile from "../../components/Post-tile/Hot-tile/Hot-tile";
import { usePosts } from "../../Data/Posts/Posts";
import Loading from "../../components/Loading/Loading";
import Hero from "../../components/Hero/Hero";
import ImageSlider from "../../components/Slider/Slider";
import Section from "../../components/Section/Section";
import section_1 from  "./content/section_1.json";
import section_2 from  "./content/section_2.json";
import section_3 from  "./content/section_3.json";

function Home() {
  const { error, loading, fetchNewPosts, fetchHotPosts } = usePosts();
  const [newPosts, setNewPosts] = useState([]);
  const [hotPosts, setHotPosts] = useState([]);
  const exampleText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam volutpat, nibh in dictum cursus, sapien ligula dapibus nisi, a laoreet erat ipsum nec lorem. Sed auctor dui nec urna pellentesque, ac tristique nisi efficitur. Integer ultricies convallis augue, sit amet dictum risus auctor ut. Phasellus eget consequat lorem, ac tincidunt arcu. Nam volutpat, purus ut dictum suscipit, sapien erat tincidunt odio, nec pharetra urna nulla at magna. Sed in sapien at lacus ullamcorper dictum. Suspendisse potenti. Vestibulum lacinia erat non dolor tincidunt, id dapibus arcu tincidunt. Cras at dictum libero."

  if (error) {
    console.log(error);
  }

  async function fetchData() {
    const controller = new AbortController(); // Create a new AbortController instance
    const timeoutId = setTimeout(() => controller.abort(), 10 * 1000); // Set a timeout to abort after 10 seconds
  
    try {
      let data = await fetchNewPosts({ signal: controller.signal }); // Pass the signal to the fetch request
      setNewPosts(data);
    } catch (error) {
      if (error.name === 'AbortError') {
        console.log('fetchNewPosts request was aborted.');
      } else {
        console.log(error);
      }
    }
  
    try {
      let data = await fetchHotPosts({ signal: controller.signal }); // Pass the signal to the fetch request
      setHotPosts(data);
    } catch (error) {
      if (error.name === 'AbortError') {
        console.log('fetchHotPosts request was aborted.');
      } else {
        console.log(error);
      }
    } finally {
      clearTimeout(timeoutId); // Clear the timeout
    }
  }



  useEffect(() => {
    fetchData();
    console.log(section_1)
  }, []);

  return (
    <section id="home">
      <section id="welcome">
        <h1 className="gabriela-font" style={{fontWeight: "400"}}>Everything you want to know before and after staring an aquarium</h1>
      </section>
      <section id="content">
        <section id="main">

          {newPosts && newPosts.length > 0 ? <Section slides={newPosts} title={"How to start aquarium?"} orientation={"left"} secondaryText={section_1.body} mainText={section_1.introduction} /> : <Loading />}
          
          <div id="latest">
            {newPosts && newPosts.length > 0 ? (
              newPosts.map((post, index) => {
                return (
                  <NewTile
                    key={index}
                    image={post.image}
                    title={post.title}
                    text={post.content.substring(0, 100) + "..."}
                  />
                );
              })
            ) : (
              <Loading />
            )}
          </div>

          {newPosts && newPosts.length > 0 ? <Section slides={newPosts} title={"How to choose best fish for your aquarium?"} secondaryText={section_2.body} mainText={section_2.introduction} /> : <Loading />}

          <div id="popular">
            {hotPosts && hotPosts.length > 0 ? (
              hotPosts.map((post, index) => {
                return (
                  <HotTile
                    key={index}
                    image={post.image}
                    title={post.title}
                    text={post.content.substring(0, 100) + "..."}
                  />
                );
              })
            ) : (
              <Loading />
            )}
          </div>

          {newPosts && newPosts.length > 0 ? <Section orientation={"left"} slides={newPosts} title={"How to keep & care for aquarium plants?"} secondaryText={section_3.body} mainText={section_3.introduction} /> : <Loading />}
        
        </section>
        <section id="sidebar-left">
        </section>
        <section id="sidebar-right">
        </section>
      </section>
    </section>
  );
}

export default Home;
