import { configureStore } from '@reduxjs/toolkit'
import userReducer from './user/userSlice'
import postsReducer from './posts/postsSlice'
import settingsReducer from './settings/settingsSlice'
import pexelsReducer from './pexels/pexelsSlice'

export default configureStore({
    reducer: {
        user: userReducer,
        posts: postsReducer,
        settings: settingsReducer,
        pexels: pexelsReducer
    },
})