// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { v4 } from 'uuid'


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBNzLXGKYiIaphgly0KudYelON_2t_56ZI",
  authDomain: "storage-salute-1.firebaseapp.com",
  projectId: "storage-salute-1",
  storageBucket: "storage-salute-1.appspot.com",
  messagingSenderId: "940195794306",
  appId: "1:940195794306:web:beb2bdc1938870f1e6539b"
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