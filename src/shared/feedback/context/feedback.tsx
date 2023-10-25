import { useDisclose } from 'native-base'
import { PropsWithChildren, createContext, useRef } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from 'shared/store'
import { LoadingModal } from '../components/loading-modal'
import { RegisterStoreModal, RegisterStoreModalRef } from 'modules/stores'

interface FeedbackContext {
  closeLoadingModal: () => void
  openLoadingModal: () => void
  checkRegisterStoreModal: () => void
}

export const FeedbackContext = createContext({} as FeedbackContext)

export const FeedbackProvider = ({ children }: PropsWithChildren) => {
  const registerStoreShowed = useSelector(
    (state: RootState) => state.feedback.registerStoreShowed,
  )
  const registerStoreModalRef = useRef<RegisterStoreModalRef>(null)
  const {
    isOpen: showLoadingModal,
    onClose: closeLoadingModal,
    onOpen: openLoadingModal,
  } = useDisclose()

  const checkRegisterStoreModal = () => {
    if (!registerStoreShowed) {
      registerStoreModalRef.current?.open()
    }
  }

  return (
    <FeedbackContext.Provider
      value={{ closeLoadingModal, openLoadingModal, checkRegisterStoreModal }}>
      {children}
      <LoadingModal loading={showLoadingModal} />
      <RegisterStoreModal ref={registerStoreModalRef} />
    </FeedbackContext.Provider>
  )
}
