import firebase from 'firebase/app';
import "firebase/database";
import "firebase/auth";


var firebaseConfig = {
  apiKey: 'AIzaSyA6M1LUaDM4KfOYMrRXic-f1hMw-dDXXtQ',
  authDomain: 'cards-526b5.firebaseapp.com',
  databaseURL: 'https://cards-526b5-default-rtdb.firebaseio.com',
  projectId: 'cards-526b5',
  storageBucket: 'cards-526b5.appspot.com',
  messagingSenderId: '34331710700',
  appId: '1:34331710700:web:5e43a909c137497dbe41c9',
};

firebase.initializeApp(firebaseConfig);

const database = firebase.database()

export const auth  = firebase.auth()

export default database;