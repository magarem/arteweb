import { useState, useEffect } from "react";
import { getCookie } from 'cookies-next';
export default function Dashboard({ Component, pageProps, user }) {
  const [state, setState] = useState({})
    return (
        <div>
            <div>Bem vindo!</div>
            <div>{user.email}</div>
        </div>
    )
}

   