import {getApp, getApps, initializeApp} from 'firebase/app'
import {getFirestore} from "firebase/firestore"
import {getStorage} from "firebase/storage"

const firebaseConfig = {
    apiKey: "AIzaSyD70kuJE3HciDSVjfJXH_Vnau_5Z6PepxE",
    authDomain: "restaurantapp-82fb9.firebaseapp.com",
    databaseURL: "https://restaurantapp-82fb9-default-rtdb.firebaseio.com",
    projectId: "restaurantapp-82fb9",
    storageBucket: "restaurantapp-82fb9.appspot.com",
    messagingSenderId: "819683136611",
    appId: "1:819683136611:web:aef1cc0b28463d38ea1456",
    measurementId: "G-C7B5QNKCL2"
  };

  const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig)
  
  const firestore = getFirestore(app);
  const storage = getStorage(app)

  export {app, firestore, storage};
  