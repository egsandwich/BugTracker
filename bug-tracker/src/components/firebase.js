import firebase from "firebase";
import "firebase/auth"

const base = firebase.initializeApp({
  apiKey: "AIzaSyAwpO3jAxS67_MCMRBQIdTMopk4rcegaJw",
  authDomain: "bug-tracker-egvl.firebaseapp.com",
  databaseURL: "https://bug-tracker-egvl.firebaseio.com",
  projectId: "bug-tracker-egvl",
  storageBucket: "bug-tracker-egvl.appspot.com",
  messagingSenderId: "853256968072",
  appId: "1:853256968072:web:0d6bf5c4a223f045fb8c3d",
  measurementId: "G-HDERQJSZTM",
});



export default base;