// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA9Xf9gBAurwYZOrI-0OJodMgRqVfrUH-M",
  authDomain: "shop-73136.firebaseapp.com",
  projectId: "shop-73136",
  storageBucket: "shop-73136.appspot.com",
  messagingSenderId: "720867089554",
  appId: "1:720867089554:web:c10283ee6442da18b7da4b",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
