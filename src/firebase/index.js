import firebase from 'firebase/app'
import 'firebase/storage'
import 'firebase/analytics'
import 'firebase/auth'
import 'firebase/firestore'
import env from 'react-dotenv'

const APIKEY = env.APIKEY
const AUTHDOMAIN = env.AUTHDOMAIN
const PROJECTID = env.PROJECTID
const STORAGEBUCKET = env.STORAGEBUCKET
const MESSAGINGSENDERID = env.MESSAGINGSENDERID
const APPID = env.APPID
const MEASUREMENTID = env.MEASUREMENTID


const firebaseConfig = {
    apiKey: APIKEY,
    authDomain: AUTHDOMAIN,
    projectId: PROJECTID,
    storageBucket: STORAGEBUCKET,
    messagingSenderId: MESSAGINGSENDERID,
    appId: APPID,
    measurementId: MEASUREMENTID
  };

firebase.initializeApp(firebaseConfig)

const storage = firebase.storage()

export { storage, firebase as default}