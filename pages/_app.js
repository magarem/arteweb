import '../styles/global.css';
import Layout from '../components/Layout';
import { useState, useEffect } from "react";
import { getCookie } from 'cookies-next';
import { useRouter } from 'next/router'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import 'styles/style.css';
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1976d2',
    },
  },
});
export default function MyApp({ Component, pageProps }) {
  const [state, setState] = useState({})
  const [user, setUser] = useState({})
 
  const router = useRouter()
   
  useEffect(()=>{
    console.log(11,router.asPath);
    if (router.asPath=="/") router.push('/Login')
    if (getCookie('user')) {
       setUser(JSON.parse(getCookie('user')));
    }else{
       if (router.asPath.indexOf("/adm") != -1 && router.asPath != "/Login" && router.asPath != "/SignUp"){
        router.push('/Login')
       }
    }
  },[])
    
    return (
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Layout user={user} >
            <Component key={router.pathname} {...pageProps} user={user} setuser={setUser}/>
        </Layout>
      </ThemeProvider>
    )
}

   