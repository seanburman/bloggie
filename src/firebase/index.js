import firebase from 'firebase/app'
import 'firebase/storage'
import 'firebase/analytics'
import 'firebase/auth'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyBEKz4zyGGiqtgygYpjsC19WhfKkZODNF0",
    authDomain: "fir-react-upload-359a8.firebaseapp.com",
    projectId: "fir-react-upload-359a8",
    storageBucket: "fir-react-upload-359a8.appspot.com",
    messagingSenderId: "771567757253",
    appId: "1:771567757253:web:0e9a5974049f9271798dac",
    measurementId: "G-GT0M9F5RV1"
  };

firebase.initializeApp(firebaseConfig)

const storage = firebase.storage()

export { storage, firebase as default}