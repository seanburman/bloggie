import { configureStore } from '@reduxjs/toolkit'
import userReducer from './user/userSlice'
import blogReducer from './blog/blogSlice'

export default configureStore({
    reducer: {
        user: userReducer,
        blog: blogReducer
    },
})