import firebase from 'firebase';
import 'firebase/firestore';

//importacion de firebase y firestore

// Your web app's Firebase configuration
var firebaseConfig = {
  //non info
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
//exportacion de firebase
export default {
    firebase,
    db,    
};