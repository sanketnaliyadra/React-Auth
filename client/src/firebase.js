// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "react-auth-83398.firebaseapp.com",
  projectId: "react-auth-83398",
  storageBucket: "react-auth-83398.appspot.com",
  messagingSenderId: "990553801965",
  appId: "1:990553801965:web:15513d2c6588547f6cf8e4"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);