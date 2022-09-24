import { TextField } from '@mui/material';
import { changeEmail } from 'client/api/firebase';
import { StyledBox } from 'components/StyledBox'
import StyledButton from 'components/StyledButton';
import React from 'react'
import { useState } from 'react';

const ChangeEmailAddr = () => {
  const [email,setEmail] = useState('');

  const updateEmail = async () => {
    await changeEmail(email)
      .then(() => {
        // Email updated!
        console.log('email updated!');
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
      <StyledButton onClick={updateEmail}>
        Change Email
      </StyledButton>

    </StyledBox>
  )
}

export default ChangeEmailAddr