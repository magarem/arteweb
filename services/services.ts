// import {database} from "../firebase";
// import { db } from "../firebase";
import { useState } from "react";
// import {
//     getKey,
//     get,
//     child,
//     ref,
//     set,
//     onValue,
//     push,
//     update,
//     remove, query, orderByChild
//   } from 'firebase/database';
import { resolve } from "styled-jsx/css";
import { initScriptLoader } from "next/script";


import { collection, query, where, getDocs, orderBy, deleteDoc, setDoc, addDoc, doc } from "firebase/firestore";

  interface ITutorialData {
    key?: string | null,
    title: string,
    description: string,
    published?: boolean,
  }

  const Init = () => {
    const operations = {
      scheme(obj: Object) {
        console.log(typeof (obj.a));
        // setState(obj)
      },
      async save(key: string, ids: Array, obj: Object) {
        console.log(key, obj)
        // remove(ref(database, key));
        
       
      //   await Promise.all(
      //     ids.map(async (x) => {
      //       await deleteDoc(doc(db, key, x));
      //     })
      // )
        const taskQuery = doc(collection(db, key))
        const taskDocs = await getDocs(taskQuery)
         taskDocs.forEach(async (taskDoc) => {
          await deleteDoc(doc(db, key, taskDoc.key));
        })

        // await setDoc(doc(db, key), obj);
        console.log(obj)
        await addDoc(collection(db, key), obj)
        // return a.key
      },
      async create(key: string, obj: Object) {

        try {
          const docRef = await addDoc(collection(db, key), obj);
          console.log("Document written with ID: ", docRef.id);
        } catch (e) {
          console.error("Error adding document: ", e);
        }
        


        // const a = push(ref(database, key), obj);
        // return a.key
      },
       async read(username: string){
        console.log(username);

        const q = query(collection(db, username), orderBy("order"));
        let b = []
        let a = {}
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          console.log(doc.data());
          // doc.data() is never undefined for query doc snapshots
          b.push({key: doc.id, ...doc.data()})
          // a.push({[doc.id]:doc.data()})
        });
        console.log(b)
        return b
        
        // const querySnapshot = await getDocs(collection(db, username));
        // querySnapshot.forEach((doc) => {
        //   console.log(`${doc.id} => ${doc.data()}`);
        // });
        // return querySnapshot

        // const ref = ref(db, `/${auth.currentUser.uid}`);
        // const query = query(ref, orderByChild('createdAt'));
        // onValue(query, (snapshot) => {


        
      
        
         
          // const starCountRef = ref(database, username);
          // onValue(starCountRef, (snapshot) => {
          //   const data =  snapshot.val();
          //   console.log(data);
          //   return data
          // });



          // const dbRef = ref(database);
          // return get(child(dbRef, username)).then((snapshot) => {
          //     if (snapshot.exists()) {
          //         return snapshot.val()
          //     } else {
          //         console.log("No data available");
          //     }
          // }).catch((error) => {
          // console.error(error);
          // }); 
      },
      update(username: string, key: string, obj: Object) {
          const starCountRef = ref(database);
          const updates = {};
          updates[username + '/' + key] = obj;
          update(starCountRef, updates)
      },
      delete(username: string, key: string) {
          remove(ref(database, username + '/' + key));
      }
    }
    return operations
  }

  const operations = Init()

  const loadData = async (username: string) => {
    let lista = []
    const dataObj = await operations.read(username)
    console.log(dataObj);
    
    let a=0
    dataObj && Object.keys(dataObj).forEach(key => {
      console.log(key, dataObj[key]);
      lista.push({key,...dataObj[key]})
      a++
      // if (a==size) {setState(lista)}
    });
    return lista
    // cb(lista)
    // console.log(lista);
  } 
  
  const loadDataById = async (username: string) => {
    // let lista = []
    const dataObj = await operations.read(username)
    console.log(dataObj)
    // dataObj && Object.keys(dataObj).forEach(key => {
    //   console.log(key, dataObj[key]);
    //   lista.push({key,...dataObj[key]})
    // });
    return dataObj
  }
  export {loadData, loadDataById}
  export default operations
  