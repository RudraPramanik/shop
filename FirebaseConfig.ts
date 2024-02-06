import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Initialize Firebase with your config
const firebaseConfig = {
    apiKey: "AIzaSyC20XCSrr8XvIcRmTu_T6AWGHho9_7XYi0",
    authDomain: "react-redux-app-3795e.firebaseapp.com",
    databaseURL: "https://react-redux-app-3795e.firebaseio.com",
    projectId: "react-redux-app-3795e",
    storageBucket: "react-redux-app-3795e.appspot.com",
    messagingSenderId: "896365132629",
    appId: "1:896365132629:web:48a9b501fa40fdad"
};

const app = initializeApp(firebaseConfig);

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);