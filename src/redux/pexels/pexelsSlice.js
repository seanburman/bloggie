import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const APIKEY = process.env.REACT_APP_PEXELS_API_KEY

export const fetchPexels = createAsyncThunk(
    'pexels/fetchPexels',
    async({query, results, page}) => {
        return fetch(`https://api.pexels.com/v1//search?query=${query}&per_page=${results}&page=${page}`, 
        { method: 'GET', headers:  { 'Authorization': APIKEY }}
        )
        .then(res => res.json())
    }
)

const initialState = {
    pexels: [],
    storedImages: [],
    selectedPhoto: [],
    query: [],
    resultsPerPage: 30,
    pending: false
}

const pexelsSlice = createSlice({
    name: 'pexels',
    initialState,
    reducers: {
        storeQuery(state, action) {
            state.query = action.payload
        },
        storeImageLocal(state, action) {
            state.storedImages = [...state.storedImages, action.payload]
        },
        removeImageLocal(state, action) {
            state.storedImages = state.storedImages.filter(
                image => image.url !== action.payload.url)
        },
        select_Photo(state, action) {
            state.selectedPhoto = action.payload
        },
        deselect_Photo(state, action) {
            state.selectedPhoto = []
        }
    },
    extraReducers: {
        [fetchPexels.pending]: (state, action) => {
            state.pending = true
        },
        [fetchPexels.fulfilled]: (state, action) => {
            state.pexels = action.payload
            state.pending = false
        }
        // TO DO: Update settings
    }
})

export const { 
    storeQuery, select_Photo, deselect_Photo, storeImageLocal, removeImageLocal
} = pexelsSlice.actions

export default pexelsSlice.reducer
