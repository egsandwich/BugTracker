import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyAwpO3jAxS67_MCMRBQIdTMopk4rcegaJw",
  authDomain: "bug-tracker-egvl.firebaseapp.com",
  databaseURL: "https://bug-tracker-egvl.firebaseio.com",
  projectId: "bug-tracker-egvl",
  storageBucket: "bug-tracker-egvl.appspot.com",
  messagingSenderId: "853256968072",
  appId: "1:853256968072:web:0d6bf5c4a223f045fb8c3d",
  measurementId: "G-HDERQJSZTM",
});

const db = firebaseApp.firestore();

export default db;
