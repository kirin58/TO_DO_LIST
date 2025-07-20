import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // ✅ เพิ่มส่วนนี้
import { getAnalytics } from "firebase/analytics";

// ✅ แก้ storageBucket ที่พิมพ์ผิด
const firebaseConfig = {
  apiKey: "AIzaSyAFRC0-uzuXB5QKybBrWhWXeo1Umi0FPFk",
  authDomain: "garavityplan.firebaseapp.com",
  projectId: "garavityplan",
  storageBucket: "garavityplan.appspot.com", // ❌ เดิม: firebasestorage.app → ✅ ต้องเป็น: appspot.com
  messagingSenderId: "460976627275",
  appId: "1:460976627275:web:65753c82e8b0f49dc077ce",
  measurementId: "G-ZBCDR6WXNT"
};

// ✅ Init Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // ✅ ใช้ Firestore
const analytics = getAnalytics(app);

export { db }; // ✅ export db ไว้ใช้งานในไฟล์อื่น เช่น addDoc


