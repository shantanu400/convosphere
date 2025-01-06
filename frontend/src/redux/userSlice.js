import { createSlice } from "@reduxjs/toolkit";

const userSlice=createSlice({
    name:'user',
    initialState:{
        authUser:null,
        otherUsers:null,
        selectedUser:null,
        searchedUser:null,
        onlineUser:null,
    },
    
    reducers:{
        setAuthUser:(state,action)=>{
            state.authUser=action.payload;
        },
        setOtherUsers:(state,action)=>{
            state.otherUsers=action.payload
        },
        setSelectedUser:(state,action)=>{
            state.selectedUser=action.payload
        },
        setSearchedUser:(state,action)=>{
            state.searchedUser=action.payload
        },
        setOnlineUser:(state,action)=>{
            state.onlineUser=action.payload;
        }
    }
})

export const {setAuthUser,setOtherUsers,setSelectedUser,setSearchedUser,setOnlineUser}=userSlice.actions;
export default userSlice.reducer;