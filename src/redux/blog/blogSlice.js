import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const fetchPosts = createAsyncThunk(
    'blog/fetchPosts',
    async() => {
        return fetch(`https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=3ce6edba821c4d5abf97ea4982ab6680`)
        .then(res => res.json())
    }
)

const initialState = {
    posts: [],
    pending: false
}

const blogSlice = createSlice({
    name: 'blog',
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
    }
})

export const { loadPosts } = blogSlice.actions

export default blogSlice.reducer