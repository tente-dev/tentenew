import { createAction, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { User } from '../types/user'

export interface AuthState {
  token?: string
  user?: User
}


const initialState: AuthState = {}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    saveToken: (state: AuthState, action: PayloadAction<string>) => {
      state.token = action.payload
    },
    saveUser: (state: AuthState, action: PayloadAction<User>) => {
      state.user = action.payload
    },
    deleteSession: (state: AuthState) => {
      state.token = ''
      state.user = undefined
    },
  },
})

// Action creators are generated for each case reducer function
export const { saveToken, deleteSession, saveUser } = authSlice.actions;


export default authSlice.reducer
