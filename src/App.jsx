import React from "react";
import "./App.css";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Post from "./pages/Post/Post";
import Posts from "./pages/Posts/Posts";
import Login from "./pages/Login/Login.jsx";
import Register from "./pages/Register/Register.jsx";
import NotFound from "./pages/NotFound/NotFound.jsx";
import { Route, Routes } from "react-router-dom";
import { ImageProvider } from "./Data/Images/Images.jsx";
import { PostsProvider } from "./Data/Posts/Posts.jsx";
import { UserProvider } from "./Data/Users/Users.jsx";
import { PaymentsProvider } from "./Data/Payments/Payments.jsx";

function App() {
  return (
    <UserProvider>
      <PaymentsProvider>
        <PostsProvider>
          <ImageProvider>
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/posts/:postTitle" element={<Post />} />
              <Route path="/about" element={<About />} />
              <Route path="/posts" element={<Posts />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/*" element={<NotFound />} />
            </Routes>
            <Footer />
          </ImageProvider>
        </PostsProvider>
      </PaymentsProvider>
    </UserProvider>
  );
}

export default App;
