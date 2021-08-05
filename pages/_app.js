import "../styles/globals.css";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import Login from "./login";
import Loading from "../components/Loading";
import { useEffect } from "react";
import firebase from "firebase";

function MyApp({ Component, pageProps }) {
  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    if (user) {
      // uid -> it comes from google profile
      // set -> it is going to update or replace everything inside the document
      // firebase -> NoSQL database structure
      // photoURL -> user profile picture from google

      db.collection("users").doc(user.uid).set(
        {
          email: user.email,
          lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
          photoURL: user.photoURL,
        },
        { merge: true }
      );
    }
  }, [user]);

  if (loading) return <Loading />;

  if (!user) return <Login />;

  return <Component {...pageProps} />;
}

export default MyApp;
