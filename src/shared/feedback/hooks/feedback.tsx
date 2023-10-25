import { useContext } from 'react'
import { FeedbackContext } from '../context/feedback'

export const useFeedback = () => useContext(FeedbackContext)
