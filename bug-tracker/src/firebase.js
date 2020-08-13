import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyDwaFCk7qHxqTRgkqXFjUuEUxGGZlZGak4",
  authDomain: "bug-tracker-66524.firebaseapp.com",
  databaseURL: "https://bug-tracker-66524.firebaseio.com",
  projectId: "bug-tracker-66524",
  storageBucket: "bug-tracker-66524.appspot.com",
  messagingSenderId: "895563865199",
  appId: "1:895563865199:web:d199f5a4ec47118c42c19a",
  measurementId: "G-DKKZQQMK96",
});

const db = firebaseApp.firestore();

export default db;
