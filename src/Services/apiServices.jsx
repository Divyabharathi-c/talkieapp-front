import axios from 'axios';


const BASE_URL = "https://talkieapp-back.onrender.com";


export const RegisterUser = async (payload) => {
    const response = await axios.post(`${BASE_URL}/api/register`, payload);
    return response;
};

export const ActivateAccount = async (token) => {
    const response = await axios.get(`${BASE_URL}/api/activate/${token}`);
    return response;
};

export const LoginUser = async (payload) => {
    const response = await axios.post(`${BASE_URL}/api/login`, payload);
    return response;
};

export const ForgetPasswordApi = async (payload) => {
    const response = await axios.post(`${BASE_URL}/api/forgot-password`, payload);
    return response;
};

export const ResetPasswordApi = async (payload,token) => {
    const response = await axios.post(`${BASE_URL}/api/reset-password/${token}`, payload);
    return response;
};
export const searchUserApi = async (payload,authToken) => {

    const headers = {
        'x-auth-token':authToken,
        'Content-Type':'application/json', 
    };
    const response = await axios.get(`${BASE_URL}/api/alluser?search=${payload}`,{headers});
    return response;
};
export const createChat = async (payload,authToken) => {

    const headers = {
        'x-auth-token':authToken,
        'Content-Type':'application/json', 
    };
    const response = await axios.post(`${BASE_URL}/chat/`,{userId:payload},{headers});
    return response;
};

export const getAllChat = async (authToken) => {

    const headers = {
        'x-auth-token':authToken,
        'Content-Type':'application/json', 
    };
    const response = await axios.get(`${BASE_URL}/chat/`,{headers});
    return response;
};
export const getChat = async (payload,authToken) => {

    const headers = {
        'x-auth-token':authToken,
        'Content-Type':'application/json', 
    };
    const response = await axios.get(`${BASE_URL}/message/${payload}`,{headers});
    return response;
};

export const sendMessage = async (payload,authToken) => {

    const headers = {
        'x-auth-token':authToken,
        'Content-Type':'application/json', 
    };
    const response = await axios.post(`${BASE_URL}/message/`,payload,{headers});
    return response;
};
export const newGroup = async (payload,authToken) => {

    const headers = {
        'x-auth-token':authToken,
        'Content-Type':'application/json', 
    };
    const response = await axios.post(`${BASE_URL}/chat/group`,payload,{headers});
    return response;
};

export const addNewUser = async (payload,authToken) => {
    const headers = {
        'x-auth-token':authToken,
        'Content-Type':'application/json', 
    };
    const response = await axios.put(`${BASE_URL}/chat/groupadd`,payload,{headers});
    return response;
};

export const RemoveUserApi = async (payload,authToken) => {
    const headers = {
        'x-auth-token':authToken,
        'Content-Type':'application/json', 
    };
    const response = await axios.put(`${BASE_URL}/chat/removeuser`,payload,{headers});
    return response;
};

export const GroupRenameApi = async (payload,authToken) => {
    const headers = {
        'x-auth-token':authToken,
        'Content-Type':'application/json', 
    };
    const response = await axios.put(`${BASE_URL}/chat/rename`,payload,{headers});
    return response;
};