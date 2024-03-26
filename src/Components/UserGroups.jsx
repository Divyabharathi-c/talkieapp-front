import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import React,{useEffect, useRef, useState} from 'react';
import {newGroup, searchUserApi} from '../Services/apiServices'
import { useDispatch, useSelector } from 'react-redux';
import { openCreateGroup,closeCreateGroup } from '../redux/chatSlice';
import { Button } from '@mui/material';
import Pill from './Pill';



function UserGroups() {

const {createGroup}=useSelector((state)=>state.chat);
const token=JSON.parse(localStorage.getItem('token'));
// const users=JSON.parse(localStorage.getItem('users'));
const input=useRef(null);
const dispatch=useDispatch();
  const [groupUser,setGroupUser]=useState({name:'',users:[]});
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
    }

if (input.current) {
  input.current.focus();
}
  
  setSuggestion([]);
  setsearch('');

 } 


 const handleCreateGroup=async()=>{

  try {
  const response=await newGroup(groupUser,token);
  console.log(response);
    
  } catch (error) {
    console.log(error);
    
  }
 }

 

  useEffect(()=>{
    const fetchData=async()=>{
      try {
        
        const data=await searchUserApi(search,token);
        console.log(data.data)
        const filteredData = data.data.filter(users => {
          return  !groupUser.users.some(selectedUser => selectedUser._id === users._id);
      });
        
        console.log("searching")
          setSuggestion([...filteredData])
        
      } catch (error) {
        console.log(error);
      }
    }
    
    if(search){
      fetchData();
    }
  
  },[search])  

  return (
    <>
      <Dialog
        open={createGroup}
        onClose={()=>dispatch(closeCreateGroup())}
        fullWidth={true} 
  maxWidth="sm" 
        PaperProps={{
          component: 'form',
         
          onSubmit: (event) => {
            event.preventDefault();
            
            
            dispatch(closeCreateGroup());
            handleCreateGroup();
          },
        }}
      ><DialogTitle> Create a New Group</DialogTitle>
        <DialogContent>
          {/* <DialogContentText>
           Create a New Group
          </DialogContentText> */}
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
            value={groupUser.name}
            onChange={(e)=>setGroupUser({...groupUser,[e.target.name]: e.target.value })}
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
   
   {suggestion.length>0&&suggestion?.map((ele)=> (
   
     <li key={ele._id}  onClick={()=>handleSuggestion(ele)}>{ele.name}--
     {ele.email}
     </li>
   ))}
 </ul>
        </DialogContent>
      
       
        <DialogActions>
       
          <Button onClick={()=>dispatch(closeCreateGroup())}>Cancel</Button>
          <Button type="submit">Create</Button>
        </DialogActions>
      </Dialog>

    </>
  )
}

export default UserGroups