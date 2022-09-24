/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState} from 'react';
import { signUpWithEmail, emitEmailVerification } from 'client/api/firebase';
import { useNavigate } from 'react-router';
import { promptChkPwd,isValidPassword,isValidEmail } from 'utils/validate/form';
// import {FaGoogle,FaLinkedin,FaFacebookF,FaTwitter} from 'react-icons/fa';
// import { BsFillEyeFill,BsFillEyeSlashFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { StyledBox } from 'components/StyledBox';

import {
  TextField,
  Typography
} from '@mui/material';

import InputPassword from 'components/InputPassword';
import StyledButton from 'components/StyledButton';

export default function SignUp() {
  const navigate = useNavigate();
  const [showPassword,setShowPassword] = useState(false);
  const [user,setUser] = useState({
    username: '',
    email: '',
    password: '',
  });

  const isValidInput = () => {
    if (!user.username ||
      !user.email||
      !user.password
      ) {
        return [false,"Please fill in all required fields."];
    }

    if (!isValidEmail(user.email)) {
      return [false,"Please enter an valid email address."];
    }

    if (!isValidPassword(user.password)) {
      return [false,promptChkPwd(user.password)];
    }

    return [true,"Success!"];
  };

  const onSignUpEmail = e => {
    e.preventDefault();

    signUpWithEmail(user.email, user.password)
      .then(() => {
        // Send a email verification
        emitEmailVerification();
        alert("verification email sent")
        navigate('/');
      })
      .catch((err) => {
        // const errorCode = err.code;
        const errorMessage = err.message;
        // ..
        if (err.code === 'auth/email-already-in-use') {
            navigate('/');
        }
        alert(errorMessage);
      });
  }

  const onChange = e => {
    let {name, value} = e.target;
    setUser({...user,[name]:value});
  }

  const setPassword = (value) => {
    setUser({...user,password:value});
  }

  return (
    <StyledBox>
      <Typography variant="h5" sx={{textAlign: 'center'}}>
        <b>Sign Up</b>
      </Typography>
      {/* <Typography level="body2">Sign in to continue</Typography> */}
    <TextField
      // html input attribute
      name="username"
      type="username"
      placeholder="john doe"
      onChange={e=>onChange(e)}
      error={user.username ? false : true}
      // pass down to FormLabel as children
      label="username"
      />
    <TextField
      // html input attribute
      name="email"
      type="email"
      placeholder="johndoe@email.com"
      onChange={e=>onChange(e)}
      error={isValidEmail(user.email) ? false : true}
      helperText="Please enter your email address"
      // pass down to FormLabel as children
      label="Email"
      />

    <InputPassword
          password={user.password}
          showPassword={showPassword}
          setPassword={setPassword}
          setShowPassword={setShowPassword}
        />
    <StyledButton onClick={onSignUpEmail} disabled={!isValidInput()[0]}>
      Sign Up
    </StyledButton>
    <Typography
      fontSize="sm"
      sx={{ alignSelf: 'center' }}
      >
      Already have an account?
      or <Link to="/login">login</Link>
    </Typography>
    </StyledBox>
  )
}
