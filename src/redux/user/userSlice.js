import { createSlice } from '@reduxjs/toolkit'

const initialState = []

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loadUser(state, action) {
            state.push(action.payload)
        }
    }
})

export const { loadUser} = userSlice.actions

export default userSlice.reducer