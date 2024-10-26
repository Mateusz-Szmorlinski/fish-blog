// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage, ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// Link to all libraries:
// https://firebase.google.com/docs/web/setup#available-libraries

// firebaseConfig: what is used in project
const firebaseConfig = {
  apiKey: "AIzaSyCvJIj5qyrWXF1qyCudp-YJhWcL0ODlZLk",
  authDomain: "fish-blog-abf39.firebaseapp.com",
  projectId: "fish-blog-abf39",
  storageBucket: "fish-blog-abf39.appspot.com",
  messagingSenderId: "282347077685",
  appId: "1:282347077685:web:de2a3c6e76553054a5717c",
  measurementId: "G-63RLERW18J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app);
const db = getFirestore(app);
const auth = getAuth(app);

export { storage, ref, getDownloadURL, uploadBytes, db, auth, app };