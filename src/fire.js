import firebase from 'firebase/app';
import 'firebase/database'; 
import 'firebase/storage'; 

var config = {
  apiKey: "AIzaSyCTV_fjnJDrAV5PNyUCH-NkYBH3IURPe2k",
  authDomain: "teste-vue-chat.firebaseapp.com",
  databaseURL: "https://teste-vue-chat.firebaseio.com",
  projectId: "teste-vue-chat",
  storageBucket: "teste-vue-chat.appspot.com",
  messagingSenderId: "220729280042",
};

var fire = firebase.initializeApp(config);
export default fire;
