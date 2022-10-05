import { Component, ChangeEvent } from "react";
import operations, {loadData} from "../../../services/services";
import * as React from 'react';
import type { NextPage } from "next";
import { useEffect } from "react";
import { setCookie } from 'cookies-next'
import { useState } from "react";

import m, {b, c} from '../../../teste_export'
const Teste: NextPage =  (props) => {
  const [state, setState] = useState([])
  
  // const loadData = async (username: string) => {
  //   let lista = []
  //   const dataObj = await operations.read(username)
  //   dataObj && Object.keys(dataObj).forEach(key => {
  //     console.log(key, dataObj[key]);
  //     lista.push({key,...dataObj[key]})
  //   });
  //   // console.log(lista);
  //   return lista;
  // }
  // const loadData = async (username: string) => {
  //   let lista = []
  //   const dataObj = await operations.read(username)
  //   var size = Object.keys(dataObj).length
  //   console.log('size:', size);
  //   let a=0
  //   dataObj && Object.keys(dataObj).forEach(key => {
  //     console.log(key, dataObj[key]);
  //     lista.push({key,...dataObj[key]})
  //     a++
  //     // if (a==size) {setState(lista)}
  //   });
  //   return lista
  //   // cb(lista)
  //   // console.log(lista);
  // }

  // deleteData("magarem", "-NDEhXMcMvEYb4ozaTOG")
  const init = async () => {
   
  
    // operations.scheme(a1)
    const aa = await loadData("maga")
    setState(aa)
  }
  

  useEffect(() => {
    init()
    // loadData("maga").then(setState)
    // tt()
    // loadData("maga").then(x=>setState(x))
    //console.log(operations.create("maga", {title: "maguete!4", desc: "vamos modularizar..."}))
    // operations.update("maga", '-NDJdnBpjSjPw1lNcZsK', {data: "25/10/2022", title: "update test", desc: "vamos111 modularizar..."})
    // operations.delete("maga", '-NDJdrphKn73RvoowD7a')
    // loadData("maga")
  }, []) 
  
  return (
    <div>
      {state.map((item, key) => 
        <div key={key}>
        <p>key: {item.key}</p>
        <p>title: {item.title}</p>
        <p>desc: {item.desc}</p>
        </div>
      )}
    </div>
  );
}
export default Teste;

