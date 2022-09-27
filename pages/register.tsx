import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import { app } from "../firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth } from "../firebaseConfig";


const Register: NextPage = () => {

  const [registerUser, setRegisterUser] = useState({email: "", password: ""});
  const [user, setUser] = useState({});

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  const register = async () => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        registerUser.email,
        registerUser.password
      );
      console.log(user);
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div>
      {user.uid}
      <h3> Register User </h3>
      {registerUser.email}
      {registerUser.password}<br/>
      <input
        placeholder="Email..."
        onChange={(event) => {
          setRegisterUser({...registerUser, email: event.target.value });
        }}
      />
      <input
        placeholder="Password..."
        onChange={(event) => {
          setRegisterUser({...registerUser, password: event.target.value });
        }}
      />

      <button onClick={register}> Create User</button>
    </div>
  );
};
export default Register;