// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCVMTE4PR4_7x7KdAOcrJkQuZe3FhiaRUw",
  authDomain: "instagram-2-5d577.firebaseapp.com",
  projectId: "instagram-2-5d577",
  storageBucket: "instagram-2-5d577.appspot.com",
  messagingSenderId: "846558514738",
  appId: "1:846558514738:web:3ed3257342694137beb62b",
  measurementId: "G-BM7X2D06HR",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();
const auth = getAuth(app);

export { app, db, storage, auth };
