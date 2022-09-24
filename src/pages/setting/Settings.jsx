import { Box, Grid} from '@mui/material'
import Navbar from 'components/Navbar'
import React, { useMemo } from 'react'
import Sidebar from './components/Sidebar'
import ReAuth from '../login/ReAuth'

import ChangePassword from './components/ChangePassword'
import ChangeEmailAddr from './components/ChangeEmailAddr'
import DeleteAccount from './components/DeleteAccount'
import ResetPassword from './components/ResetPassword'
import { useState,useContext } from 'react'
import { AuthContext } from 'context/AuthContext';
import { useEffect } from 'react'


function Settings() {
  const {currentUser} = useContext(AuthContext);
  const [selection, setSelection] = useState(-1);
  const onSelect = (option) => {
    setSelection(option);
  }

  const dialog = useMemo(()=>{
    switch (selection) {
      case 0:
        return <ChangePassword/>;
      case 1:
          return <ChangeEmailAddr/>;
      case 2:
          return <ResetPassword/>;
      case 3:
        return <DeleteAccount/>;
      default:
        break;
    }
  },[selection]);

  useEffect(()=>{

  },[currentUser])

  const isRecentlyLogin = () => {
    let lastLoginTime = Object.keys(currentUser).includes("metadata")?currentUser.metadata.lastLoginAt: currentUser.lastLoginAt
    const loginTime = new Date(Number(lastLoginTime));
    const now = new Date();
    const diffMin = Math.ceil((now.getTime() - loginTime.getTime()) / (1000 * 60));
    if (diffMin < 10) {
      return true;
    }
    return false;
  }

  if (!isRecentlyLogin()) {
    return (
        <ReAuth/>
    )
  }

  return (
    <Box>
      <Navbar/>
      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
          <Sidebar onSelect={onSelect}/>
        </Grid>
        <Grid item xs={12} md={9}>
          {
            dialog
          }
        </Grid>
      </Grid>
    </Box>
  )
}

export default Settings