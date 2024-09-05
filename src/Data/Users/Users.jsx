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


    return (
        <AuthContext.Provider value={{ currentUser, error, register, login, logout, updateUserField, getUserField }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};