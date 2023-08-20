/* import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAFeRvX6v_oYegzd9z22gyPNspv4zoLJKM",
  authDomain: "sudhasbakers-9ef6d.firebaseapp.com",
  projectId: "sudhasbakers-9ef6d",
  storageBucket: "sudhasbakers-9ef6d.appspot.com",
  messagingSenderId: "208193629440",
  appId: "1:208193629440:web:bf347156a1f1bdfaca97e5"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app); */
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB0h_lWOpVCvQKwkFQZpLcD0Y-zku1MjOU",
  authDomain: "sudhas-bakers.firebaseapp.com",
  projectId: "sudhas-bakers",
  storageBucket: "sudhas-bakers.appspot.com",
  messagingSenderId: "765022343073",
  appId: "1:765022343073:web:09c382c41ba8950c9685e0",
  measurementId: "G-C7BMWKH1TJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const analytics = getAnalytics(app);