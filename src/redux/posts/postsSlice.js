import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const fetchPosts = createAsyncThunk(
    'posts/fetchPosts',
    async(uid) => {
        console.log("Fetch" + uid)
        return fetch(`https://secret-castle-93466.herokuapp.com/api/posts/${uid}`)
        .then(res => res.json())
    }
)

export const removePost = createAsyncThunk(
    'posts/removePost',
    async(id) => {
        return fetch(`https://secret-castle-93466.herokuapp.com/api/posts/delete-post/${id}`, 
        { method: 'DELETE', headers:  { 'Content-Type': 'application/json' }}
        )
        .then(res => res.json())
    }
) 

const initialState = {
    posts: [],
    pending: false
}

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        loadPosts(state, action) {
            state.posts = action.payload
        }
    },
    extraReducers: {
        [fetchPosts.pending]: (state, action) => {
            state.pending = true
        },
        [fetchPosts.fulfilled]: (state, action) => {
            state.posts = action.payload
            state.pending = false
        }, 
        [removePost.pending]: (state, action) => {
            state.pending = true
        },
        [removePost.fulfilled]: (state, action) => {
            state.posts = state.posts.filter(
                post => post._id !== action.payload._id
            )
            state.pending = false
        },
    }
})

export const { loadPosts } = postsSlice.actions

export default postsSlice.reducer