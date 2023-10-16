import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyC9qIFanDxulpvATtKamTUo1DLLqRMLiFs",
  authDomain: "rodoappteste-79f4f.firebaseapp.com",
  databaseURL: "https://rodoappteste-79f4f-default-rtdb.firebaseio.com",
  projectId: "rodoappteste-79f4f",
  storageBucket: "rodoappteste-79f4f.appspot.com",
  messagingSenderId: "772581793689",
  appId: "1:772581793689:web:784d08388e2183593efd08",
  measurementId: "G-1WBK8PSK4M"
};
firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();