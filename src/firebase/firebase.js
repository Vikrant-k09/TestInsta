// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, setPersistence, inMemoryPersistence, onAuthStateChanged } from "firebase/auth";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration using environment variables for security
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

// Set Auth persistence to in-memory for better control in certain environments
setPersistence(auth, inMemoryPersistence)
  .then(() => {
    console.log("In-memory persistence set successfully");
  })
  .catch((error) => {
    console.error("Error setting in-memory persistence: ", error);
  });

// Check authentication state and fetch data
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("User is signed in:", user);
    // User is signed in, you can proceed with Firestore operations
    fetchData();
  } else {
    console.log("No user is signed in");
    // Handle the case where no user is signed in
  }
});

// Firestore operations
async function fetchData() {
  try {
    const querySnapshot = await getDocs(collection(firestore, "yourCollection"));
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data()}`);
    });
  } catch (error) {
    console.error("Error fetching documents: ", error);
  }
}

export { app, auth, firestore, storage };
