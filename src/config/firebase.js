// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword as firebaseSignIn,
  createUserWithEmailAndPassword as firebaseCreateUser,
  signOut as firebaseSignOut,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  query,
  where,
  orderBy,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDrXPNeNKCMTTfiunimv42PsU-_yoDgZj4",
  authDomain: "keeper-2211b.firebaseapp.com",
  projectId: "keeper-2211b",
  storageBucket: "keeper-2211b.firebasestorage.app",
  messagingSenderId: "475569731599",
  appId: "1:475569731599:web:091daaf98d22d2430d0b7a",
  measurementId: "G-GQMS1KT2YM",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestore = getFirestore(app);

// Authentication functions
export const signInWithEmailAndPassword = async (email, password) => {
  try {
    const result = await firebaseSignIn(auth, email, password);
    return { user: result.user, error: null };
  } catch (error) {
    return { user: null, error: error.message };
  }
};

export const createUserWithEmailAndPassword = async (email, password) => {
  try {
    const result = await firebaseCreateUser(auth, email, password);
    return { user: result.user, error: null };
  } catch (error) {
    return { user: null, error: error.message };
  }
};

export const signOut = async () => {
  try {
    await firebaseSignOut(auth);
    return { error: null };
  } catch (error) {
    return { error: error.message };
  }
};

// Firestore functions
export const getUserNotes = async (userId) => {
  try {
    console.log("Fetching notes for user:", userId);
    const notesRef = collection(firestore, "notes");

    // First try with both where and orderBy
    try {
      const q = query(
        notesRef,
        where("userId", "==", userId),
        orderBy("createdAt", "desc")
      );

      const snapshot = await getDocs(q);
      console.log("Notes fetched successfully:", snapshot.docs.length);
      return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    } catch (indexError) {
      // If we get an index error, try without the orderBy
      console.warn("Index error, fetching without orderBy:", indexError);
      const fallbackQuery = query(notesRef, where("userId", "==", userId));

      const fallbackSnapshot = await getDocs(fallbackQuery);
      console.log("Notes fetched with fallback:", fallbackSnapshot.docs.length);
      return fallbackSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    }
  } catch (error) {
    console.error("Error getting notes: ", error);
    return [];
  }
};

export const addNote = async (userId, note) => {
  try {
    console.log("Adding note for user:", userId, "Note:", note);

    // Ensure note has title and content properties
    if (!note.title && !note.content) {
      console.error("Note must have title or content");
      return null;
    }

    const noteData = {
      title: note.title || "",
      content: note.content || "",
      userId,
      createdAt: serverTimestamp(),
    };

    const notesRef = collection(firestore, "notes");
    const docRef = await addDoc(notesRef, noteData);
    console.log("Note added successfully with ID:", docRef.id);

    // Return a note object that matches the format expected by the UI
    // Since serverTimestamp() returns a special FieldValue object that can't be used directly,
    // we'll use the current date for the returned object
    return {
      id: docRef.id,
      title: noteData.title,
      content: noteData.content,
      userId,
      createdAt: new Date(),
    };
  } catch (error) {
    console.error("Error adding note: ", error);
    return null;
  }
};

export const deleteNote = async (noteId) => {
  try {
    const noteRef = doc(firestore, "notes", noteId);
    await deleteDoc(noteRef);
    return true;
  } catch (error) {
    console.error("Error deleting note: ", error);
    return false;
  }
};
