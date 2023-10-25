import {
  Button,
  FormControl,
  HStack,
  Input,
  VStack,
  View,
  useDisclose,
} from 'native-base';
import React, {useRef} from 'react';
import {
  PRIMARY_LABEL_STYLES_PROPS,
  SECONDARY_INPUT_STYLES_PROPS,
  TOGGLE_PASSWORD_BUTTON_STYLES_PROPS,
} from '@styles';
import {SocialAuth} from './social/social-auth';
import {PasswordStrength, PasswordStrengthRef} from './password-strength';
import {useRegister} from '../hooks/register';
import {ErrorAlert} from '@shared-components';

interface Props {
  onSuccess: (email: string) => void;
}

export const RegisterForm = (props: Props) => {
  const {onSuccess} = props;
  const passwordStrengthRef = useRef<PasswordStrengthRef>(null);
  const {
    payload,
    changeValue,
    validations,
    errorMessage,
    errors,
    loading,
    refs,
    register,
  } = useRegister({
    onSuccess: () => onSuccess(payload.email),
  });
  const {isOpen: showPassword, onToggle: toggleShowPassword} =
    useDisclose(false);
  const {isOpen: showRepeatPassword, onToggle: toggleShowRepeatPassword} =
    useDisclose(false);
  return (
    <VStack>
      <HStack space={3}>
        <FormControl flex={0.5} isRequired isInvalid={errors.firstname}>
          <FormControl.Label {...PRIMARY_LABEL_STYLES_PROPS}>
            {'Nombre'}
          </FormControl.Label>
          <Input
            {...SECONDARY_INPUT_STYLES_PROPS}
            value={payload.firstname}
            onChangeText={value => changeValue('firstname', value)}
            ref={refs.firstnameRef}
            onSubmitEditing={() => refs.lastnameRef.current?.focus()}
            returnKeyType="next"
          />
          <FormControl.ErrorMessage pl={2}>
            {'Campo requerido.'}
          </FormControl.ErrorMessage>
        </FormControl>
        <FormControl flex={0.5} isRequired isInvalid={errors.lastname}>
          <FormControl.Label {...PRIMARY_LABEL_STYLES_PROPS}>
            {'Apellido'}
          </FormControl.Label>
          <Input
            {...SECONDARY_INPUT_STYLES_PROPS}
            value={payload.lastname}
            onChangeText={value => changeValue('lastname', value)}
            ref={refs.lastnameRef}
            onSubmitEditing={() => refs.emailRef.current?.focus()}
            returnKeyType="next"
          />
          <FormControl.ErrorMessage pl={2}>
            {'Campo requerido.'}
          </FormControl.ErrorMessage>
        </FormControl>
      </HStack>
      <FormControl mt={2} isRequired isInvalid={errors.email}>
        <FormControl.Label {...PRIMARY_LABEL_STYLES_PROPS}>
          {'Correo electrónico'}
        </FormControl.Label>
        <Input
          {...SECONDARY_INPUT_STYLES_PROPS}
          value={payload.email}
          onChangeText={value => changeValue('email', value)}
          ref={refs.emailRef}
          onSubmitEditing={() => refs.passwordRef.current?.focus()}
          keyboardType="email-address"
          autoCapitalize="none"
          returnKeyType="next"
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
          ref={refs.passwordRef}
          value={payload.password}
          onChangeText={value => changeValue('password', value)}
          onFocus={() => passwordStrengthRef.current?.open()}
          onBlur={() => passwordStrengthRef.current?.close()}
          onSubmitEditing={() => refs.repeatPasswordRef.current?.focus()}
          returnKeyType="next"
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
          onSubmitEditing={register}
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
      <Button
        mt="10"
        isLoadingText="Cargando"
        colorScheme="secondary"
        onPress={register}
        isLoading={loading}>
        {'Registrarme'}
      </Button>
      <ErrorAlert message={errorMessage} alertProps={{mt: 10, mb: 1}} />
      <View my={8}>
        <SocialAuth />
      </View>
      <PasswordStrength ref={passwordStrengthRef} validations={validations} />
    </VStack>
  );
};
