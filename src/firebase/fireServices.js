// src/firebase/firebaseServices.js
import { getFirestore } from "firebase/firestore";
import { app } from "./firebaseConfig";

const db = getFirestore(app);

export { db };
