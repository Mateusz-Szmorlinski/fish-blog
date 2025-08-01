import React, { useEffect, useState } from "react";
import "./Home.css";
import NewTile from "../../components/Post-tile/New-tile/New-tile";
import HotTile from "../../components/Post-tile/Hot-tile/Hot-tile";
import { usePosts } from "../../Data/Posts/Posts";
import Loading from "../../components/Loading/Loading";
import Section from "../../components/Section/Section";
import section_1 from  "./content/section_1.json";
import section_2 from  "./content/section_2.json";
import section_3 from  "./content/section_3.json";
import SEO from "../../components/SEO/SEO";

function Home() {
  const { error, loading, fetchNewPosts, fetchHotPosts, fetchSectionPosts } = usePosts();
  const [newPosts, setNewPosts] = useState([]);
  const [hotPosts, setHotPosts] = useState([]);

  const [howToStartPosts, setHowToStartPosts] = useState([]);
  const [howToChoosePosts, setHowToChoosePosts] = useState([]);
  const [howToCarePosts, setHowToCarePosts] = useState([]);
  const exampleText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam volutpat, nibh in dictum cursus, sapien ligula dapibus nisi, a laoreet erat ipsum nec lorem. Sed auctor dui nec urna pellentesque, ac tristique nisi efficitur. Integer ultricies convallis augue, sit amet dictum risus auctor ut. Phasellus eget consequat lorem, ac tincidunt arcu. Nam volutpat, purus ut dictum suscipit, sapien erat tincidunt odio, nec pharetra urna nulla at magna. Sed in sapien at lacus ullamcorper dictum. Suspendisse potenti. Vestibulum lacinia erat non dolor tincidunt, id dapibus arcu tincidunt. Cras at dictum libero."

  if (error) {
    console.log(error);
  }

  // async function fetchData() {
  //   const controller = new AbortController(); // Create a new AbortController instance
  //   const timeoutId = setTimeout(() => controller.abort(), 10 * 1000); // Set a timeout to abort after 10 seconds
  
  //   try {
  //     let data = await fetchNewPosts({ signal: controller.signal }); // Pass the signal to the fetch request
  //     setNewPosts(data);
  //   } catch (error) {
  //     if (error.name === 'AbortError') {
  //       console.log('fetchNewPosts request was aborted.');
  //     } else {
  //       console.log(error);
  //     }
  //   } finally {
  //     clearTimeout(timeoutId); // Clear the timeout
  //   }

  //   try {
  //     let data = await fetchSectionPosts("How to start",{ signal: controller.signal }); // Pass the signal to the fetch request
  //     setHowToStartPosts(data);
  //   } catch (error) {
  //     if (error.name === 'AbortError') {
  //       console.log('fetchNewPosts request was aborted.');
  //     } else {
  //       console.log(error);
  //     }
  //   } finally {
  //     clearTimeout(timeoutId); // Clear the timeout
  //   }
  
  //   try {
  //     let data = await fetchHotPosts({ signal: controller.signal }); // Pass the signal to the fetch request
  //     setHotPosts(data);
  //   } catch (error) {
  //     if (error.name === 'AbortError') {
  //       console.log('fetchHotPosts request was aborted.');
  //     } else {
  //       console.log(error);
  //     }
  //   } finally {
  //     clearTimeout(timeoutId); // Clear the timeout
  //   }
  // }

  async function fetchData() {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10 * 1000);

    const fetchWithHandling = async (fetchFunc, args, setter, label) => {
      try {
        const data = await fetchFunc(...args, { signal: controller.signal });
        setter(data);
      } catch (error) {
        if (error.name === 'AbortError') {
        } else {
          console.error(`${label} error:`, error);
        }
      }
    };

    await fetchWithHandling(fetchNewPosts, [], setNewPosts, 'fetchNewPosts');
    await fetchWithHandling(fetchSectionPosts, ["How to start"], setHowToStartPosts, 'fetchSectionPosts');
    await fetchWithHandling(fetchSectionPosts, ["How to choose fish"], setHowToChoosePosts, 'fetchSectionPosts');
    await fetchWithHandling(fetchSectionPosts, ["How to care for plants"], setHowToCarePosts, 'fetchSectionPosts');
    await fetchWithHandling(fetchHotPosts, [], setHotPosts, 'fetchHotPosts');

    clearTimeout(timeoutId);
  }

  useEffect(() => {
    fetchData();
  }, []);

  const description = "Comprehensive guide to freshwater aquarium keeping for hobbyists of all levels. Explore expert tips, fish care advice, tank setup guides, and in-depth insights into freshwater aquarium maintenance and fish species."
  const keywords = "freshwater aquarium, fish keeping, aquarium care, tropical fish, aquarium maintenance, fish tank setup, aquarium hobby, fish species, beginner aquarium tips, advanced aquarium techniques"

  return (
    <section id="home">
      <SEO title="Fish BLog" description={description} keywords={keywords}/>
      <section id="welcome">
        <h1 className="gabriela-font" style={{fontWeight: "400"}}>Everything you want to know before and after starting an aquarium</h1>
      </section>
      <section id="content">
        <section id="main">

          {newPosts && newPosts.length > 0 ? <Section slides={howToStartPosts} title={"How to start aquarium?"} orientation={"left"} secondaryText={section_1.body} mainText={section_1.introduction} /> : <Loading />}
          
          <div id="latest">
            {newPosts && newPosts.length > 0 ? (
              newPosts.map((post, index) => {
                return (
                  <NewTile
                    key={index}
                    image={post.image}
                    title={post.title}
                  />
                );
              })
            ) : (
              <Loading />
            )}
          </div>

          {newPosts && newPosts.length > 0 ? <Section slides={howToChoosePosts} title={"How to choose best fish for your aquarium?"} secondaryText={section_2.body} mainText={section_2.introduction} /> : <Loading />}

          <div id="popular">
            {hotPosts && hotPosts.length > 0 ? (
              hotPosts.map((post, index) => {
                return (
                  <HotTile
                    key={index}
                    image={post.image}
                    title={post.title}
                  />
                );
              })
            ) : (
              <Loading />
            )}
          </div>

          {newPosts && newPosts.length > 0 ? <Section orientation={"left"} slides={howToCarePosts} title={"How to keep & care for aquarium plants?"} secondaryText={section_3.body} mainText={section_3.introduction} /> : <Loading />}
        
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
