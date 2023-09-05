// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { v4 } from 'uuid'


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCZnA-ZVVXX8385EpUF_23St5Yavkzn_G0",
  authDomain: "salute-production-bc1f0.firebaseapp.com",
  projectId: "salute-production-bc1f0",
  storageBucket: "salute-production-bc1f0.appspot.com",
  messagingSenderId: "322922396622",
  appId: "1:322922396622:web:3e7b2d8cf4eec65de6899f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)

//Funcion para subir las imagenes a firebase
export async function uploadImagenes(file) {
  const storageRef = ref(storage, v4())
  await uploadBytes(storageRef, file)
  const url = await getDownloadURL(storageRef)
  return url
}