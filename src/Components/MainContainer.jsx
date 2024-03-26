import React, { useEffect, useState } from 'react'
import './myStyles.css'
import SideBar from './SideBar'
import WorkArea from './WorkArea'
import ChatArea from './ChatArea'
import Welcome from './Welcome'
import CreateGroup from './CreateGroup'
import UserGroups from './UserGroups'
import { Outlet } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setIsSmallScreen,setShowChatArea } from '../redux/chatSlice'
import { io } from "socket.io-client";



function MainContainer() {
 
      
  
  const dispatch = useDispatch();
  const theme=useSelector((state)=>state.chat.theme);
  const isSmallScreen = useSelector(state => state.chat.isSmallScreen);
  const showChatArea = useSelector(state => state.chat.showChatArea);

 


  useEffect(() => {
    const handleResize = () => {
      dispatch(setIsSmallScreen(window.innerWidth < 768)); 
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [dispatch]);

   
  return (
    <div className={`main-container ${theme}`}>
        
        {isSmallScreen&& !showChatArea&&<SideBar />}
        {isSmallScreen&&showChatArea&&<Outlet/>}

        {!isSmallScreen && <SideBar />} 
      {!isSmallScreen && <Outlet />} 
        {/* <SideBar/> */}
        
        {/* <Outlet/> */}
        {/* <UserGroups/> */}
       {/* <CreateGroup/> */}
        
        {/* <ChatArea props={dummy}/> */}
    </div>
  )
}

export default MainContainer