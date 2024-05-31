import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCnTo_z5GKkjba-hAyy2kxMNA0BxTVyPF4",
  authDomain: "beyond-app-80c16.firebaseapp.com",
  projectId: "beyond-app-80c16",
  storageBucket: "beyond-app-80c16.appspot.com",
  messagingSenderId: "379461529922",
  appId: "1:379461529922:web:7210a365f3ce7eddd258db",
  measurementId: "G-FSV1PFWNMF"
};

initializeApp(firebaseConfig);

export const db = getFirestore();
export const auth = getAuth();