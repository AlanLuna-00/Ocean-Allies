import React, { createContext } from "react";
import { getAuth } from "firebase/auth";

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCyYhmR2yWfS3DKMI4TOx48TM3zQNhyuZE",
  authDomain: "ocean-allies.firebaseapp.com",
  projectId: "ocean-allies",
  storageBucket: "ocean-allies.appspot.com",
  messagingSenderId: "886766737483",
  appId: "1:886766737483:web:62ab1cc55686dff22e55ce",
  measurementId: "G-B3BNN2M0DY",
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);

export const FirebaseContext = createContext({
  auth,
  firebaseApp,
});

export const FirebaseProvider = ({ children }) => {
  return (
    <FirebaseContext.Provider value={{ auth, firebaseApp }}>
      {children}
    </FirebaseContext.Provider>
  );
};
