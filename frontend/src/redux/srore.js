import { configureStore } from "@reduxjs/toolkit";
import userReducer from"./userSlice"
import messageReducer from './messageSlice.js'
import socketReducer from './socketSlice.js'

const store=configureStore({
    reducer:{
        user:userReducer,
        message:messageReducer,
        socket:socketReducer

    }
})

export default store;