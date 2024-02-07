import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAm38bDb4iSSZYIqwpencGpUVRYl-oD-fA",
  authDomain: "sil-photo-album.firebaseapp.com",
  projectId: "sil-photo-album",
  storageBucket: "sil-photo-album.appspot.com",
  messagingSenderId: "54719945650",
  appId: "1:54719945650:web:cfb7f8c860b14b985f62ab",
  measurementId: "G-HLKBRTWM6Q",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
