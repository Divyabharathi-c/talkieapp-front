

import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css'
import MainContainer from './Components/MainContainer';
import SignIn from './Pages/Login';
import Welcome from './Components/Welcome';
import ChatArea from './Components/ChatArea';
import CreateGroup from './Components/CreateGroup';
import Register from './Pages/Register';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import Forget from './Pages/Forget';
import ResetPassword from './Pages/Reset';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import NotFound from './Components/NotFound';
import AccountActivation from './Pages/AccountActivation';

function App() {
 
  
const token=useSelector((state)=>state.chat.user.token);
// console.log(token)




  return (
    <>
    <div className='App' >
    <Routes>
      <Route exact path='/' element={<SignIn/>}/>
      <Route path='app' element={token?<MainContainer/>:<Navigate to='/' />}>
      <Route path='welcome' element={<Welcome/>}/>
      <Route path='chat/:chatId' element={<ChatArea/>}/>
       {/* <Route path='create-group' element={<CreateGroup/>}/> */}

      </Route>
      <Route path='/activate/:token' element={<AccountActivation/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/forgot-password' element={<Forget/>}/>
      <Route path='/reset-password/:token' element={<ResetPassword/>} />
      <Route path="*" element={<NotFound />} />
      <Route/>
    </Routes>
    <ToastContainer />
    </div>
    </>
  )
}

export default App
