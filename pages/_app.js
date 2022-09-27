import '../styles/global.css';
import Layout from '../components/Layout';
import { useState, useEffect } from "react";
import { getCookie } from 'cookies-next';
import { useRouter } from 'next/router'
export default function MyApp({ Component, pageProps }) {
  

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
  const router = useRouter()
  useEffect(() => {
   console.log(JSON.stringify(state)=="{}");
    if (JSON.stringify(state)=="{}" && router.pathname != "/Login"  && router.pathname != "/SignUp") {
      router.push('/Login')
    }
  }, [])

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
      <Layout user={state} >
        {/* <CookiesProvider> */}
        {/* {user.uid} */}
        {/* {JSON.stringify(state)} */}
          <Component key={router.pathname} {...pageProps} user={state} setuser={setState}/>
        {/* </CookiesProvider> */}

      </Layout>
    )
    }

   