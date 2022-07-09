import React, { useContext,} from 'react';
import './Login.css'
import { initializeApp } from 'firebase/app';

import { getAuth, GoogleAuthProvider,signInWithPopup,signOut,createUserWithEmailAndPassword,signInWithEmailAndPassword } from "firebase/auth";
import { useState } from 'react';
import firebaseConfig from '../firebaseConfig/firebaseConfig';
import { userContext } from '../../App';
import { useLocation,useNavigate } from 'react-router-dom';
const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();

function Login() {
  const [newUser, setNewUser] = useState(false)
  
  const [user, setUser] = useState({
    isSignIn: false,
    name: '', 
    email:'',
    password: '',
    error: '',
    success: false
  })
  const [loggedInUser, setloggedInUser] = useContext(userContext);
        const navigate = useNavigate();
        const location = useLocation();
        let from = location.state?.from?.pathname || "/";
        
  const handelSignIn = () =>{
    const auth = getAuth();
    signInWithPopup(auth, provider)
    .then(res=>{
      const {displayName, email} = res.user;
      const signInuser = {
        isSignIn: true,
        name: displayName,
        email: email
      }
      setUser(signInuser);
    })
  }
  const handelSignOut = () =>{
    const auth = getAuth();
    signOut(auth).then(() => {
      const signOutUser = {
        isSignIn: false,
        name: '',
        email: ''
      }
      setUser(signOutUser);
    })
  }
  const handelBlur = (e) =>{
    let isFormValited = true;
    if(e.target.name==='email'){
      isFormValited = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(e.target.value);
    }
    if(e.target.name==='password'){
      const passwordvalited = e.target.value.length > 6;
      const passwordHasNumber = /\d{1}/.test(e.target.value);
      isFormValited = passwordvalited && passwordHasNumber

    }
    if(isFormValited){
      const newUserInfo = {...user}
      newUserInfo[e.target.name]=e.target.value
      setUser(newUserInfo)
    }
  }
  const handelSubmit = (e) =>{
    if(newUser && user.email&&user.password){
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, user.email, user.password)
    .then((res) => {
      const newUserInfo ={...user};
      newUserInfo.error = ''
      newUserInfo.success = true
      setUser(newUserInfo)
  })
  .catch((error) => {
    const newUserInfo ={...user};
    newUserInfo.error = error.message
    newUserInfo.success = false
    setUser(newUserInfo)
   
  });
    }
    if(!newUser && user.email && user.password){
      const auth = getAuth();
      signInWithEmailAndPassword(auth, user.email, user.password)
      .then((res) => {
        const newUserInfo ={...user};
        newUserInfo.error = ''
        newUserInfo.success = true
        setUser(newUserInfo);
        setloggedInUser(newUserInfo);
        navigate(from, { replace: true });
        
  })
  .catch((error) => {
    const newUserInfo ={...user};
    newUserInfo.error = error.message
    newUserInfo.success = false
    setUser(newUserInfo)
  });
    }
    e.preventDefault();
  }
  return (
    <div className='app'>
    
      {
        user.isSignIn && <div>
          <h1>{user.name}</h1>
          <h1>{user.email}</h1>
        </div>
      }

      <div className='form'>
        <input type="checkbox" onChange={()=>{setNewUser(!newUser)}} name="newUser" id="" />
        <label htmlFor="newUser">Create New Account</label>
      <form onSubmit={handelSubmit}>
      {newUser && <input className='input-field' onBlur={handelBlur} type="text" name='name' placeholder='Enter Your Name' required/>}
      <br />
        <input className='input-field' onBlur={handelBlur} type="text" name='email' placeholder='Enter Your Email' required/>
        <br />
        <input className='input-field' onBlur={handelBlur} type="password" name="password" placeholder='Enter Your Password' required />
        <br />
        <input className='btn' type="submit" />
      </form>
      <p style={{color: 'red'}}>{user.error}</p>
      {
        user.success && <p style={{color: 'green'}}>{newUser ? "Account Created" : "Login Successfully"}</p>
      }
      </div>
      {
       user.isSignIn?<button className='btn' onClick={handelSignOut}>Sign Out</button>:
       <button className='btn' onClick={handelSignIn}>Sign In With Google</button>
    }
    </div>
  );
}

export default Login;
