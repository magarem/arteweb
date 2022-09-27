// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD5DJ3iMKgZD0EOC01Qs-AzE9Vvwn9xiLU",
  authDomain: "receitas-5968d.firebaseapp.com",
  projectId: "receitas-5968d",
  storageBucket: "receitas-5968d.appspot.com",
  messagingSenderId: "40238569100",
  appId: "1:40238569100:web:1aed03605a177708dc4da9",
  measurementId: "G-Q1SY3V6NJ7"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
export const database = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
