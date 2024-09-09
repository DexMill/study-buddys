import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";
import { getMessaging } from "firebase/messaging";

// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDE4CI4GnLxgCxJpO7z5czt2aNg0e1OPu4",
  authDomain: "gt-app-1f609.firebaseapp.com",
  projectId: "gt-app-1f609",
  storageBucket: "gt-app-1f609.appspot.com",
  messagingSenderId: "622751913884",
  appId: "1:622751913884:web:cf55559769bf1b19149a59",
  measurementId: "G-QRKCEMRMDD",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
