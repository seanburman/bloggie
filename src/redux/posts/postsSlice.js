import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const fetchPosts = createAsyncThunk(
    'posts/fetchPosts',
    async(uid) => {
        return fetch(`https://secret-castle-93466.herokuapp.com/api/posts/${uid}`)
        .then(res => res.json())
    }
)

export const createPost = createAsyncThunk(
    'posts/createPost',
    async(post) => {
        return fetch(`https://secret-castle-93466.herokuapp.com/api/posts/create-post/`, 
        { 
            method: 'POST', 
            headers:  { 'Content-Type': 'application/json' },
            body: 
                JSON.stringify({
                uid: post.uid,
                displayname: post.displayname,
                previewimage: post.previewimage,
                mainimage: post.mainimage,
                title: post.title,
                content: post.content,
                date: post.date
            })
        })
        .then(res => res.json())
    }
)

export const updateOnePost = createAsyncThunk(
    'posts/updateOnePost',
    async(post) => {
        return fetch(`https://secret-castle-93466.herokuapp.com/api/posts/update-post/${post._id}`, 
        { 
            method: 'PUT', 
            headers:  { 'Content-Type': 'application/json' },
            body: 
                JSON.stringify({
                uid: post.uid,
                displayname: post.parameters.displayname,
                previewimage: post.parameters.previewimage,
                mainimage: post.parameters.mainimage,
                title: post.parameters.title,
                content: post.parameters.content,
                date: post.parameters.date
            })
        })
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
        [createPost.pending]: (state, action) => {
            state.pending = true
        },
        [createPost.fulfilled]: (state, action) => {
            state.posts = [...state.posts, action.payload]
            state.pending = false
        }, 
        [updateOnePost.pending]: (state, action) => {
            state.pending = true
        },
        [updateOnePost.fulfilled]: (state, action) => {
            let updatedPosts = state.posts.filter(
                post => post._id !== action.payload._id
            )
            updatedPosts = [...updatedPosts, action.payload]
            state.posts = updatedPosts
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