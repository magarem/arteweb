import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyD5DJ3iMKgZD0EOC01Qs-AzE9Vvwn9xiLU",
  authDomain: "receitas-5968d.firebaseapp.com",
  projectId: "receitas-5968d",
  storageBucket: "receitas-5968d.appspot.com",
  messagingSenderId: "40238569100",
  appId: "1:40238569100:web:1aed03605a177708dc4da9",
  measurementId: "G-Q1SY3V6NJ7",
  // ...
  // The value of `databaseURL` depends on the location of the database
  databaseURL: "https://arteweb.firebaseio.com/",
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
// Get a list of cities from your database
// async function getCities(db) {
//   const cardsCol = collection(db, 'cards');
//   const citySnapshot = await getDocs(cardsCol);
//   const cityList = citySnapshot.docs.map(doc => doc.data());
//   console.log(cityList);
// }







// import firebase, { initializeApp, getApp } from "firebase/app";
// import { getDatabase, ref } from "firebase/database";
// import { getAuth } from "firebase/auth";
// import { getStorage } from "firebase/storage";

// // TODO: Replace the following with your app's Firebase project configuration
// // See: https://firebase.google.com/docs/web/learn-more#config-object
// const firebaseConfig = {
//   apiKey: "AIzaSyD5DJ3iMKgZD0EOC01Qs-AzE9Vvwn9xiLU",
//   authDomain: "receitas-5968d.firebaseapp.com",
//   projectId: "receitas-5968d",
//   storageBucket: "receitas-5968d.appspot.com",
//   messagingSenderId: "40238569100",
//   appId: "1:40238569100:web:1aed03605a177708dc4da9",
//   measurementId: "G-Q1SY3V6NJ7",
//   // ...
//   // The value of `databaseURL` depends on the location of the database
//   databaseURL: "https://arteweb.firebaseio.com/",
// };
// let firebaseCache;
// // const createFirebaseApp = (config = {}) => {
// //     try {
// //       return getApp();
// //     } catch (x) {
// //       return initializeApp(config);
// //     }
// //   };
// // const app = createFirebaseApp(firebaseConfig)
// // Initialize Firebase
// // const app = initializeApp(firebaseConfig);

// export const getFirebase = () => {
//   if (firebaseCache) {
//     return firebaseCache;
//   }

//   firebase.initializeApp(firebaseConfig);
//   firebaseCache = firebase;
//   return firebase;
// };

// // Initialize Realtime Database and get a reference to the service
// export const database = getDatabase(app);
// // export const database
// export const storage = getStorage(app);
// export const auth = getAuth(app);






// import * as firebase from "firebase/app";
// import database from "firebase/database";
// import { getAuth } from "firebase/auth";
// import { getStorage } from "firebase/storage";
// const config = {
//   apiKey: "AIzaSyD5DJ3iMKgZD0EOC01Qs-AzE9Vvwn9xiLU",
//   authDomain: "receitas-5968d.firebaseapp.com",
//   projectId: "receitas-5968d",
//   storageBucket: "receitas-5968d.appspot.com",
//   messagingSenderId: "40238569100",
//   appId: "1:40238569100:web:1aed03605a177708dc4da9",
//   measurementId: "G-Q1SY3V6NJ7",
//   // ...
//   // The value of `databaseURL` depends on the location of the database
//   databaseURL: "https://arteweb.firebaseio.com/",
// };

// let firebaseCache;

// export const getFirebase = () => {
//   if (firebaseCache) {
//     return firebaseCache;
//   }

//   firebase.initializeApp(config);
//   firebaseCache = firebase;
//   return firebase;
// };

// // export const storage = getStorage(app);
// // export const auth = getAuth(app);