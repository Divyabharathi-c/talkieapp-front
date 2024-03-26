import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import React,{useEffect, useRef, useState} from 'react';
import {addNewUser, newGroup, searchUserApi} from '../Services/apiServices'
import { useDispatch, useSelector } from 'react-redux';
import { openCreateGroup,closeCreateGroup, setAddUsertoGroup } from '../redux/chatSlice';
import { Button } from '@mui/material';
import Pill from './Pill';



function AddUser() {

const {selectedChat, addUserToGroup}=useSelector((state)=>state.chat);
const token=JSON.parse(localStorage.getItem('token'));
const user=JSON.parse(localStorage.getItem('user'));
const input=useRef(null);
const dispatch=useDispatch();
  const [groupUser,setGroupUser]=useState({users:[]});
  const [newUser,setNewUser]=useState({users:[]});
  const [search, setsearch] = useState('');
const [suggestion,setSuggestion]=useState([]);




const handleKeyDown=(e)=>{

  if(e.key=='Backspace' && e.target.value=='' && groupUser.users.length>0){
    setGroupUser(prevState => ({
      ...prevState,
      users: prevState.users.slice(0, -1) // Remove the last element
  }));
}
}

const handleSuggestion=(ele)=>{
  
  const isUserExists = groupUser.users.some((users) => users._id === ele._id);

   if (!isUserExists) {
        setGroupUser(prevState => ({
            ...prevState,
            users: [...prevState.users, ele]
        }));
        setNewUser({users:[ele]});
    }

if (input.current) {
  input.current.focus();
}

  setSuggestion([]);
  setsearch('');

 } 


 useEffect(() => {
   
  const filtered=selectedChat?.users?.filter((ele)=>ele._id!==user);
  setGroupUser({ users: selectedChat?.users ? [...filtered] : [] });


  
 }, [addUserToGroup])
  
const handleAdduser=async()=>{
  try {
   
   const payload={
    chatId:selectedChat._id,
    userId:newUser.users[0]._id
   }
  
    const response=await addNewUser(payload,token);
    console.log(response);

  } catch (error) {
    console.log(error);
    
  }
}

 

  useEffect(()=>{
    const fetchData=async()=>{
      try {
        
        const data=await searchUserApi(search,token);
        console.log(user)
        const filteredData = data.data.filter(users => {

         // Check if the user is already in the group
        const isInGroup = groupUser.users.some(groupUser => groupUser._id === users._id);
        // Exclude the logged-in user
        const isNotLoggedInUser = users._id !== user; // Replace user._id with the actual logged-in user ID
        
        // Only include users who are not in the group and are not the logged-in user
        return !isInGroup && isNotLoggedInUser;
      });
        
        console.log("searching")
          setSuggestion([...filteredData])
        
      } catch (error) {
        console.log(error);
      }
    }
    console.log(selectedChat)
    if(search){
      fetchData();
    }
  
  },[search, groupUser.users])  

  return (
    <>
    {selectedChat&&
      <Dialog
        open={addUserToGroup}
        onClose={()=>dispatch(setAddUsertoGroup())}
        fullWidth={true} 
  maxWidth="sm" 
        PaperProps={{
          component: 'form',
         
          onSubmit: (event) => {
            event.preventDefault();
            handleAdduser();
            
            dispatch(setAddUsertoGroup());
            
          },
        }}
      ><DialogTitle>Add a User to Group</DialogTitle>
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

          
           <TextField
           ref={input}
            autoFocus
          
            margin="dense"
            id="users"
            name="users"
            label="Users"
            type="text"
            fullWidth
            variant="standard"
            value={search}
            onKeyDown={handleKeyDown}
            onChange={(e) => setsearch(e.target.value)}  
            InputProps={{
        startAdornment: (
            <span className="start-adornment">{groupUser.users.length>0 &&groupUser.users.map((ele)=>{
             return <Pill  name={ele.name}/>
            })} </span>
        ),
        style: { position: 'relative',width:'auto' }
    }}         
    className="unique-textfield"
          /> 
           <ul className='suggestion-list'>
   
   {suggestion&&suggestion.length>0&&suggestion?.map((ele)=> (
   
     <li key={ele._id}  onClick={()=>handleSuggestion(ele)}>{ele.name}--
     {ele.email}
     </li>
   ))}
 </ul>
        </DialogContent>
      
       
        <DialogActions>
       
          <Button onClick={()=>dispatch(setAddUsertoGroup())}>Cancel</Button>
          <Button type="submit">Add User</Button>
        </DialogActions>
      </Dialog>
    }
    </>
  )
}

export default AddUser