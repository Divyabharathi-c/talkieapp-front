import React, { useEffect, useState } from 'react'
import './myStyles.css'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import NightlightIcon from '@mui/icons-material/Nightlight';
import {  Button, IconButton, Menu, MenuItem } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ConversationItem from './Conversation';
import { useDispatch, useSelector } from 'react-redux';
import { createChat, getAllChat, searchUserApi } from '../Services/apiServices';
import { openCreateGroup, setsearchUsers, toggelSearch, toggleTheme } from '../redux/chatSlice';
import { setMyChats } from '../redux/chatSlice';
import {  useNavigate } from 'react-router-dom';
import Pill from './Pill';
import UserGroups from './UserGroups';
import SearchUser from './SearchUser';
import { ExitToApp } from '@mui/icons-material';



function SideBar() {

const {myChats}=useSelector((state)=>state.chat);
const token=JSON.parse(localStorage.getItem('token'));
const searchUsers=useSelector((state)=>state.chat.searchUsers)
const navigate=useNavigate();
const [user,setUser]=useState(null);
const dispatch=useDispatch();
  const [open, setOpen] = useState(false)

  const handleClickOpen = () => {
    dispatch(openCreateGroup());
  };

  const handleClose = () => {
    setOpen(false);
  };

 

  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseUser = () => {
    setAnchorEl(null);
  };


  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllChat(token);
        console.log(data);
        dispatch(setMyChats(data.data));
      } catch (error) {
        console.log(error);
      }
    };
  
    if(!user){
    fetchData();}
  }, [ user,dispatch]);

  useEffect(()=>{
    if (user) {
      const filteredChats = myChats.filter(chat => {
        if (chat.isGroupChat || chat.chatName !== "sender") {
          return chat?.chatName?.toLowerCase().includes(user?.toLowerCase());
        } else {
          const firstUserName = chat.users[0].name.toLowerCase();
          return chat?.chatName?.toLowerCase().includes(user?.toLowerCase()) ||
            firstUserName.includes(user?.toLowerCase());
        }
      });
  
      // console.log(filteredChats)
      dispatch(setMyChats(filteredChats));
    } 

  },[user])
  
  
  



const logout=()=>{
  localStorage.removeItem('token')
  localStorage.removeItem('user');
  navigate('/');
}
  
  
  return (
    <div className='sidebar-container'>
   <div className='sb-header'>
   <div>
   {/* <IconButton onClick={handleOpenMenu}>
   <AccountCircleIcon/>
   </IconButton> */}
   <img src="/images/logo.gif" alt="Logo" style={{height:'50px',width:'50px', margin:'10px', borderRadius:'50%',cursor: 'pointer'}}/>
   <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleCloseUser}
        >
          {/* Menu Items */}
          <MenuItem onClick={logout}>Logout</MenuItem>
          
        </Menu>
   </div>
   <div>
   <IconButton onClick={()=>dispatch(toggelSearch())}>
   <PersonAddAlt1Icon/>
   </IconButton>
   {/* <IconButton>
   <GroupAddIcon/>
   </IconButton> */}
   <IconButton onClick={handleClickOpen}>
   <AddCircleIcon/>
   </IconButton>
   <IconButton onClick={()=>dispatch(toggleTheme())}>
   <NightlightIcon/>
   </IconButton>
   <IconButton onClick={handleOpenMenu}>
      <ExitToApp/>
    </IconButton>
   </div>
   </div>
   <div className='sb-searchBar'>
   <IconButton>
    <SearchIcon/>
    </IconButton>
    <input type='text' placeholder='search' className='searchbox'

      onChange={(e)=>setUser(e.target.value)}
     
    />
    
   </div>
 
   <div className='sb-conversations'>
   {myChats.map((ele,i)=>{
    
    return <ConversationItem props={ele} key={ele._id}  />
   })}
   </div>
   
  <UserGroups/>
  <SearchUser/>
   

    </div>
  )
}

export default SideBar