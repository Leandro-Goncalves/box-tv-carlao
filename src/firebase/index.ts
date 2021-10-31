import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const config = {
  apiKey: "AIzaSyD88sHDk-SB8kHxXEK1Gdxz317OyHMy7PE",
  authDomain: "box-tv-348e2.firebaseapp.com",
  projectId: "box-tv-348e2",
  storageBucket: "box-tv-348e2.appspot.com",
  messagingSenderId: "1030187959468",
  appId: "1:1030187959468:web:f39af55e9101da15e84b09",
};

const app = initializeApp(config);

export default getFirestore(app);
