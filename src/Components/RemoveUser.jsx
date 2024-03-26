import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import React,{useEffect, useRef, useState} from 'react';
import {RemoveUserApi, addNewUser, newGroup, searchUserApi} from '../Services/apiServices'
import { useDispatch, useSelector } from 'react-redux';
import { openCreateGroup,closeCreateGroup, setAddUsertoGroup, toggleRemoveUser, removeUserSelectedChat } from '../redux/chatSlice';
import { Button } from '@mui/material';



function RemoveUser() {

const {selectedChat, removeUser}=useSelector((state)=>state.chat);
const token=JSON.parse(localStorage.getItem('token'));
const userId=JSON.parse(localStorage.getItem('user'));
const dispatch=useDispatch();
 
 

const handleRemoveUser=async(user)=>{
    try {
       dispatch(removeUserSelectedChat(user));
       const payload={
        chatId:selectedChat._id,
        userId:user._id
       }
       const response=await RemoveUserApi(payload,token);
       console.log(response);
        
    } catch (error) {
        console.log(error);
        
    }
}
  
  return (
    <>
    {selectedChat&&
      <Dialog
        open={removeUser}
        onClose={()=>dispatch(toggleRemoveUser())}
        fullWidth={true} 
  maxWidth="sm" 
        PaperProps={{
          component: 'form',
         
          onSubmit: (event) => {
            event.preventDefault(); 
           
            
          },
        }}
      ><DialogTitle>Remove User </DialogTitle>
        <DialogContent>
          <DialogContentText>
           Create a New Group
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
            value={selectedChat.chatName}
            InputProps={{ readOnly: true }}
            />          
          {selectedChat?.users?.map((user) => (
                            <div key={user._id}>
                              {userId!==user._id?(
                                <>
                                <span>{user.name}</span>
                                
                                <Button onClick={() => handleRemoveUser(user)}>Remove</Button>
                                </>
                              ):(
                                <span>You--{user.name}</span>
                              )}
                                
                            </div>
                        ))}
           
          
        </DialogContent>
      
       
        <DialogActions>
       
          <Button onClick={()=>dispatch(toggleRemoveUser())}>Cancel</Button>
          
        </DialogActions>
      </Dialog>
    }
    </>
  )
}

export default RemoveUser