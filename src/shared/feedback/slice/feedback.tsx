import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface FeedbackState {
  registerStoreShowed: boolean
  loadingAPI: boolean
}

const initialState: FeedbackState = {
  registerStoreShowed: false,
  loadingAPI: false,
}

export const feedbackSlice = createSlice({
  name: 'feedback',
  initialState,
  reducers: {
    registerStoreShowed: (state: FeedbackState) => {
      state.registerStoreShowed = true
    },
    setLoadingAPI: (state: FeedbackState, action: PayloadAction<boolean>) => {
      state.loadingAPI = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { registerStoreShowed, setLoadingAPI } = feedbackSlice.actions

export default feedbackSlice.reducer
