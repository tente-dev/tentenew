import { useDispatch } from 'react-redux'
import { deleteSession } from '../slice/auth'
import { resetStoreState } from 'modules/stores'
import { useNavigationActions } from 'shared/navigation'
import { useFeedback } from 'shared/feedback'

export const useLogout = () => {
  const dispatch = useDispatch()
  const { resetOnLogout } = useNavigationActions()
  const { openLoadingModal, closeLoadingModal } = useFeedback()
  const logout = () => {
    openLoadingModal()
    setTimeout(() => {
      dispatch(resetStoreState())
      dispatch(deleteSession())
      setTimeout(() => {
        resetOnLogout()
        closeLoadingModal()
      }, 1000)
    }, 500)
  }
  return {
    logout,
  }
}
