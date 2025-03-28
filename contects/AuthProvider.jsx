// import React,{createContext, useState} from 'react'
// import app from'../firebase/firebase.config';
// import {getAuth, createUserWithEmailAndPassword} from "../firebase/auth";

import  { createContext, useState,useEffect } from "react";
import app from "../firebase/firebase.config";
//import { auth } from "../firebase";
import { GoogleAuthProvider,getAuth, createUserWithEmailAndPassword, onAuthStateChanged, GoogleAuthProvider } from "firebase/auth";
export const AuthContext = createContext();
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();


const AuthProvider = ({children}) => {

    const[user,setUser] = useState(null);
    const[loading,setLoading] = useState(true);

    const createUser = (email, password) =>{
    setLoading(true);
    return createUserWithEmailAndPassword(auth , email, password);
    }
// const signUpWithGmail = () => { 
//     return sigInWit
// }
const loginwithGoogle = () => {
  setLoading(true);
  return signInWithpopup(auth,googleProvider)
}
 
useEffect ( () => {
  const unsubscribe = onAuthStateChanged(auth, currentUser => {
    console.log(currentUser);
    setUser(currentUser)
    setLoading(false);

});
return () => {
  return unsubscribe();
}
},[])






    const authInfo = {
      user,
        createUser,
        loginwithGoogle
    }

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider