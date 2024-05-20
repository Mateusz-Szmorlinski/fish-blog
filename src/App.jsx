import React from "react";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import "./App.css";
import Home from "./pages/Home/Home";
import Post from "./pages/Post/Post";
import { Route, Routes } from "react-router-dom";
import { ImageProvider } from "./Data/Images/Images.jsx";


function App() {
    return (
        <ImageProvider>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route
                    path="/posts/:postTitle"
                    element={<Post />}
                />
            </Routes>
            <Footer />
        </ImageProvider>

    );
}

export default App;