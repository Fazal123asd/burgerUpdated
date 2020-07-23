import firebase from 'firebase'

var firebaseConfig = {
    apiKey: "AIzaSyAhHzVH353uzGS3rfKVemJvTtt8AJaet94",
    authDomain: "my-project-1508499035905.firebaseapp.com",
    databaseURL: "https://my-project-1508499035905.firebaseio.com",
    projectId: "my-project-1508499035905",
    storageBucket: "my-project-1508499035905.appspot.com",
    messagingSenderId: "18372560140",
    appId: "1:18372560140:web:0c84c6fb4db359b4abb529",
    measurementId: "G-CXSQWSQ7N7"
  };
  const fire = firebase.initializeApp(firebaseConfig);

  export default fire;