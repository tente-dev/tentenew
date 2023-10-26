import {
  HStack,
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  Text,
  View,
} from 'native-base'
import React from 'react'
import { LoginForm } from '../components/login-form'
import { SocialAuth } from '../components/social/social-auth'
import { useNavigationActions } from '@navigation'
import { StatusBar } from 'react-native'
import { useTheme } from '@react-navigation/native'

export const Login = () => {
  const { resetToMaps, navigateToRegister } = useNavigationActions()
  const theme = useTheme()
  return (
    <View flex={1}>
      <StatusBar
        backgroundColor={theme.colors.background}
        translucent={false}
      />
      <ScrollView
        px="7.5%"
        _contentContainerStyle={{ py: 18, flexGrow: 1 }}
        disableScrollViewPanResponder>
        <KeyboardAvoidingView
          flex={1}
          contentContainerStyle={{
            flexGrow: 1,
          }}>
          <LoginForm onSuccess={resetToMaps} />
          <View my={8}>
            <SocialAuth />
          </View>
          <View flexGrow={1} justifyContent={'flex-end'} py={4}>
            <Pressable onPress={navigateToRegister} py={4}>
              <HStack justifyContent="center">
                <Text fontSize={15}>{`¿No tienes cuenta? `}</Text>
                <Text fontSize={15} fontWeight={'700'} color={'primary.500'}>
                  {'Regístrate'}
                </Text>
              </HStack>
            </Pressable>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  )
}
