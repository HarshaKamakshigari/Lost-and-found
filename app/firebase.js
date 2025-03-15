// // "use client"; // Ensure it runs only on the client

// // import { initializeApp, getApps, getApp } from "firebase/app";
// // import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

// // const firebaseConfig = {
// //   apiKey: "AIzaSyD9AzTtQyYk5PmlhvOtm9JmG046CdGt-fk",
// //   authDomain: "lost-and-found-e85f9.firebaseapp.com",
// //   projectId: "lost-and-found-e85f9",
// //   storageBucket: "lost-and-found-e85f9.appspot.com",
// //   messagingSenderId: "400439673859",
// //   appId: "1:400439673859:web:4ea9edc49d17f237933a36",
// //   measurementId: "G-5DYW788NE6"
// // };

// // // Check if Firebase is already initialized to prevent errors
// // const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
// // const auth = getAuth(app);
// // const provider = new GoogleAuthProvider();

// // export { auth, provider, signInWithPopup, signOut };
// "use client"; // Ensure Firebase runs only on the client side

// import { initializeApp, getApps, getApp } from "firebase/app";
// import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";
// import { getStorage } from "firebase/storage";

// const firebaseConfig = {
//   apiKey: "AIzaSyD9AzTtQyYk5PmlhvOtm9JmG046CdGt-fk",
//   authDomain: "lost-and-found-e85f9.firebaseapp.com",
//   projectId: "lost-and-found-e85f9",
//   storageBucket: "lost-and-found-e85f9.appspot.com",
//   messagingSenderId: "400439673859",
//   appId: "1:400439673859:web:4ea9edc49d17f237933a36",
//   measurementId: "G-5DYW788NE6",
// };

// // Initialize Firebase only once
// const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
// const auth = getAuth(app);
// const db = getFirestore(app);
// const storage = getStorage(app);
// const provider = new GoogleAuthProvider();

// export { auth, provider, signInWithPopup, signOut, db, storage };
"use client";

import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase only once
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup, signOut, db, storage };
