import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyD_QK46dNRRZMEEJbB1v8gsR-BH4di8cPQ",
    authDomain: "music-viz-340.firebaseapp.com",
    databaseURL: "https://music-viz-340.firebaseio.com",
    projectId: "music-viz-340",
    storageBucket: "music-viz-340.appspot.com",
    messagingSenderId: "499158324053",
    appId: "1:499158324053:web:5d83eab1d6e222957855dc",
    measurementId: "G-MLZ5GG8V0S"
  };
  const fire = firebase.initializeApp(firebaseConfig);
  export default fire;