import React from "react";
import "./App.css";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Post from "./pages/Post/Post";
import Posts from "./pages/Posts/Posts";
import NotFound from "./pages/NotFound/NotFound.jsx";
import Login from "./pages/Login/Login.jsx";
import Edit from "./pages/Edit/Edit.jsx";
import Admin from "./pages/Admin/Admin.jsx";
import { Route, Routes } from "react-router-dom";
import { ImageProvider } from "./Data/Images/Images.jsx";
import { PostsProvider } from "./Data/Posts/Posts.jsx";
import { UserProvider } from "./Data/Users/Users.jsx";
import { PaymentsProvider } from "./Data/Payments/Payments.jsx";
import { HelmetProvider } from "react-helmet-async";
import OnRouteChange from "./components/Scroll/OnRedirect.jsx";
import FloatingScroll from "./components/FloatScroll/FloatScroll.jsx";
import PrivateRoute from "./components/ProtectedRoutes/ProtectedRoutes.jsx";



function App() {
  return (
      <UserProvider>
        <PaymentsProvider>
          <PostsProvider>
            <ImageProvider>
              <HelmetProvider>
                <OnRouteChange />
                <FloatingScroll />
                <Header />
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/posts/:postTitle" element={<Post />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/posts" element={<Posts />} />
                  <Route path="/*" element={<NotFound />} />
                  <Route path="/login" element={<Login />} />
                  
                  {/* 🔐 Protected routes group */}
                  <Route path="/admin" element={<PrivateRoute />}>
                    <Route index element={<Admin />} />
                    <Route path="edit/:id" element={<Edit />} />
                  </Route>
                </Routes>
                <Footer />
              </HelmetProvider>
            </ImageProvider>
          </PostsProvider>
        </PaymentsProvider>
      </UserProvider>
  );
}

export default App;
