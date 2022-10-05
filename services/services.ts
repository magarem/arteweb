import {database} from "../firebase";
import { useState } from "react";
import {
    getKey,
    get,
    child,
    ref,
    set,
    onValue,
    push,
    update,
    remove, query, orderByChild
  } from 'firebase/database';
import { resolve } from "styled-jsx/css";
import { initScriptLoader } from "next/script";

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
      create(key: string, obj: Object) {
        const a = push(ref(database, key), obj);
        return a.key
      },
      read(username: string, key: string){
        console.log(username);
          const dbRef = ref(database);
          return get(child(dbRef, username)).then((snapshot) => {
              if (snapshot.exists()) {
                  return (snapshot.val());
              } else {
                  console.log("No data available");
              }
          }).catch((error) => {
          console.error(error);
          }); 
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
    
    var size = Object.keys(dataObj).length
    console.log('size:', size);
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
  