// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from '@firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBtDoUzlSTY6zboYoCRHmCy-XMJwlzpItU",
  authDomain: "url-shortener-1a985.firebaseapp.com",
  projectId: "url-shortener-1a985",
  storageBucket: "url-shortener-1a985.appspot.com",
  messagingSenderId: "687924160195",
  appId: "1:687924160195:web:e6b2f946480d9f72552476",
  measurementId: "G-JE200Y56FX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// export const analytics = getAnalytics(app);
// export const db = getFirestore(app)
export const db = getFirestore(app)