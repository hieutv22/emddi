import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';


var firebaseConfig = {
    apiKey: "AIzaSyA526auZEMYIREU6CzZ8SFC9NoMq-nQi5I",
    authDomain: "bookcar-4d46e.firebaseapp.com",
    databaseURL: "https://bookcar-4d46e.firebaseio.com",
    projectId: "bookcar-4d46e",
    storageBucket: "bookcar-4d46e.appspot.com",
    messagingSenderId: "598061521729",
    appId: "1:598061521729:web:39d7fd7efe3db363"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.firestore().settings({ timestampsInSnapshots: true })

  export default firebase;