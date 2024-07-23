import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAvMg73ra9PLrVYfV2NWq90vakXPfnvtDg",
  authDomain: "imc-login-907a6.firebaseapp.com",
  projectId: "imc-login-907a6",
  storageBucket: "imc-login-907a6.appspot.com",
  messagingSenderId: "485790959574",
  appId: "1:485790959574:web:8941dc61157eded2a40677",
  databaseURL: "https://imc-login-907a6-default-rtdb.asia-southeast1.firebasedatabase.app"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage(app);
export const db = getDatabase(app);
export default app;
