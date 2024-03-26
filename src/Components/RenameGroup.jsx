
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import React,{useEffect, useRef, useState} from 'react';
import {GroupRenameApi, addNewUser, newGroup, searchUserApi} from '../Services/apiServices'
import { useDispatch, useSelector } from 'react-redux';
import { openCreateGroup,closeCreateGroup, setAddUsertoGroup, toggleGroupName, setGroupRename } from '../redux/chatSlice';
import { Button } from '@mui/material';




function RenameGroup() {

const {selectedChat,groupNameChange}=useSelector((state)=>state.chat);
const token=JSON.parse(localStorage.getItem('token'));
const user=JSON.parse(localStorage.getItem('user'));
const dispatch=useDispatch();
const [name,setName]=useState('');
  


const handleRename=async()=>{
    try {
        const payload={
            chatId:selectedChat._id,
            chatName:name
        }
   dispatch(setGroupRename(name));
   dispatch(toggleGroupName());
        const response=await GroupRenameApi(payload,token);
        console.log(response);
       
        

    } catch (error) {
        console.log(error)
    }
}


  return (
    <>
    {selectedChat&&
      <Dialog
        open={groupNameChange}
        onClose={()=>dispatch(toggleGroupName())}
        fullWidth={true} 
  maxWidth="sm" 
        PaperProps={{
          component: 'form',
         
          onSubmit: (event) => {
            event.preventDefault();
           handleRename();
            
          },
        }}
      ><DialogTitle>Change Group Name</DialogTitle>
        <DialogContent>
          <DialogContentText>
           {selectedChat.chatName}
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="name"
            label="Group Name"
            type="text"
            fullWidth
            variant="standard"
            value={name}
            onChange={(e)=>setName(e.target.value)}
            
            />
   
  
        </DialogContent>
      
       
        <DialogActions>
       
          <Button onClick={()=>dispatch(toggleGroupName())}>Cancel</Button>
          <Button type="submit">Change Name</Button>
        </DialogActions>
      </Dialog>
    }
    </>
  )
}

export default RenameGroup