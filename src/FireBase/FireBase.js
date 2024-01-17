// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore , collection } from "firebase/firestore";
import { getAuth } from "firebase/auth";


// Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDxl8az9jQVds31HK86GR9dM6a6UsF9Pd8",
  authDomain: "task-management-system-6c67e.firebaseapp.com",
  projectId: "task-management-system-6c67e",
  storageBucket: "task-management-system-6c67e.appspot.com",
  messagingSenderId: "274869228243",
  appId: "1:274869228243:web:46cd4a1d604b0e41477a26"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth , collection };