import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const config = {
  apiKey: "AIzaSyBC2zNXUOt78CsUSsqqltTYXR1fLrM_OVc",
  authDomain: "box-tv-carlao.firebaseapp.com",
  projectId: "box-tv-carlao",
  storageBucket: "box-tv-carlao.appspot.com",
  messagingSenderId: "814431322509",
  appId: "1:814431322509:web:e9d1c60e7438bc0b17bdc4",
};

const app = initializeApp(config);

export default getFirestore(app);
