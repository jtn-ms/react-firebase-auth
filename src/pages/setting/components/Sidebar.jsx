import React from 'react'
import { Divider, IconButton, List,  ListItemButton, ListItemText } from '@mui/material'
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const style = {
  width: '100%',
  // maxWidth: 360,
  marginLeft: 1,
  bgcolor: 'background.paper',
  marginTop: 1,
};

const options = [
  "Change Password",
  "Change Email",
  "Forget Password",
  "Delete Account",
]

const ListItemEx = ({idx,onSelect}) => {
  return (
    <ListItemButton onClick={()=>onSelect(idx)}>
      <ListItemText primary={options[idx]}/>
      <IconButton>
        <ChevronRightIcon/>
      </IconButton>
    </ListItemButton>
  )
}



const Sidebar = ({onSelect}) => {
  return (
    <List sx={style} component="nav" aria-label="mailbox folders">
      {
        options.map((_, index) => (
          <div key={`selection_${index}`}>
            <ListItemEx idx={index} onSelect={onSelect}/>
            {index < options.length-1? <Divider />:null}
          </div>
        ))
      }
    </List>
  )
}

export default Sidebar
