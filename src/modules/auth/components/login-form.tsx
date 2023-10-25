import {
  Button,
  FormControl,
  Input,
  Link,
  VStack,
  useDisclose,
} from 'native-base'
import React from 'react'
import {
  PRIMARY_LABEL_STYLES_PROPS,
  PRIMARY_LINK_STYLES_PROPS,
  SECONDARY_INPUT_STYLES_PROPS,
  TOGGLE_PASSWORD_BUTTON_STYLES_PROPS,
} from '@styles'
import { useLogin } from '../hooks/login'
import { ErrorAlert } from 'shared/components'
import { useNavigationActions } from 'shared/navigation'

interface Props {
  onSuccess: () => void
}

export const LoginForm = (props: Props) => {
  const { onSuccess } = props
  const { changeValue, errors, login, payload, refs, errorMessage } =
  useLogin({
    onSuccess,
  })

  const { isOpen: showPassword, onToggle: toggleShowPassword } =
    useDisclose(false)
  const { navigateToForgotPassword } = useNavigationActions()
  return (
    <VStack>
      <FormControl isRequired isInvalid={errors.email}>
        <FormControl.Label {...PRIMARY_LABEL_STYLES_PROPS}>
          {'Correo electrónico'}
        </FormControl.Label>
        <Input
          {...SECONDARY_INPUT_STYLES_PROPS}
          value={payload.email}
          ref={refs.emailRef}
          keyboardType="email-address"
          autoCapitalize="none"
          onChangeText={value => changeValue('email', value)}
          onSubmitEditing={() => refs.passwordRef.current?.focus()}
        />
        <FormControl.ErrorMessage pl={2}>
          {'Ingresa un correo válido.'}
        </FormControl.ErrorMessage>
      </FormControl>
      <FormControl mt={2} isRequired isInvalid={errors.password}>
        <FormControl.Label {...PRIMARY_LABEL_STYLES_PROPS}>
          {'Contraseña'}
        </FormControl.Label>
        <Input
          {...SECONDARY_INPUT_STYLES_PROPS}
          type={showPassword ? 'text' : 'password'}
          value={payload.password}
          ref={refs.passwordRef}
          onChangeText={value => changeValue('password', value)}
          onSubmitEditing={login}
          rightElement={
            <Button
              {...TOGGLE_PASSWORD_BUTTON_STYLES_PROPS}
              onPress={toggleShowPassword}>
              {showPassword ? 'Ocultar' : 'Mostrar'}
            </Button>
          }
        />
        <FormControl.ErrorMessage pl={2}>
          {'Ingresa tu contraseña para continuar.'}
        </FormControl.ErrorMessage>
      </FormControl>
      <Link onPress={navigateToForgotPassword} {...PRIMARY_LINK_STYLES_PROPS}>
        {'¿Olvidaste tu contraseña?'}
      </Link>
      <Button
        mt="2"
        colorScheme="secondary"
        onPress={login}
       // isLoading={loading}
        isLoadingText="Cargando">
        {'Ingresar'}
      </Button>
      <ErrorAlert message={errorMessage} alertProps={{ mt: 10, mb: 1 }} />
    </VStack>
  )
}
