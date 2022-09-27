import { useState, useEffect } from "react";
import { getCookie } from 'cookies-next';
export default function Dashboard({ Component, pageProps, user }) {
//   const router = useRouter()

  const [state, setState] = useState({})
  // onAuthStateChanged(auth, (currentUser) => {
  //   if (currentUser) {
  //     // User is signed in.
  //   } else {
  //     if (router.pathname != "/Login") {
  //       router.push('/Login')
  //     }
  //   }
  // });

  // useLayoutEffect(() => {
   
  //   if (!state && router.pathname != "/Login") {
  //     router.push('/Login')
  //   }
  // }, [state])

  // useEffect(() => {
  //   // const user = JSON.parse(getCookie('user'))
  //   const user = JSON.parse(localStorage.getItem('user'))
  //   setState(user);
  //   console.log(router.pathname)
    
  //   console.log(1, JSON.stringify(state) === '{}');
  //   if (JSON.stringify(state) === '{}' && router.pathname != "/Login") router.push('/Login')

  // }, []) 
  
  

  // initAuth()
 
    return (
        <div>
            <div>Bem vindo!</div>
            <div>{user.email}</div>
        </div>
    )
}

   