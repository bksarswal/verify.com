
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyA4vbUNfB-FGPe17hOhqeCzdqREFXgwtPA",
  authDomain: "easyearn-71472.firebaseapp.com",
  projectId: "easyearn-71472",
  storageBucket: "easyearn-71472.firebasestorage.app",
  messagingSenderId: "644395655931",
  appId: "1:644395655931:web:9ea7c0811d3831fc36865e",
  measurementId: "G-4RQBC8KH4N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app