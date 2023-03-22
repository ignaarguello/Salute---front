// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { v4 } from 'uuid'


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAEYXBbRwqSzys4ig1JnyGguE9vYj-8MZk",
    authDomain: "salute-drinks-firebase.firebaseapp.com",
    projectId: "salute-drinks-firebase",
    storageBucket: "salute-drinks-firebase.appspot.com",
    messagingSenderId: "242948040732",
    appId: "1:242948040732:web:9bdace86724e3c5d1217d9"
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