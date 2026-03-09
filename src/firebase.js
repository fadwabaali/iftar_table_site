// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCXXoCL9leF18ojsWtoGor0uqHn2-0feIg",
  authDomain: "iftar-8ef77.firebaseapp.com",
  projectId: "iftar-8ef77",
  storageBucket: "iftar-8ef77.firebasestorage.app",
  messagingSenderId: "849159639861",
  appId: "1:849159639861:web:1d1ba5f408a71ace26327c",
  measurementId: "G-F10YLJ8YV6"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);