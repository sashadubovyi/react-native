// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDFVu8i6hgWQHthe913dS6b4xg6wkyfmXM",
  authDomain: "react-native-app-4a4e1.firebaseapp.com",
  projectId: "react-native-app-4a4e1",
  storageBucket: "react-native-app-4a4e1.appspot.com",
  messagingSenderId: "365875239756",
  appId: "1:365875239756:web:03cdaa8d48cfa36993cde9",
  measurementId: "G-BSRT30KJLV",
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_DB = getAuth(FIREBASE_APP);
