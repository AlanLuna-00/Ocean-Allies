// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCyYhmR2yWfS3DKMI4TOx48TM3zQNhyuZE",
  authDomain: "ocean-allies.firebaseapp.com",
  projectId: "ocean-allies",
  storageBucket: "ocean-allies.appspot.com",
  messagingSenderId: "886766737483",
  appId: "1:886766737483:web:62ab1cc55686dff22e55ce",
  measurementId: "G-B3BNN2M0DY",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
