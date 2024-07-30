import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, addDoc, deleteDoc, updateDoc, doc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCGchlWeRJO37EGURx0fAAFyBfZGPcCUjI",
  authDomain: "(link unavailable)",
  projectId: "briell-pantry-tracker",
  storageBucket: "(link unavailable)",
  messagingSenderId: "306619864260",
  appId: "1:306619864260:web:6069de890795d32682a591",
  measurementId: "G-KXMBY05Z3E"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

const pantryCollectionRef = collection(db, 'pantry');

export const addPantryItem = async (item: { name: string; quantity: number }) => {
  await addDoc(pantryCollectionRef, item);
};

export const deletePantryItem = async (id: string) => {
  await deleteDoc(doc(db, 'pantry', id));
};

export const updatePantryItem = async (id: string, item: { name: string; quantity: number }) => {
  await updateDoc(doc(db, 'pantry', id), item);
};

const getPantryItems = async () => {
  const pantryItemsRef = db.collection('pantryItems');
  const items = await pantryItemsRef.get();
  return items.docs.map((item) => ({ id: item.id,...item.data() }));
};