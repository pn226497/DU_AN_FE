import React, {  useState } from 'react'
import styled from 'styled-components'
import Button from '@mui/material/Button'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { setLocalStorage } from '../utils/localStorage';
import { useNavigate } from 'react-router-dom';
import { getFirestore, collection, addDoc, query, where, getDocs } from "firebase/firestore";
import { Snackbar } from '@mui/material';
import {useDispatch} from 'react-redux';
import {updateUser} from '../features/userSlice'
import { auth, app } from '../firebase';

function LoginComp() {
    const [showLoginManual, setShowLoginManual] = useState(false);
    const [showSignup, setShowSignup] = useState(false);
    const [loginInfo, setLoginInfo] = useState({ username: '', password: '' });
    const [signUpInfo, setSignUpInfo] = useState({ username: '', password: '' });
    const [notify, setNotify] = useState({ show: false, message: '' })
    const db = getFirestore(app)
    const useRef = collection(db, 'User')

    const handleInputSignIn = (e) => {
        setLoginInfo({ ...loginInfo, [e.target.name]: e.target.value })
    };

    const handleInputSignup = (e) => {
        setSignUpInfo({ ...signUpInfo, [e.target.name]: e.target.value })
    };

    const handleShowLoginManual = (value) => {
        setShowLoginManual(value)
        if (value === false) {
            setShowSignup(value)
        }
    }

    const handleShowSignup = (value) => {
        setShowSignup(value)
    }

    const handleSignUp = (dbRef, signUpInfo) => {
        // create user in firebase auth and firestore
        addDoc(dbRef, signUpInfo)
            .then((docRef) => {
                setNotify({ ...notify, show: true, message: 'Sign in successfully' })
                setShowSignup(false)
            })
            .catch((error) => {
                setNotify({ ...notify, show: true, message: 'Error sign up' })

            })
    }

    // const handleSignIn = (loginInfo) => {
    //     const { username, password } = loginInfo;
    //     let flag = false;
    //     onSnapshot(useRef, (docsSnap) => {
    //         docsSnap.forEach((doc) => {
    //             if (
    //                 doc.data().username === username &&
    //                 doc.data().password === password
    //             ) {
    //                 setNotify({ ...notify, show: true, message: 'Sign in successfully' })
    //                 flag = true;
    //                 navigate('/chat')
    //                 setLocalStorage('chatapp', 'signinmanual')
    //             }
    //             if (!flag) {
    //                 setNotify({ ...notify, show: true, message: 'Error sign up' })
    //             }
    //         })
    //     })
    // }

    const handleSignIn = async (loginInfo) => {
     
        const {username, password} = loginInfo;
        let flag = false;
        const q= query(
            useRef,
            where("username", "==", username),
            where("password", "==", password)
        );
        const docSnap = await getDocs(q);
        docSnap.forEach((doc) => {
            if (doc.data()) {
                flag = true;
                setNotify({ ...notify, show: true, message: 'Sign in successfully' })
                navigate('/chat')
                setLocalStorage('chatapp', 'signinmanual')
                console.log(doc.data());
            }
        });
        if(!flag)
        setNotify({...notify,show :true,message:'Username or Password is wrong'})
    }


    const navigate = useNavigate();
    const dispatch = useDispatch()
    const handleLoginGoogle = async () => {
        const ggProdiver = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, ggProdiver)
            const {email, displayName, photoURL} = result?.user;
            dispatch(updateUser({email, displayName, photoURL}))
            console.log(result)
            setLocalStorage('chatapp', {email, displayName, photoURL});
            navigate('/chat')
        }
        catch (e) {
            console.log('error', e);
        }
    }

    return (
        <LoginContainer>
            <LoginWrapper>
                <Snackbar
                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                    open={notify.show}
                    message={notify.message}
                    onClose={() => {
                        setNotify({ ...notify, show: false });
                    }}
                    key={{ vertical: 'top' } + { horizontal: 'right' }}
                />
                <img src='https://cdn.cdnlogo.com/logos/s/40/slack-new.svg' alt='slack-logo' />
                {showLoginManual ? (
                    <>
                        {showSignup ? (
                            <>
                                <H3>Sign up</H3>
                                <Form>
                                    <Input
                                        value={signUpInfo.username}
                                        placeholder='Username'
                                        name='username'
                                        onChange={handleInputSignup}
                                    />
                                    <Input
                                        value={signUpInfo.password}
                                        placeholder='Password'
                                        name='password'
                                        onChange={handleInputSignup}
                                    />
                                    <Button
                                        variant='outlined'
                                        onClick={() => handleSignUp(useRef, signUpInfo)}
                                    >
                                        SIGN UP
                                    </Button>
                                    <Button
                                        variant='outlined'
                                        onClick={() => handleShowLoginManual(false)}
                                    >
                                        Back
                                    </Button>
                                </Form>
                            </>
                        ) : (
                            <>
                                <H3>sign in</H3>
                                <Form>
                                    <Input
                                        value={loginInfo.username}
                                        placeholder='Username'
                                        name='username'
                                        onChange={handleInputSignIn}
                                    />
                                    <Input
                                        value={loginInfo.password}
                                        placeholder='Password'
                                        name='password'
                                        onChange={handleInputSignIn}
                                    />
                                    <Button
                                        variant='outlined'
                                        onClick={() => handleSignIn(loginInfo)}
                                    >
                                        SIGN IN{' '}
                                    </Button>
                                    <Button
                                        variant='outlined'
                                        onClick={() => handleShowSignup(true)}
                                    > {' '}
                                        Sign up{' '}
                                    </Button>
                                    <Button
                                        variant='outlined'
                                        onClick={() => handleShowLoginManual(false)}
                                    >
                                        Back
                                    </Button>
                                </Form>
                            </>
                        )}
                    </>
                ) : (
                    <ContentWrapper>
                        <h1>Sign in to slack</h1>
                        <p>slack.com</p>
                        <ButtonWrapper>
                            <Button
                                variant='outlined'
                                onClick={() => handleShowLoginManual(true)}
                            >
                                Sign in manually
                            </Button>
                        </ButtonWrapper>
                        <ButtonWrapper>
                            <Button
                                variant='outlined'
                                onClick={handleLoginGoogle}
                            >
                                Sign in with google
                            </Button>
                        </ButtonWrapper>
                    </ContentWrapper>
                )}
            </LoginWrapper>
        </LoginContainer>
    )
}

export default LoginComp

const LoginContainer = styled.div`
    background-color: #f8f8f8;
    height: 100vh;
    display: grid;
    place-items: center;
`;

const LoginWrapper = styled.div`
    width:40vh;
    padding: 100px;
    background-color: white;
    border-radius: 10px ;
    
`;
const ContentWrapper = styled.div`
    text-align: center
`;
const ButtonWrapper = styled.div`
    margin:5px
`
const Form = styled.form`
 display: flex;
 flex-direction:column;
 
`

const Input = styled.input`
  margin: 20px;
  border-radius: 3px;
  height: 20px;
  border: 1px solid rgba(25, 118, 210, 0.5);
  padding:5px;
  &:nth-child(2) {
    margin-top: 0px;
  }

`;

const H3 = styled.h3`
text-align: center;
margin-top: 30px
`