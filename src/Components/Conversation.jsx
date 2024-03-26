import React from 'react'
import './myStyles.css'
import { useNavigate } from 'react-router-dom'
import { setSelectedChat, setShowChatArea } from '../redux/chatSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar } from '@mui/material';
import moment from 'moment';


function ConversationItem({props}) {
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const {isSmallScreen}=useSelector((state)=>state.chat)
   

  const handleNavigation=(user)=>{
    
    
if(isSmallScreen){
  dispatch(setShowChatArea(true));
}

    dispatch(setSelectedChat(user));

    navigate(`chat/${props._id}`)

    
  }


  const renderTimeOrDate = (timestamp) => {
    const messageDate = moment(timestamp);
    const today = moment().startOf('day');
    if (messageDate.isSame(today, 'day')) {
      // If the message was sent today, display only time
      return messageDate.format('HH:mm');
    } else {
      // If the message was sent on a different day, display the date
      return messageDate.format('YYYY-MM-DD');
    }
  };
  
  return (
    <div className='conversation-container' onClick={()=>handleNavigation(props)} >
    
    
    {props.chatName === "sender" ? (
      <>
        {/* <p className='con-icon'>{props?.users[1]?.name.charAt(0)}</p> */}
       <div className='con-icon'> <Avatar alt={props.users[1].name} src="./images/logo.gif" /></div>
         <p className='con-title'>{props?.users[0]?.name}</p>
           <p className='con-latestMessage'>{props?.latestMessage?.content.slice(0,15)}</p>
        <p className='con-timeStamp'>{renderTimeOrDate(props.updatedAt)}</p>
       
         </>
      ) : (
        <>
        {/* <p className='con-icon'>{props.chatName.charAt(0)}</p> */}
        <div className='con-icon'><Avatar alt={props.chatName} src="/static/images/avatar/1.jpg" /></div>
        <p className='con-title'>{props?.chatName}</p>

        <p className='con-latestMessage'>{props?.latestMessage?.content}</p>
        <p className='con-timeStamp'>{renderTimeOrDate(props.updatedAt)}</p>
        </>
      )}
     
        
       
      
    </div>
  )
}

export default ConversationItem