import { useRoute } from '@react-navigation/native'
import { Button, ScrollView, Text, VStack } from 'native-base'
import React from 'react'
import Lottie from 'lottie-react-native'
import { LOTTIE_ANIMATIONS } from '@lottie-animations'
import { Dimensions } from 'react-native'
import { useResendEmail } from '../hooks/resend-email'

export const EmailSent = () => {
  const { params } = useRoute()
  const email = (params as any)?.email
  const width = Dimensions.get('window').width
  const { loading, resend, sent } = useResendEmail(email ?? '')
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
        source={LOTTIE_ANIMATIONS.emailSent}
        autoPlay
        loop
      />
      <VStack px="7.5%">
        <Text
          fontWeight={'700'}
          fontSize={'xl'}>{`Estas a un paso de ser parte de Tente.`}</Text>
        <Text
          mt={2}
          opacity={
            0.7
          }>{`Hemos enviado un enlace al correo: ${email} para activar tu cuenta.`}</Text>
      </VStack>
      <VStack px="7.5%" mt={4}>
        <Button
          isLoading={loading}
          colorScheme={sent ? 'success' : undefined}
          onPress={resend}>
          {sent ? ' Correo enviado!' : 'Volver a enviar'}
        </Button>
        <Text
          mt={5}
          textAlign={'center'}>{`¿No recibiste ningún correo?`}</Text>
      </VStack>
    </ScrollView>
  )
}
