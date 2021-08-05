import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAETWA3Z9ScxJWV7Yn8T4r4Vxc_nrYqJV4",
  authDomain: "whatsapp-app-22ae721.firebaseapp.com",
  projectId: "whatsapp-app-22ae721",
  storageBucket: "whatsapp-app-22ae721.appspot.com",
  messagingSenderId: "976492929726",
  appId: "1:976492929726:web:b4e76f4b506496737774ef",
  measurementId: "G-QKXMK82PTV",
};

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();
const db = app.firestore();
const auth = app.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider }; // this will allow to access the firebase connections inside of our application
