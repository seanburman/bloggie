import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const fetchSettings = createAsyncThunk(
    'settings/fetchSettings',
    async(uid) => {
        return fetch(`http://localhost:5000/api/settings/${uid}`)
        .then(res => res.json())
    }
)

const initialState = {
    settings: [],
    pending: false
}

const settingsSlice = createSlice({
    name: 'Posts',
    initialState,
    reducers: {

    },
    extraReducers: {
        [fetchSettings.pending]: (state, action) => {
            state.pending = true
        },
        [fetchSettings.fulfilled]: (state, action) => {
            state.settings = action.payload
            state.pending = false
        }
        // TO DO: Update settings
    }
})

export default settingsSlice.reducer
