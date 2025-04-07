// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database"

const firebaseConfig = {
  apiKey: "AIzaSyAOLNtNdLl9ayqSl8Fvo-6GJZrJAxER6dQ",
  authDomain: "genz-datingz.firebaseapp.com",
  projectId: "genz-datingz",
  storageBucket: "genz-datingz.firebasestorage.app",
  messagingSenderId: "854657143513",
  appId: "1:854657143513:web:fbada208b9fd4186dfe4c8",
  measurementId: "G-TPEW68MSD1"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const database = getDatabase(app);