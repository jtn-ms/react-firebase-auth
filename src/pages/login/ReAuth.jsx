import InputPassword from 'components/InputPassword'
import { StyledBox } from 'components/StyledBox'
import StyledButton from 'components/StyledButton';
import React, { useState } from 'react'
import {
  reauthenticate,
  newEmailCredential,
  getUser
} from 'client/api/firebase';
import { useContext } from 'react';
import { AuthContext } from 'context/AuthContext';
import { useNavigate } from 'react-router';
import { Box } from '@mui/material';
import Navbar from 'components/Navbar';

function ReAuth() {
  const {dispatch} = useContext(AuthContext);
  const navigate = useNavigate();
  const [password,setPassword] = useState('');
  const [showPassword,setShowPassword] = useState(false);


  const onClick = async () => {
    const credential = newEmailCredential(password);
    await reauthenticate(credential)
    .then(() => {
      const user = getUser();
      console.log("reauthenticate successfully");
      console.log(user)
      dispatch({type:"LOGIN",payload:user});
      navigate("/setting");
    })
    .catch((err) => {
      alert(err);
    })
  }

  return (
    <Box>
      <Navbar/>
      <StyledBox>
        <InputPassword
          password={password}
          showPassword={showPassword}
          setPassword={setPassword}
          setShowPassword={setShowPassword}
        />
        <StyledButton onClick={onClick}>
          Authenticate
        </StyledButton>
      </StyledBox>
    </Box>
  )
}

export default ReAuth