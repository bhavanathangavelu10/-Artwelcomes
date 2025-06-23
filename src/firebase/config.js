// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBqREZF0Lxg6Tc9Wz_SvFBrNMzxG5RO8aU",
  authDomain: "brush-and-bloom.firebaseapp.com",
  projectId: "brush-and-bloom",
  storageBucket: "brush-and-bloom.firebasestorage.app",
  messagingSenderId: "594358225238",
  appId: "1:594358225238:web:d20fc8680081f8ff2daef7",
  measurementId: "G-110Y6C74S3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);