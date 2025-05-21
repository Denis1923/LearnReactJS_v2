// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAUsGLeQKVsp4PAkpPQvw1_nvNR5S1SUjQ",
  authDomain: "todos-db357.firebaseapp.com",
  projectId: "todos-db357",
  storageBucket: "todos-db357.firebasestorage.app",
  messagingSenderId: "808243653731",
  appId: "1:808243653731:web:c40fde1ae3037c3bf85c56",
  dataBaseURL: "https://todos-db357-default-rtdb.europe-west1.firebasedatabase.app/"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export default firebaseApp;