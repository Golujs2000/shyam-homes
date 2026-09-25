// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDo-QCU2IDb6ysnD7wQ0Ioi-dy95aaLCAA",
  authDomain: "shyam-homes.firebaseapp.com",
  projectId: "shyam-homes",
  storageBucket: "shyam-homes.firebasestorage.app",
  messagingSenderId: "1085604974184",
  appId: "1:1085604974184:web:0c49b27bb88efb1dd475dd",
  measurementId: "G-557HF7YR4V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore
const db = getFirestore(app);

// Initialize Firebase Storage
const storage = getStorage(app);

// Initialize Analytics conditionally where supported
let analytics = null;
if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
      console.log("Firebase Analytics initialized for Shyam Homes");
    }
  }).catch((err) => {
    console.warn("Firebase Analytics not supported in this environment:", err);
  });
}

export { app, db, storage, analytics, firebaseConfig };
export default app;
