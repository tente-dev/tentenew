import {
  Button,
  FormControl,
  Input,
  KeyboardAvoidingView,
  ScrollView,
  VStack,
  View,
  useDisclose,
} from 'native-base'
import React, { useRef } from 'react'
import { ErrorAlert } from '@shared-components'
import {
  PRIMARY_LABEL_STYLES_PROPS,
  SECONDARY_INPUT_STYLES_PROPS,
  TOGGLE_PASSWORD_BUTTON_STYLES_PROPS,
} from '@styles'
import { useResetPassword } from '../hooks/reset-password'
import {
  PasswordStrength,
  PasswordStrengthRef,
} from '../components/password-strength'

export const ResetPassword = () => {
  const passwordStrengthRef = useRef<PasswordStrengthRef>(null)
  const { isOpen: showPassword, onToggle: toggleShowPassword } =
    useDisclose(false)
  const { isOpen: showRepeatPassword, onToggle: toggleShowRepeatPassword } =
    useDisclose(false)
  const {
    changeValue,
    errorMessage,
    errors,
    loading,
    payload,
    refs,
    resetPassword,
    validations,
  } = useResetPassword()
  return (
    <View flex={1}>
      <ScrollView
        px="7.5%"
        _contentContainerStyle={{ py: 18, flexGrow: 1, pt: 24 }}
        disableScrollViewPanResponder>
        <KeyboardAvoidingView
          flex={1}
          contentContainerStyle={{
            flexGrow: 1,
          }}>
          <VStack justifyContent={'space-between'} flexGrow={1}>
            <VStack>
              <FormControl mt={2} isRequired isInvalid={errors.password}>
                <FormControl.Label {...PRIMARY_LABEL_STYLES_PROPS}>
                  {'Contraseña'}
                </FormControl.Label>
                <Input
                  {...SECONDARY_INPUT_STYLES_PROPS}
                  type={showPassword ? 'text' : 'password'}
                  ref={refs.passwordRef}
                  value={payload.password}
                  onChangeText={value => changeValue('password', value)}
                  onFocus={() => passwordStrengthRef.current?.open()}
                  onBlur={() => passwordStrengthRef.current?.close()}
                  onSubmitEditing={() =>
                    refs.repeatPasswordRef.current?.focus()
                  }
                  rightElement={
                    <Button
                      {...TOGGLE_PASSWORD_BUTTON_STYLES_PROPS}
                      onPress={toggleShowPassword}>
                      {showPassword ? 'Ocultar' : 'Mostrar'}
                    </Button>
                  }
                />
                <FormControl.ErrorMessage pl={2}>
                  {'Ingresa una contraseña válida.'}
                </FormControl.ErrorMessage>
              </FormControl>
              <FormControl mt={2} isRequired isInvalid={errors.repeatPassword}>
                <FormControl.Label {...PRIMARY_LABEL_STYLES_PROPS}>
                  {'Repite tu contraseña'}
                </FormControl.Label>
                <Input
                  {...SECONDARY_INPUT_STYLES_PROPS}
                  type={showRepeatPassword ? 'text' : 'password'}
                  value={payload.repeatPassword}
                  onChangeText={value => changeValue('repeatPassword', value)}
                  ref={refs.repeatPasswordRef}
                  onSubmitEditing={resetPassword}
                  rightElement={
                    <Button
                      {...TOGGLE_PASSWORD_BUTTON_STYLES_PROPS}
                      onPress={toggleShowRepeatPassword}>
                      {showRepeatPassword ? 'Ocultar' : 'Mostrar'}
                    </Button>
                  }
                />
                <FormControl.ErrorMessage pl={2}>
                  {'Las contraseñas no coinciden.'}
                </FormControl.ErrorMessage>
              </FormControl>
            </VStack>
            <Button
              mt="10"
              isLoadingText="Cargando"
              colorScheme="secondary"
              onPress={resetPassword}
              isLoading={loading}>
              {'Registrarme'}
            </Button>
            <ErrorAlert message={errorMessage} alertProps={{ mt: 10, mb: 1 }} />
            <ErrorAlert message={errorMessage} alertProps={{ mt: 10, mb: 1 }} />
            <PasswordStrength
              ref={passwordStrengthRef}
              validations={validations}
              placement="bottom"
            />
          </VStack>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  )
}
