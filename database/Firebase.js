import firebase from 'firebase';
import 'firebase/firestore';

//importacion de firebase y firestore

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyBBoztINarFm0Hjvw-P6-acwRXW1nO-g7M",
  authDomain: "react-native-firebase-f287a.firebaseapp.com",
  databaseURL: "https://react-native-firebase-f287a.firebaseio.com",
  projectId: "react-native-firebase-f287a",
  storageBucket: "react-native-firebase-f287a.appspot.com",
  messagingSenderId: "24807076604",
  appId: "1:24807076604:web:ff750a622e553692de5d79"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
//exportacion de firebase
export default {
    firebase,
    db,    
};