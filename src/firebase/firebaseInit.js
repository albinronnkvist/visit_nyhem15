import firebase from "firebase/app"
import "firebase/firestore"
import "firebase/auth"
import "firebase/storage"
import config from "./firebaseConfig"

const firebaseApp = firebase.initializeApp(config)

export const db = firebaseApp.firestore()
export const auth = firebaseApp.auth()
export const storage = firebase.storage()
export const fbApp = firebaseApp
export const f = firebase