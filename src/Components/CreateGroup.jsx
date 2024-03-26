import { IconButton } from '@mui/material'
import React from 'react'
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import './myStyles.css'

function CreateGroup() {
  return (
    <>
    <div className='create-group-container'>    
    <div className='create-group'>
      <input type='text' placeholder='Enter a Group Name' className='sb-searchBar'/>
      <IconButton>

      <DoneOutlineIcon/>
        
      </IconButton>
    </div>
    <div className='create-group'>
    <input type='text' placeholder='add a member' className='sb-searchBar'/>
    </div>
    </div>

    </>
  )
}

export default CreateGroup