/* eslint-disable jsx-a11y/anchor-is-valid */
import { useContext, useState } from 'react'

import {
  signInWithEmail,
  signInWithPopupByPID,
  signInWithPopupRetry,
  emitEmailVerification,
  logOut
} from 'client/api/firebase';

import {
  GoogleAuthProvider,
  GithubAuthProvider,
  FacebookAuthProvider
} from "firebase/auth";

import { useNavigate } from 'react-router';
import { AuthContext } from 'context/AuthContext';
import { FaFacebookF, FaGithub, FaGoogle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import {
  Button,
  TextField,
  Typography,
  ButtonGroup,
} from '@mui/material';

import { StyledBox } from 'components/StyledBox';
import InputPassword from 'components/InputPassword';

export default function Login() {
  const navigate = useNavigate();
  const {dispatch} = useContext(AuthContext)
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [showPassword,setShowPassword] = useState(false);
  const [retryTimes,setRetryTimes] = useState(0);

  const checkVerificationStatus = (user) => {
    if (user.emailVerified) {
      console.log("email verified");
      dispatch({type:"LOGIN",payload:user});
    } else {
      alert("email not verified");
      emitEmailVerification();
      logOut();
    }
    navigate("/");
  }

  const onSignInEmail = async () => {
    // console.log(email,password)


    signInWithEmail (email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        checkVerificationStatus(user);
        setRetryTimes(0);
      })
      .catch((err) => {
        console.log(err.code)
        if (err.customData.email &&
          err.code === 'auth/wrong-password') {
            console.log(err.code)
            setRetryTimes(retryTimes+1);
          }
        // const errorCode = error.code;
        // const errorMessage = error.message;
        // ..
        alert(err)
    });
  }

  const onSignInPopup = async (pid) => {
    let duplicated = false;
    await signInWithPopupByPID(pid)
      .then((result) => {
        // This gives you a GitHub  Access Token. You can use it to access the GitHub  API.
        // const credential = GithubAuthProvider.credentialFromResult(result);
        // const token = credential.accessToken;

        // The signed-in user info.
        const user = result.user;
        checkVerificationStatus(user);
      })
      .catch((err) => {

        if (err.customData.email &&
            err.code === 'auth/account-exists-with-different-credential') {
          // The email of the user's account used.
          duplicated= true;
          console.log("retrying..");
          signInWithPopupRetry(err.customData.email)
          .then((result) => {
            const user = result.user;
            checkVerificationStatus(user);
          })
          // const provider = getFirstSupportedProvider(email);
        }
        // The AuthCredential type that was used.
        // const credential = GithubAuthProvider.credentialFromError(err);
        console.error(err.message);
      });

    if (!duplicated) return;

    await signInWithPopupRetry(email)
    .then((result) => {
      const user = result.user;
      console.log(user);
      checkVerificationStatus(user);
    })
    .catch((err) => {
      console.error(err.message);
    });

  };

  return (
    <StyledBox>
      <Typography variant="h5" textAlign="center">
        <b>Sign In</b>
      </Typography>
        {/* <Typography level="body2">Sign in to continue</Typography> */}
      <TextField
        // html input attribute
        name="email"
        type="email"
        placeholder="johndoe@email.com"
        onChange={e=>setEmail(e.target.value)}
        // pass down to FormLabel as children
        label="Email"
        />
      <InputPassword
        password={password}
        showPassword={showPassword}
        setPassword={setPassword}
        setShowPassword={setShowPassword}
      />
      <Button
        variant='contained'
        color='secondary'
        sx={{
          mt: 1, // margin top
        }}
        onClick={onSignInEmail}
        >
        Log in
      </Button>
      <Typography
        fontSize="sm"
        sx={{ alignSelf: 'center' }}
        >
        Don't have an account?
        then, <Link to="/signup">create one</Link>
      </Typography>
      <ButtonGroup variant="contained" color="primary" aria-label="sso-login" fullWidth>
        <Button startIcon={<FaFacebookF/>} onClick={() => onSignInPopup(FacebookAuthProvider.PROVIDER_ID)}></Button>
        <Button startIcon={<FaGithub/>} onClick={() => onSignInPopup(GithubAuthProvider.PROVIDER_ID)}></Button>
        <Button startIcon={<FaGoogle/>} onClick={() => onSignInPopup(GoogleAuthProvider.PROVIDER_ID)}></Button>
      </ButtonGroup>
    </StyledBox>
  )
}
