
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toggelSearch } from '../redux/chatSlice';
import { Button, Chip, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { createChat, searchUserApi } from '../Services/apiServices';
import { useNavigate } from 'react-router-dom';


function SearchUser() {

const {searchPage,myChat}=useSelector((state)=>state.chat);
const token=JSON.parse(localStorage.getItem('token'));
const dispatch=useDispatch();
const navigate=useNavigate();
const [search,setSearch]=useState("");
const [suggestion,setSuggestion]=useState([]);

useEffect(()=>{
      const fetchData=async()=>{
        try {
          
          const data=await searchUserApi(search,token);
          console.log(data.data);
          console.log("searching")
            setSuggestion([...data.data])
          
        } catch (error) {
          console.log(error);
        }
    
      }
      
      if(search){
        fetchData();
      }
    
    },[search]);
    
    const handleKeyDown = (e) => {
        if (e.key === 'Backspace' && !search) {
         setSuggestion([])
        }
      };
    

      const handleCreation=async(userId)=>{
        try {
            
            
            const data = await createChat(userId, token);
            console.log(data);
            if (data.status === 200) {
              navigate(`chat/${data.data._id}`);
             
              dispatch(toggelSearch())
            }
          } catch (error) {
            console.log(error);
          }
      }
    

  return (
    <>
    <Dialog
        open={searchPage}
        onClose={()=>dispatch(toggelSearch())}
        fullWidth={true} 
  maxWidth="sm" 
        PaperProps={{
          component: 'form',
         
          onSubmit: (event) => {
            event.preventDefault();
            
            
          },
        }}
      ><DialogTitle> Search User</DialogTitle>
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
            label="Search user"
            type="text"
            fullWidth
            variant="standard"
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
            onKeyDown={handleKeyDown}
          />

        {suggestion.length>0&&suggestion.map((ele)=>(
            <div key={ele._id}>
            <Chip  label={`${ele.email}- ${ele.name}`}  
                sx={{ marginBottom: '0.5rem' }}
                onClick={()=>handleCreation(ele._id)}
            />
            </div>
        )
        )}
           
        </DialogContent>
      
       
        <DialogActions>
       
          <Button onClick={()=>dispatch(toggelSearch())}>Close</Button>
         
        </DialogActions>
      </Dialog>





    </>
  )
}

export default SearchUser