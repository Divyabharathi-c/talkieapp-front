import React, { useEffect, useRef, useState } from 'react'
import './myStyles.css'
import moment from 'moment';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import { Avatar, IconButton, Menu, MenuItem } from '@mui/material';
import MessagefromSelf from './MessagefromSelf';
import MessagetoOthers from './MessagetoOthers';
import { addNewUser, createChat, getChat, sendMessage } from '../Services/apiServices';
import { useParams } from 'react-router-dom';
import { io } from "socket.io-client";
import { useDispatch, useSelector } from 'react-redux';
import { setAllMessages, setEmpty, setSelectedChat, setSingleMessage,setShowChatArea,setNewMessage, setAddUsertoGroup, toggleRemoveUser, toggleGroupName, updateMessageContent } from '../redux/chatSlice';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import UserGroups from './UserGroups';
import AddUser from './AddUser';
import RemoveUser from './RemoveUser';
import RenameGroup from './RenameGroup';
import { nanoid } from 'nanoid';
import { formatDate } from '../Services/helper';
import { toast } from 'react-toastify';

const socket = io('https://talkieapp-back.onrender.com');
function ChatArea() {
  

  const dispatch = useDispatch();
  const {allMessages,addUserToGroup,message}=useSelector((state)=>state.chat);
  const {selectedChat,showChatArea}=useSelector((state)=>state.chat);
  const token=JSON.parse(localStorage.getItem('token'));
  const id=JSON.parse(localStorage.getItem('user'));
  const messagesEndRef = useRef(null);
  const [isTyping, setIsTyping] = useState(false);      

  const {chatId}=useParams();
 
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
 
 
  const dummy={
    name:"hello",
      lastMessage:"hi1",
      timeStamp:"today"

  }
 

const handleSend=async()=>{
  try {

    if (!message.content.trim()) {
      
      console.log("no message")
      return;
    }
    // console.log(token)
    let resetCopy={...message}
   
    
    console.log(message)
    let msg={...resetCopy,_id:chatId,sender:{_id:id}}
    
    dispatch(setSingleMessage(msg));
    
    scrollToBottom(); 
   
    socket.emit("new message",msg)
   dispatch(updateMessageContent(''));
    
    const data=await sendMessage({...resetCopy,chatId:chatId},token);
    console.log(data)
    
  } catch (error) {
    console.log(error)
    
  }
}

  useEffect(()=>{
    const fetchChat=async()=>{
      try {
        const token=JSON.parse(localStorage.getItem('token'));
        dispatch(setEmpty());
        const data=await getChat(chatId,token);
        console.log(data.data);
       
        dispatch(setAllMessages(data.data));
        dispatch(setSelectedChat(data.data[0].chat));
        
       
        socket.emit("setup", { data: { id: id } }); 
       
      } catch (error) {
        console.log(error)
      }
    }
    fetchChat();
    
    return ()=>{
      dispatch(setEmpty());
    }
    
  },[chatId]);

  useEffect(() => {
    socket.emit("join chat", chatId);

    socket.on("message received", (msg) => {
      toast.success(`new message `, {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      console.log(msg,"checking")
      dispatch(setNewMessage(msg));
      dispatch(setSingleMessage(msg));
      
    
    });
   

    return () => {
      socket.off("message received"); // Cleanup event 
    };
  }, [chatId]);

  

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView()
  };


  useEffect(() => {
    const typingTimeout = setTimeout(() => {
      setIsTyping(false);
      socket.emit("typing", { chatId, isTyping: false }); // Emit typing status
    }, 1000); // Change this delay as needed
    return () => clearTimeout(typingTimeout);
  }, [message.content]);

  const handleUserTyping = () => {
    setIsTyping(true);
    socket.emit("typing", { chatId, isTyping: true }); // Emit typing status
  };

  
  useEffect(() => {
    // Listen for "typing" events from the server
    socket.on("typing", ({ chatId, isTyping }) => {
        // Check if the typing event is for the current chat
        // Assuming userId is the socket ID of the user typing 
            setIsTyping(isTyping);
           console.log("typing")
        
    });
    // Clean up listener when component unmounts
    return () => {
        socket.off("typing");
    };
}, [chatId, selectedChat]);

//scroll to bottom to see last message
  useEffect(() => {
     scrollToBottom();     
  }, [allMessages]);

  const handleAddUser=()=>{
    dispatch(setAddUsertoGroup());
    handleClose();}

  const handleRemoveUser=()=>{
    dispatch(toggleRemoveUser());
    handleClose(); }
  
  const handleGroupNameChange=()=>{
    dispatch(toggleGroupName());
    handleClose();}

  const handleTyping = (e) => {
    if (e.key === "Enter") {
      handleSend();
      return
    }
    dispatch(updateMessageContent((e.target.value)));};

  useEffect(() => {
    socket.on("onlineUsers", (users) => {
      console.log("Online Users:", users);

      
    });
    return () => {
      // Cleanup function to remove the event listener when the component unmounts
      socket.off("onlineUsers");
    };
  }, []);


  return (
    <div className='chatarea-container'>
        <div className='chatheader-container'>
        {showChatArea&&<IconButton onClick={()=>dispatch(setShowChatArea(false))}>
            <KeyboardBackspaceIcon/>
          </IconButton>}
          {/* <p className='con-icon'>{!selectedChat?.isGroupChat &&<img />}</p> */}
        <Avatar alt="Remy Sharp" src="./images/logo.gif" />
           
          <div className='header-text'>
            <p className=''>{selectedChat.chatName!=='sender'?
            (selectedChat?.chatName): 
             (selectedChat &&selectedChat.users?.length>0&&selectedChat?.users[1]?.name)}</p>
            <p className='con-timeStamp'>{isTyping?("typing"):(dummy.timeStamp)}</p>
          </div>
          <IconButton onClick={handleClick}>
            <MoreHorizIcon/>
          </IconButton>
          {selectedChat.chatName!=='sender'&&
          <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <MenuItem onClick={handleAddUser}>Add a User</MenuItem>
          <MenuItem onClick={handleRemoveUser}>Remove User</MenuItem>
          <MenuItem onClick={handleGroupNameChange}>Change Group Name</MenuItem>
        </Menu>
          }
        </div>
        <div className='message-container' >
         {allMessages.length>0 &&allMessages.map((ele,index)=>{
          // Calculate the date for the current message
      const currentDate = formatDate(ele.createdAt);
// Determine if it's a new date compared to the previous message
const previousMessage = index > 0 ? allMessages[index - 1] : null;
const previousDate = previousMessage ? formatDate(previousMessage.createdAt) :null;
const isNewDate = currentDate !== previousDate || index === 0; // Add index === 0 check for the first message

// Check if it's the last message
const isLastMessage = index === allMessages.length - 1;
  return (
          <div ref={messagesEndRef}  key={nanoid()}>
          {isNewDate && <div className="date-header">{currentDate}</div>}          
          
          {ele.sender._id===id?(<MessagefromSelf content={ele} />)
         :
         (<MessagetoOthers content={ele}  />)}
         </div>
         )})}
        </div>
        <div className='input-container'> 
        <input type='text' placeholder='Type a Message' className='searchbox'
          value={message?.content||""}
          onChange={(e) => dispatch(updateMessageContent(e.target.value))}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
      handleSend();}
    }}
        />
        <IconButton onClick={()=>handleSend()}
        >
          <SendIcon/>
        </IconButton>
        </div>
       <AddUser/>
       <RemoveUser/>
       <RenameGroup/>
    </div>
  )
}

export default ChatArea