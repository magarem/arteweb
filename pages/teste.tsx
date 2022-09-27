import * as React from 'react';
import type { NextPage } from "next";
import { useEffect } from "react";
import { setCookie } from 'cookies-next'

const Teste: NextPage = (props) => {
  useEffect(() => {
    // Perform localStorage action
    // localStorage.setItem("user", JSON.stringify({a:10, b:20}));
    setCookie('user', JSON.stringify({a:10, b:20}));
  }, []) 
  return (
    <div>
      Todos list
    </div>
  );
}
export default Teste;

