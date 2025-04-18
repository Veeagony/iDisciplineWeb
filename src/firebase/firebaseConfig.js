// firebase.js
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDsvPyTrSiPN7BAd4uUbqh6d6OWvlHrdHs",
  authDomain: "idisicipline.firebaseapp.com",
  databaseURL: "https://idisicipline-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "idisicipline",
  storageBucket: "idisicipline.appspot.com",
  messagingSenderId: "229338411328",
  appId: "1:229338411328:web:e20bf673646e8e85260aa5",
  measurementId: "G-ENX42YL9RP"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const auth = getAuth(app);
