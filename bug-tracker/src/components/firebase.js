// import * as firebase from 'firebase'
// import app from 'firebase/app'
// import 'firebase/auth'
// import 'firebase/firestore'

// import { firebase } from '@firebase/app';
// import '@firebase/firestore'
// import '@firebase/auth';

import firebase from 'firebase'
import 'firebase/firestore'
import 'firebase/auth'


const config = {
  apiKey: "AIzaSyAwpO3jAxS67_MCMRBQIdTMopk4rcegaJw",
  authDomain: "bug-tracker-egvl.firebaseapp.com",
  databaseURL: "https://bug-tracker-egvl.firebaseio.com",
  projectId: "bug-tracker-egvl",
  storageBucket: "bug-tracker-egvl.appspot.com",
  messagingSenderId: "853256968072",
  appId: "1:853256968072:web:0d6bf5c4a223f045fb8c3d",
  measurementId: "G-HDERQJSZTM",
}
class Firebase {
  constructor() {
    firebase.initializeApp(config)
    this.auth = firebase.auth()
    this.db = firebase.firestore();

  }
  login(email, password) {
    return this.auth.signInWithEmailAndPassword(email, password)
  }

  logout() {
    return this.auth.signOut()
  }

  async register(name, email, password) {
    await this.auth.createUserWithEmailAndPassword(email, password)
    return this.auth.currentUser.updateProfile({
      displayName: name
    })
  }
  isInitialized() {
    return new Promise(resolve => {
      this.auth.onAuthStateChanged(resolve)
    })
  }

  getCurrentUsername() {
    return this.auth.currentUser && this.auth.currentUser.displayName
  }
}

// const db = firebaseApp.firestore();

export default new Firebase();
