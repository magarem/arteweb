import * as React from 'react';
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { getCookie } from 'cookies-next'

const Teste2: NextPage = (props) => {
  const [state, setState] = useState({}); 
  useEffect(() => {
    const user = JSON.parse(getCookie('user'))
    setState(user);
  }, []) 
  
  console.log(state)
  return (
    <div>
     {state.b}
    </div>
  );
}
export default Teste2;

