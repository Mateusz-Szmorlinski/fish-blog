// src/contexts/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from "react";
import { auth, db } from "../../Firebase/firebase.js";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { doc, setDoc, updateDoc, getDoc } from "firebase/firestore";

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Register a new user with email and password
    async function register(email, password) {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            await setDoc(doc(db, "users", user.uid), {
                email: user.email,
                uid: user.uid,
                createdAt: new Date(),
                // Add any other fields you want to initialize here
            });
            setCurrentUser(user);
        } catch (err) {
            setError("Error registering user: " + err.message);
        }
    }

    // Log in an existing user with email and password
    async function login(email, password) {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            setCurrentUser(userCredential.user);
        } catch (err) {
            setError("Error logging in: " + err.message);
        }
    }

    // Log out the current user
    async function logout() {
        try {
            await signOut(auth);
            setCurrentUser(null);
        } catch (err) {
            setError("Error logging out: " + err.message);
        }
    }

    // Update a specific field in the user's document
    async function updateUserField(uid, field, value) {
        try {
            const userRef = doc(db, "users", uid);
            await updateDoc(userRef, { [field]: value });
        } catch (err) {
            setError("Error updating user field: " + err.message);
        }
    }

    // Read a specific field from the user's document
    async function getUserField(uid, field) {
        try {
            const userRef = doc(db, "users", uid);
            const docSnapshot = await getDoc(userRef);
            if (docSnapshot.exists()) {
                return docSnapshot.data()[field];
            } else {
                return null;
            }
        } catch (err) {
            setError("Error getting user field: " + err.message);
            return null;
        }
    }

    // Listen for authentication state changes
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setLoading(false);
        });
        return unsubscribe;
    }, []);

    return (
        <AuthContext.Provider value={{ currentUser, error, register, login, logout, updateUserField, getUserField }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
