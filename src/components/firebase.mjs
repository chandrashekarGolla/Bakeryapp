import { initializeApp } from "firebase/app";
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

export const db = getFirestore(app);