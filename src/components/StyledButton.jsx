import { Button } from '@mui/material'
import React from 'react'

const StyledButton = ({children, onClick,...props}) => {
  return (
    <Button
      variant='contained'
      color='secondary'
      sx={{
        mt: 1, // margin top
      }}
      onClick={onClick}
      {...props}
      >
      {children}
  </Button>
  )
}

export default StyledButton
