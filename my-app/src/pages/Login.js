import React from 'react'
import LoginComp from '../components/Login'
import { auth, GoogleAuthProvider, signInWithPopup} from '../firebaseConf'
import { setLocalStorage } from '../utils/localStorage';
import { useNavigate } from 'react-router-dom';
import {useDispatch} from 'react-redux'
import { updateUser } from '../features/userSlice';

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const handleLoginGoogle = async () => {
    const ggProvider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, ggProvider );
      const { email, displayName, photoURL } = result.user;
      dispatch(updateUser({email, displayName, photoURL}));
      setLocalStorage('chatapp',{email, displayName, photoURL});
      navigate('/chat');
    } catch (e) {
      console.log('Error', e)
    } 
  };
   
  return (
    <>
      <LoginComp handleLoginGoogle= {handleLoginGoogle}/>
    </>
  )
}

export default Login