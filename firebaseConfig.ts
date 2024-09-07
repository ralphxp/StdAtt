import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyBlelvJKqNdRwuRObi9PhOZmGHWhvq8cTQ",
    authDomain: "attendanceapp-439dc.firebaseapp.com",
    projectId: "attendanceapp-439dc",
    storageBucket: "attendanceapp-439dc.appspot.com",
    messagingSenderId: "287703626358",
    appId: "1:287703626358:web:9131520696a6c125f7e557",
    measurementId: "G-6PBMLMTNHX",
    databaseURL: "https://attendanceapp-439dc-default-rtdb.europe-west1.firebasedatabase.app/"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);



export const db = getDatabase();