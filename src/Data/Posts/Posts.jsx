// src/contexts/PostsContext.js
import React, { createContext, useContext, useState } from "react";
import { collection, getDocs, getDoc, limit, where, orderBy, query, doc, setDoc, updateDoc, serverTimestamp, addDoc } from "firebase/firestore";
import { db } from "../../Firebase/firebase.js";

const PostsContext = createContext();

export const usePosts = () => {
    return useContext(PostsContext);
};

export const PostsProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    async function fetchPostsCount() {
        setLoading(true);
        try {
            const docRef = doc(db, "postsCount", "postsCount");
            const docSnap = await getDoc(docRef);
            setLoading(false);
            if (docSnap.exists()) {
                return { id: docSnap.id, ...docSnap.data() };
            } else {
                return null;
            }
        } catch (err) {
            setError("Error fetching posts count: " + err.message);
            setLoading(false);
            return null;
        }
    }


    async function fetchPosts() {
        setLoading(true);
        try {
            const q = await getDocs(query(collection(db, "posts"),where("status", "==", "published"), orderBy("date", "desc"), limit(10)));
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

    async function fetchSearchPosts(field, value) {
        setLoading(true);
        try {
            const q = await getDocs(collection(db, "posts"),where("status", "==", "published"));
            const postsData = q.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })).filter(post => post[field].toLowerCase().includes(value.toLowerCase()));
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
            const q = await getDocs(query(collection(db, "posts"),where("status", "==", "published"), orderBy("date", "desc"), limit(5)));
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
            const q = await getDocs(query(collection(db, "posts"),where("status", "==", "published"), limit(3)));
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

    async function fetchSectionPosts(sectionName) {
        setLoading(true);
        try {
            const q = await getDocs(query(collection(db, "posts"),where("status", "==", "published"), where("section", "==", sectionName), limit(5)));
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
            let q = query(collection(db, "posts"), where(field, "==", value),where("status", "==", "published"));
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

    async function createOrUpdatePost(ID, postData) {
        setLoading(true);
        try {
            if (ID !== null) {
                // Update existing post
                const postRef = doc(db, "posts", ID);
                await updateDoc(postRef, postData);
            } else {
                // Create new post
                let postRef = await addDoc(collection(db, "posts"), {
        	        ...postData,
                    status: "unpublished", // default status
        	        date: serverTimestamp(), // optional created date
                    lastUpdated: serverTimestamp() // optional last updated date
        	    });
        	    ID = postRef.id;
            }
            setLoading(false);
            return ID;
        } catch (err) {
            console.log("Error creating/updating post:", err);
            setError("Error creating/updating post: " + err.message);
            setLoading(false);
            return null;
        }
    };

	async function togglePostStatus(ID, newStatus) {
		setLoading(true);
		try {
            let postRef = doc(db, "posts", ID);
            console.log(postRef)
			await updateDoc(postRef, { "status": newStatus });
			setLoading(false);
			return true;
		} catch (err) {
			setError("Error toggling post status: " + err.message);
			setLoading(false);
			return false;
		}
	}

    return (
        <PostsContext.Provider value={{ error, loading, fetchOnePost, fetchPosts, fetchNewPosts, fetchHotPosts, fetchSearchPosts, fetchSectionPosts, fetchPostsCount, createOrUpdatePost, togglePostStatus}}>
            {children}
        </PostsContext.Provider>
    );
};
