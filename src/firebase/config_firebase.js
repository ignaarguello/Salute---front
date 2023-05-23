// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { v4 } from 'uuid'


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBAg-KPV1xG8bYVA69E5YDn8MOKGrm3L3w",
  authDomain: "salute-2.firebaseapp.com",
  projectId: "salute-2",
  storageBucket: "salute-2.appspot.com",
  messagingSenderId: "1001939494860",
  appId: "1:1001939494860:web:8e84aaac015617a2595f69"
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