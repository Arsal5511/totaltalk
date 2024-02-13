import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'


const firebaseConfig = {
    apiKey: "AIzaSyAl6pbeN2fIsi2h1eJSKvpDfFHPR3V37gE",
    authDomain: "totaltalk143.firebaseapp.com",
    projectId: "totaltalk143",
    storageBucket: "totaltalk143.appspot.com",
    messagingSenderId: "592202519320",
    appId: "1:592202519320:web:169a5f94951d7c8807c46d",
    measurementId: "G-KV21GEPMMJ"
  };

  const app = initializeApp(firebaseConfig);
  

  export const auth = getAuth(app);