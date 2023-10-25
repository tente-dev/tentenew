import {
  Button,
  FormControl,
  HStack,
  Input,
  ScrollView,
  Text,
  VStack,
} from 'native-base'
import React from 'react'
import { useForgotPassword } from '../hooks/forgot-password'
import {
  PRIMARY_LABEL_STYLES_PROPS,
  SECONDARY_INPUT_STYLES_PROPS,
} from 'shared/styles'

export const ForgotPassword = () => {
  const { loading, forgotPassword, sent, error, email, emailRef, setEmail } =
    useForgotPassword()
  return (
    <ScrollView
      flex={1}
      _contentContainerStyle={{
        py: 12,
        justifyContent: 'space-evenly',
        flex: 1,
      }}
      disableScrollViewPanResponder>
      <HStack px="7.5%">
        <FormControl isRequired isInvalid={error}>
          <FormControl.Label {...PRIMARY_LABEL_STYLES_PROPS}>
            {'Correo electrónico'}
          </FormControl.Label>
          <Input
            {...SECONDARY_INPUT_STYLES_PROPS}
            value={email}
            ref={emailRef}
            keyboardType="email-address"
            autoCapitalize="none"
            onChangeText={setEmail}
            onSubmitEditing={forgotPassword}
          />
          <FormControl.ErrorMessage pl={2}>
            {'Ingresa un correo válido.'}
          </FormControl.ErrorMessage>
        </FormControl>
      </HStack>
      <VStack px="7.5%">
        <Text
          fontWeight={'700'}
          fontSize={'xl'}>{`Ingresa tu correo electrónico.`}</Text>
        <Text
          mt={2}
          opacity={
            0.7
          }>{`Te enviaremos un enlace para que puedas cambiar tu contraseña.`}</Text>
      </VStack>
      <VStack px="7.5%" mt={4}>
        <Button
          isLoading={loading}
          colorScheme={sent ? 'success' : undefined}
          onPress={forgotPassword}>
          {sent ? ' Correo enviado!' : 'Enviar'}
        </Button>
      </VStack>
    </ScrollView>
  )
}
