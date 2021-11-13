import { initializeApp } from 'firebase/app';
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword,onAuthStateChanged} from 'firebase/auth';
import {getFirestore, doc, setDoc, getDoc, addDoc, collection, getDocs, query,where } from "firebase/firestore"
import {getStorage, ref,uploadBytesResumable,getDownloadURL} from "firebase/storage";
const firebaseApp = initializeApp({
    apiKey: "AIzaSyBDncW5zsei5YfCHXRKTPca43GnKKBlD3g",
    authDomain: "foodorder-d5ad3.firebaseapp.com",
    projectId: "foodorder-d5ad3",
    storageBucket: "foodorder-d5ad3.appspot.com",
    messagingSenderId: "860272425145",
    appId: "1:860272425145:web:a54c3cc333e2504625c368",
    measurementId: "G-Z4KZV36TRW"
});
  const auth= getAuth();
  const db=getFirestore();
  const storage= getStorage();
  export{
      auth,
      db,
      storage,
      getDownloadURL,
      ref,
      uploadBytesResumable,
      onAuthStateChanged,
      createUserWithEmailAndPassword,
      signInWithEmailAndPassword   ,
      doc,
      setDoc,
      getFirestore,getDoc,
      addDoc,
      collection,
      getDocs,
      query,
      where,
      
  }


