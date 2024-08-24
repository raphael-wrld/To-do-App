// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyDa6ggsVliYQ5mGDYz0tXngeL6BuSLxgp8',
  authDomain: 'todo-appio.firebaseapp.com',
  projectId: 'todo-appio',
  storageBucket: 'todo-appio.appspot.com',
  messagingSenderId: '847162021851',
  appId: '1:847162021851:web:86e6c2d8615905794539fe',
  measurementId: 'G-80WDLYG3VS'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const analytics = getAnalytics(app)
export { db }
export {analytics}
