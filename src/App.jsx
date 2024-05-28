import React from "react";
import "./App.css";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Post from "./pages/Post/Post";
import Posts from "./pages/Posts/Posts";
import NotFound from "./pages/NotFound/NotFound.jsx";
import { Route, Routes } from "react-router-dom";
import { ImageProvider } from "./Data/Images/Images.jsx";
import { PostsProvider } from "./Data/Posts/Posts.jsx";



function App() {
    return (
        <PostsProvider>
            <ImageProvider>
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route
                        path="/posts/:postTitle"
                        element={<Post />}
                    />
                    <Route path="/about" element={<About />}/>
                    <Route path="/posts" element={<Posts />}/>
                    <Route path="/*" element={<NotFound />} />
                </Routes>
                <Footer />
            </ImageProvider>
        </PostsProvider>

    );
}

export default App;