import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyA6man1wQmguOn2H2bi68g0-WUtT1t91oY",
    authDomain: "sui-nigeria.firebaseapp.com",
    projectId: "sui-nigeria",
    storageBucket: "sui-nigeria.appspot.com",
    messagingSenderId: "1234567890",
    appId: "1:1234567890:web:abcdef1234567890"
    
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app); 