import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
    name: 'chat',
    initialState:{
        user:{
            token:localStorage.getItem('token')||null,
            email:null
        },
        theme: 'light',
        isSmallScreen: window.innerWidth <= 768,
        showChatArea: false,
        createGroup:false,
        addUserToGroup:false,
        removeUser:false,
        searchPage:false,
        myChats: [],
        searchUsers: [],
        selectedChat:[],
        selectUser: "",
        selectForGrp: [],
        allMessages: [],
        message:{content:''},
        newArrivalMessage: {},
        groupNameChange:false
    },

    reducers:{
        setIsSmallScreen: (state, action) => {
            state.isSmallScreen = action.payload;
        },
        toggleTheme: (state) => {
            state.theme = state.theme === 'light' ? 'dark' : 'light';
          },
        setShowChatArea: (state, action) => {
            state.showChatArea = action.payload;
        },

        setUserToken:(state,action)=>{
           
            state.user.token=action.payload
           

        },
        openCreateGroup:(state,action)=>{
            
                 state.createGroup=true
        },
        closeCreateGroup:(state)=>{
            return {...state,createGroup:false}
        },
        setAddUsertoGroup:(state)=>{
            
           state.addUserToGroup=!state.addUserToGroup 
             
        },
        toggleRemoveUser:(state)=>{
            state.removeUser=!state.removeUser
        },
        toggelSearch:(state)=>{
            state.searchPage=!state.searchPage

        },
        toggleGroupName:(state,action)=>{
             state.groupNameChange=!state.groupNameChange
        },
        setMyChats:(state, action)=>{
            state.myChats = action.payload
        },
        setsearchUsers:(state, action)=>{
           
            state.searchUsers =action.payload
           
        },
        updateMessageContent: (state, action) => {
            if (state.message) {
                state.message.content = action.payload;
            } else {
                state.message = { content: action.payload };
            }
        
        },
        setSelectedChat:(state,action)=>{
            state.selectedChat=action.payload
        },
        removeUserSelectedChat:(state,action)=>{
            if (state.selectedChat) {
                // Filter out the user to be removed from the selected chat's users array
                state.selectedChat.users = state.selectedChat.users.filter(user => user._id !== action.payload._id);
            }
        
        },
        setGroupRename:(state,action)=>{
            if(state.selectedChat){
                state.selectedChat.chatName=action.payload
            }
            
        },
        setSelectUser:(state, action)=>{
            state.selectUser = action.payload
        },
        setSelectForGrp:(state, action)=>{
            state.selectForGrp = [...state.selectForGrp, action.payload]
        },
        removeSelectForGrp:(state, action)=>{
            state.selectForGrp = state.selectForGrp.filter((u)=> u._id !== action.payload._id)
        },
        setEmpty:(state)=>{
            state.selectForGrp = []
            state.searchUsers = []
            state.allMessages=[];
            state.selectedChat=[];
        },
        setAllMessages:(state, action)=>{
            const uniqueMessages = action.payload.filter(newMessage => {
                // Check if the _id of the new message already exists in the allMessages array
                return !state.allMessages.some(existingMessage => existingMessage._id === newMessage._id);
            });
        
            // Concatenate the unique messages with the existing messages in the state
            state.allMessages = [...state.allMessages, ...uniqueMessages];
            
        },
        setSingleMessage:(state, action)=>{
            
            state.allMessages.push(action.payload);
        },
        setNewMessage:(state, action)=>{
            
            state.myChats = state.myChats.map((chat) => {
                if (chat._id === action.payload._id) {
                    return {
                        ...chat,
                        latestMessage: action.payload
                    };
                } else {
                    return chat;
                }
            });

            
            
        },

       
    }
});

export const { setIsSmallScreen,openCreateGroup,closeCreateGroup,
    updateMessageContent,toggleTheme,
    toggelSearch,
    setAddUsertoGroup,toggleRemoveUser,removeUserSelectedChat,
    toggleGroupName,setGroupRename
    ,setShowChatArea,setUserToken,setMyChats,setSelectedChat, setsearchUsers,
     setSelectUser, setSelectForGrp, removeSelectForGrp, setEmpty, 
     setAllMessages, setSingleMessage, setNewMessage } = chatSlice.actions
export default chatSlice.reducer