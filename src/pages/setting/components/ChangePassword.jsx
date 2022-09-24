import InputPassword from 'components/InputPassword'
import { StyledBox } from 'components/StyledBox'
import StyledButton from 'components/StyledButton'
import React from 'react'
import { changePassword } from 'client/api/firebase'
import { useState } from 'react'

const ChangePassword = () => {
  const [password,setPassword] = useState('');
  const [showPassword,setShowPassword] = useState(false);

  const updatePassword = async () => {
    await changePassword(password)
    .then(() => {
      console.log('Password changed successfully');
    })
    .catch(() => {
      console.log('Failed to change password')
    })
  }

  return (
    <StyledBox>
      <InputPassword
        password={password}
        showPassword={showPassword}
        setPassword={setPassword}
        setShowPassword={setShowPassword}
      />
      <StyledButton onClick={updatePassword}>
        Change Password
      </StyledButton>
    </StyledBox>
  )
}

export default ChangePassword
