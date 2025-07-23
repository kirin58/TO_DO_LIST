import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; 
import { getAnalytics } from "firebase/analytics";


const firebaseConfig = {
  apiKey: "AIzaSyAFRC0-uzuXB5QKybBrWhWXeo1Umi0FPFk",
  authDomain: "garavityplan.firebaseapp.com",
  projectId: "garavityplan",
  storageBucket: "garavityplan.appspot.com", 
  messagingSenderId: "460976627275",
  appId: "1:460976627275:web:65753c82e8b0f49dc077ce",
  measurementId: "G-ZBCDR6WXNT"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app); 
const analytics = getAnalytics(app);

export { db }; 


