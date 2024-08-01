// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA9kGx1c-8CxnKqzKSxkOQ8B347FMvBvgY",
  authDomain: "yser-email-pass-auth.firebaseapp.com",
  projectId: "yser-email-pass-auth",
  storageBucket: "yser-email-pass-auth.appspot.com",
  messagingSenderId: "1076315464933",
  appId: "1:1076315464933:web:ee0198e7599e3a7054200c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;
