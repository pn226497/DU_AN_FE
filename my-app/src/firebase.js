import { initializeApp } from "firebase/app";
// import firebase from 'firebase/auth'
// import auth from 'firebase/auth'
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'

 

 

export const firebaseConfig = {
    apiKey: "AIzaSyBbnSfZwDo86dVgcey6S4O6dzyv-X8mATY",
    authDomain: "feproject-95326.firebaseapp.com",
    projectId: "feproject-95326",
    storageBucket: "feproject-95326.appspot.com",
    messagingSenderId: "915807370603",
    appId: "1:915807370603:web:0a8ce53ffc33542ffa602e"
  };

  const app = initializeApp(firebaseConfig);

  const db = getFirestore()
  

  const auth = getAuth();

  export {db, auth, app};