// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDsvPyTrSiPN7BAd4uUbqh6d6OWvlHrdHs",
  authDomain: "idisicipline.firebaseapp.com",
  databaseURL: "https://idisicipline-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "idisicipline",
  storageBucket: "idisicipline.firebasestorage.app",
  messagingSenderId: "229338411328",
  appId: "1:229338411328:web:e20bf673646e8e85260aa5",
  measurementId: "G-ENX42YL9RP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);