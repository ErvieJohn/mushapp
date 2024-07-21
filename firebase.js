import { initializeApp } from "firebase/app"
import { getDatabase, ref, onValue, set } from "firebase/database"
import "firebase/database"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCqULOHC6rYjUZ24U1fATN9LeVz2-o2XfA",
  authDomain: "mushapp-c0311.firebaseapp.com",
  projectId: "mushapp-c0311",
  storageBucket: "mushapp-c0311.appspot.com",
  messagingSenderId: "157630771596",
  appId: "1:157630771596:web:f4ce3863b98960f87a66a9",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getDatabase()

export { db, ref, onValue, set }
