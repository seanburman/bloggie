import { createSlice } from '@reduxjs/toolkit'

const initialState = [{name: 'Blog'}]

const viewsSlice = createSlice({
    name: 'views',
    initialState,
    reducers: {
        loadView(state, action) {
            state[0] = action.payload
        }
    }
})

export const { loadView} = viewsSlice.actions

export default viewsSlice.reducer