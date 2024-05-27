// src/contexts/PostsContext.js
import React, { createContext, useContext, useState } from "react";
import { collection, getDocs, getDoc, limit, where, orderBy, query } from "firebase/firestore";
import { db } from "../../Firebase/firebase.js";

const PostsContext = createContext();

export const usePosts = () => {
    return useContext(PostsContext);
};

export const PostsProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    async function fetchPosts() {
        setLoading(true);
        try {
            const query = await getDocs(collection(db, "posts"), limit(10));
            const postsData = query.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setLoading(false);
            return postsData;
        } catch (err) {
            setError("Error fetching posts: " + err);
            setLoading(false);
        }
    };

    async function fetchNewPosts() {
        setLoading(true);
        try {
            const q = await getDocs(collection(db, "posts"), orderBy("timestamp", "desc"), limit(5));
            const postsData = q.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setLoading(false);
            return postsData;
        } catch (err) {
            setError("Error fetching posts: " + err);
            setLoading(false);
        }
    };

    async function fetchHotPosts() {
        setLoading(true);
        try {
            const q = await getDocs(collection(db, "posts"), limit(5));
            const postsData = q.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setLoading(false);
            return postsData;
        } catch (err) {
            setError("Error fetching posts: " + err);
            setLoading(false);
        }
    };

    async function fetchOnePost(field, value) {
        setLoading(true);
        try {
            let q = query(collection(db, "posts"), where(field, "==", value));
            let querySnapshot = await getDocs(q);
            
            if (querySnapshot.empty) {
                setLoading(false);
                return null;
            }
    
            let doc = querySnapshot.docs[0];
            let postData = { id: doc.id, ...doc.data() };
            
            setLoading(false);
            return postData;
        } catch (err) {
            setLoading(false);
            setError("Error fetching post: " + err.message);
            return null;
        }
    }

    return (
        <PostsContext.Provider value={{ error, loading, fetchOnePost, fetchPosts, fetchNewPosts, fetchHotPosts }}>
            {children}
        </PostsContext.Provider>
    );
};
