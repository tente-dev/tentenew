import { useTheme } from '@react-navigation/native'
import { Spinner, StatusBar, VStack } from 'native-base'
import React from 'react'
import { Modal } from 'react-native'

type Props = {
  loading?: boolean
}

export const LoadingModal = (props: Props) => {
  const { loading } = props
  const theme = useTheme()
  return (
    <Modal animationType="fade" visible={loading} presentationStyle="pageSheet">
      <StatusBar backgroundColor={theme.colors.background} />
      <VStack flex={1} justifyContent={'center'} alignItems={'center'}>
        <Spinner size={40} />
      </VStack>
    </Modal>
  )
}
