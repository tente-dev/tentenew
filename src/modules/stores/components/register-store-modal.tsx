import { useTheme } from '@react-navigation/native'
import {
  Button,
  Modal,
  Pressable,
  Text,
  useDisclose,
  VStack,
} from 'native-base'
import { forwardRef, useImperativeHandle } from 'react'
import { Dimensions, StatusBar } from 'react-native'
import Lottie from 'lottie-react-native'
import { LOTTIE_ANIMATIONS } from 'shared/animations/constants/lottie'
import { useNavigationActions } from 'shared/navigation'
import { useDispatch } from 'react-redux'
import { registerStoreShowed } from 'shared/feedback'

export interface RegisterStoreModalRef {
  open: () => void
}

export const RegisterStoreModal = forwardRef<RegisterStoreModalRef>(
  (_, ref) => {
    const { isOpen: visible, onClose: close, onOpen: open } = useDisclose()
    const theme = useTheme()
    const dispatch = useDispatch()
    useImperativeHandle(ref, () => ({
      open,
    }))
    const width = Dimensions.get('window').width
    const { navigateToStoreRegistration } = useNavigationActions()
    const handleProcess = () => {
      close()
      navigateToStoreRegistration()
    }
    const handleCancel = () => {
      close()
      dispatch(registerStoreShowed())
    }
    return (
      <Modal isOpen={visible}>
        <StatusBar backgroundColor={theme.colors.background} />
        <Modal.Content>
          <Modal.Body>
            <VStack
              justifyContent={'center'}
              alignItems={'center'}
              px={5}
              pb={10}
              space={2}>
              <Lottie
                style={{
                  height: width * 0.5,
                }}
                source={LOTTIE_ANIMATIONS.store}
                autoPlay
                loop
              />
              <Text fontWeight={800} fontSize={20} textAlign={'center'}>
                {'Registra tu tienda'}
              </Text>
              <Text textAlign={'center'} opacity={0.5}>
                {'Vende tus productos, etc etc etc'}
              </Text>
              <Button
                width={'full'}
                _text={{ textAlign: 'center' }}
                mt={5}
                colorScheme={'tertiary'}
                onPress={handleProcess}>
                {'Empezar proceso de registro'}
              </Button>
              <Pressable py={4} onPress={handleCancel}>
                <Text textAlign={'center'}>{'No en este momento'}</Text>
              </Pressable>
              <Text textAlign={'center'} opacity={0.6} fontSize={10} mt={2}>
                {
                  'Si no deseas registrar tu tienda ahora, puedes acceder a esta opción en cualquier momento desde el menú de usuario.'
                }
              </Text>
            </VStack>
          </Modal.Body>
        </Modal.Content>
      </Modal>
    )
  },
)
