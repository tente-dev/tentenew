import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Login, Register, EmailSent } from '@auth'
import { StatusBar } from 'native-base'
import { Fragment } from 'react'
import { useTheme } from '@react-navigation/native'
import { BackHeader } from '../components/back-header'
import { EmailVerified } from 'modules/auth/screens/emial-verified'
import { ForgotPassword } from 'modules/auth/screens/forgot-password'
import { ResetPassword } from 'modules/auth/screens/reset-password'

const Stack = createNativeStackNavigator()

export const AuthNavigator = () => {
  const theme = useTheme()
  return (
    <Fragment>
      <StatusBar backgroundColor={theme.colors.card} />
      <Stack.Navigator
        screenOptions={{
          header: props => <BackHeader {...props} />,
          animation: 'slide_from_bottom',
        }}>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ title: 'Inicia sesión' }}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{ title: 'Registrate' }}
        />
        <Stack.Screen
          name="EmailSent"
          component={EmailSent}
          options={{ title: 'Activa tu cuenta' }}
        />
        <Stack.Screen
          name="EmailVerified"
          component={EmailVerified}
          options={{ title: '' }}
        />
        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPassword}
          options={{ title: '¿Olvidaste tu contraseña?' }}
        />
        <Stack.Screen
          name="ResetPassword"
          component={ResetPassword}
          options={{ title: 'Cambia tu contraseña' }}
        />
      </Stack.Navigator>
    </Fragment>
  )
}
