import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Preview from '@mui/icons-material/Preview';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import type { NextPage } from "next";
import { useState } from "react";
import { setCookie, deleteCookie } from 'cookies-next';
import { useRouter } from 'next/router'
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

import { auth } from "../firebase2";
import { dark } from '@mui/material/styles/createPalette';

// import { auth } from "../firebaseConfig";
// import { useCookies } from "react-cookie"
// import Cookies from 'js-cookie'
// import { parseCookies, setCookie, destroyCookie } from 'nookies'

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();
interface Props {
  setuser: Function,
  user: {
    email: string
  }
}

const Login: NextPage<Props> = (props) =>{
  // const [cookie, setCookie] = useCookies(["user"])
  const router = useRouter()

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  const [loginUser, setLoginUser] = useState({email: "", password: ""});
  const [user, setUser] = useState({});

  
  onAuthStateChanged(auth, (currentUser) => {
    console.log(1,currentUser);
    setUser(currentUser);
    setCookie('user', currentUser)
    // Cookies.set('user', `{"uid": "${currentUser.uid}", "email": "${currentUser.uid}"}`)
    // setCookie("user", currentUser, {
    //   path: "/",
    //   maxAge: 3600, // Expires after 1hr
    //   sameSite: true,
    // })
    // Set
    // setCookie(null, 'user', `{"uid": "${currentUser.uid}", "email": "${currentUser.uid}"}`, {
    //   maxAge: 30 * 24 * 60 * 60,
    //   path: '/',
    // })
  });

  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        loginUser.email,
        loginUser.password
      );
      deleteCookie('user')
      console.log(user.user);
      setCookie('user', user.user)
      localStorage.removeItem('user')
      localStorage.setItem('user', JSON.stringify(user.user))

      props.setuser(user.user)
      router.push(`/${user.user.displayName}/adm/list`)

    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <ThemeProvider theme={dark}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 6,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {/* <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}> */}
            <Preview fontSize='large' />
          {/* </Avatar> */}
          <Typography component="h1" variant="h5">
            ArteWeb
          </Typography>
          {/* {user?.email} */}
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={(event) => {
                    setLoginUser({...loginUser, email: event.target.value });
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={(event) => {
                    setLoginUser({...loginUser, password: event.target.value });
                  }}
                />
              </Grid>
            </Grid>
            <Button
              type="button"
              onClick={login}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Login
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/SignUp" variant="body2">
                  Ainda não tem uma conta? Registre-se
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
export default Login;