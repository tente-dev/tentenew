import { Button, ScrollView, Text, VStack } from 'native-base'
import React from 'react'
import Lottie from 'lottie-react-native'
import { LOTTIE_ANIMATIONS } from '@lottie-animations'
import { Dimensions } from 'react-native'
import { useNavigationActions } from 'shared/navigation'

export const EmailVerified = () => {
  const width = Dimensions.get('window').width
  const { navigateToLogin } = useNavigationActions()

  return (
    <ScrollView
      flex={1}
      _contentContainerStyle={{
        py: 12,
        justifyContent: 'space-evenly',
        flex: 1,
      }}>
      <Lottie
        style={{
          width,
          position: 'relative',
        }}
        source={LOTTIE_ANIMATIONS.done}
        autoPlay
        loop
      />
      <VStack px="7.5%">
        <Text
          fontWeight={'700'}
          fontSize={'xl'}>{`Listo! Tu correo a sido verificado.`}</Text>
      </VStack>
      <VStack px="7.5%" mt={4}>
        <Button onPress={navigateToLogin}>{'Iniciar sesión'}</Button>
      </VStack>
    </ScrollView>
  )
}
