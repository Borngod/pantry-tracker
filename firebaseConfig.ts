import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getFirestore,
  collection,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAFqJwJL6ndSnIEci4RiihZD_yKstEk0G8",
  authDomain: "be-pantry-app.firebaseapp.com",
  projectId: "be-pantry-app",
  storageBucket: "be-pantry-app.appspot.com",
  messagingSenderId: "688154730326",
  appId: "1:688154730326:web:c67751756611b4b22100f7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const fireStore = getFirestore(app);

export { app, fireStore };
