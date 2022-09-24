import { TextField } from '@mui/material';
import { resetPassword } from 'client/api/firebase';
import { StyledBox } from 'components/StyledBox'
import StyledButton from 'components/StyledButton';
import React from 'react'
import { useState } from 'react';

const ResetPassword = () => {
  const [email,setEmail] = useState('');

  const Reset = async () => {
    await resetPassword(email)
      .then(() => {
        // Password reset email sent!
        console.log('Password reset email sent!');
        // ..
      })
      .catch((error) => {
        // const errorCode = error.code;
        // const errorMessage = error.message;
        // ..
      });
  }

  return (
    <StyledBox>
      <TextField
        // html input attribute
        name="email"
        type="email"
        placeholder="johndoe@email.com"
        onChange={e=>setEmail(e.target.value)}
        // pass down to FormLabel as children
        label="Email"
        />
      <StyledButton onClick={Reset}>
        Reset Password
      </StyledButton>

    </StyledBox>
  )
}

export default ResetPassword
