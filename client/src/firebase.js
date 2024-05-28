// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "foodi-ecom-fdc28.firebaseapp.com",
  projectId: "foodi-ecom-fdc28",
  storageBucket: "foodi-ecom-fdc28.appspot.com",
  messagingSenderId: "1008659820840",
  appId: "1:1008659820840:web:fe0ffacf05f9fece35601d",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
