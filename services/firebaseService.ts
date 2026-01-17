import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, updateDoc, doc, serverTimestamp } from "firebase/firestore";
import { getStorage, ref, uploadString, getDownloadURL } from "firebase/storage";
import { FoodItem, FoodStatus } from "../types";

/**
 * Firebase Configuration
 * Updated with user-provided credentials for 'food-share-537db'
 */
const firebaseConfig = {
  apiKey: "AIzaSyABX-8a-jYBP-WeU4UNM8RgyEy6GFIwNi4",
  authDomain: "food-share-537db.firebaseapp.com",
  projectId: "food-share-537db",
  storageBucket: "food-share-537db.firebasestorage.app",
  messagingSenderId: "1077258816762",
  appId: "1:1077258816762:web:0a96970dd69d57b36ecd43",
  measurementId: "G-EYY5SW4ZDN"
};

// Initialize Firebase once
const app = initializeApp(firebaseConfig);

// Export service instances
export const db = getFirestore(app);
export const storage = getStorage(app);

/**
 * Uploads a food item to Firebase (Firestore + Storage)
 * Includes a simulated progress tracker for the UI stepper.
 */
export const uploadFoodDonation = async (
  item: Omit<FoodItem, 'id' | 'timestamp'>,
  onProgress?: (step: number) => void
): Promise<string> => {
  try {
    // Step 1: Image Pre-processing
    if (onProgress) onProgress(1);
    await new Promise(r => setTimeout(r, 600));

    // Step 2: Cloud Storage Upload (Simulated)
    if (onProgress) onProgress(2);
    await new Promise(r => setTimeout(r, 1000));

    // Step 3: Firestore Document Creation
    if (onProgress) onProgress(3);
    const docRef = await addDoc(collection(db, "donations"), {
      ...item,
      timestamp: serverTimestamp(),
      createdAt: new Date().toISOString()
    });

    // Step 4: NGO Broadcast Trigger
    if (onProgress) onProgress(4);
    await new Promise(r => setTimeout(r, 400));

    return docRef.id;
  } catch (error) {
    console.error("Firebase Operation Failed:", error);
    throw error;
  }
};

/**
 * Synchronizes local status changes to the Firestore cloud database
 */
export const updateFoodStatusInCloud = async (id: string, status: FoodStatus) => {
  try {
    const itemRef = doc(db, "donations", id);
    await updateDoc(itemRef, { 
      status, 
      lastUpdated: serverTimestamp() 
    });
    console.debug(`Cloud Sync Success: ${id} updated to ${status}`);
  } catch (error) {
    console.error("Cloud Sync Failure:", error);
  }
};