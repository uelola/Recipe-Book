// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCGpte6yZDqxOWTlNxLK_GSEMTnZr0wRuU",
  authDomain: "recipes-ef6d3.firebaseapp.com",
  databaseURL:
    "https://recipes-ef6d3-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "recipes-ef6d3",
  storageBucket: "recipes-ef6d3.firebasestorage.app",
  messagingSenderId: "690887611338",
  appId: "1:690887611338:web:d67953e58eed92dce0f533",
  measurementId: "G-CNJ2N1YEP0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
