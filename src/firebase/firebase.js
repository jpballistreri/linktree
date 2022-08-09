import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  getBytes,
} from "firebase/storage";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  query,
  where,
  setDoc,
  deleteDoc,
  getFirestore,
} from "firebase/firestore";

import App from "../App";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: process.env.REACT_APP_AUTHDOMAIN,
  projectId: process.env.REACT_APP_PROJECTID,
  storageBucket: process.env.REACT_APP_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_APPID,
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export const userExists = async (uid) => {
  const docRef = doc(db, "users", uid);
  const res = await getDoc(docRef);
  return res.exists();
};

export const existsUsername = async (username) => {
  console.log(username);
  const users = [];
  const docsRef = collection(db, "users");
  const q = query(docsRef, where("username", "==", username));

  const querySnapshot = await getDocs(q);
  console.log(querySnapshot);

  querySnapshot.forEach((doc) => {
    users.push(doc.data());
  });
  return users.length > 0 ? users[0].uid : null;
};

export const registerNewUser = async (user) => {
  try {
    const collectionRef = collection(db, "users");
    const docref = doc(db, "users", user.uid);
    await setDoc(docref, user);
  } catch (error) {
    console.log(error);
  }
};

export const updateUser = async (user) => {
  try {
    const collectionRef = collection(db, "users");
    const docRef = doc(collectionRef, user.uid);
    await setDoc(docRef, user);
  } catch (error) {
    console.log(error);
  }
};

export const getUserInfo = async (uid) => {
  try {
    const docRef = doc(db, "users", uid);
    const document = await getDoc(docRef);
    console.log(document.data());
    return document.data();
  } catch (error) {
    console.log(error);
  }
};
