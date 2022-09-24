import { Box, Button } from '@mui/material'
import React from 'react'
import { deleteAccount} from 'client/api/firebase'
import { useNavigate } from 'react-router-dom';

function DeleteAccount() {
  const navigate = useNavigate();

  const deleteProfile = () => {
    let success = false;
    deleteAccount()
    .then(() =>{
      success = true;
      localStorage.removeItem('user');
      localStorage.removeItem('user');
      window.location.href = '/';
    })
    .catch(err => {
      if (err.code === 'auth/requires-recent-login') {
        navigate("/auth");
      }
      console.log(err);
    })

    if (!success) return;

  }

  return (
    <Box sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
    }}>
      <Button
        variant='contained'
        color='secondary'
        sx={{
          mt: 1, // margin top
        }}
        onClick={deleteProfile}
        >
        Delete Account
      </Button>
    </Box>
  )
}

export default DeleteAccount