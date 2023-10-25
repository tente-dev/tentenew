import {
  HStack,
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  Text,
  View,
} from 'native-base'
import React from 'react'
import { RegisterForm } from '../components/register-form'
import { useNavigationActions } from 'shared/navigation'

export const Register = () => {
  const { navigateToLogin, resetToEmailSent } = useNavigationActions()
  return (
    <View flex={1}>
      <ScrollView
        disableScrollViewPanResponder
        px="7.5%"
        _contentContainerStyle={{ py: 18, flexGrow: 1 }}>
        <KeyboardAvoidingView
          flex={1}
          contentContainerStyle={{
            flexGrow: 1,
          }}>
          <RegisterForm onSuccess={resetToEmailSent} />
          <View flexGrow={1} justifyContent={'flex-end'} py={4}>
            <Pressable onPress={navigateToLogin} py={4}>
              <HStack justifyContent="center">
                <Text fontSize={15}>{`¿Ya tienes cuenta? `}</Text>
                <Text fontSize={15} fontWeight={'700'} color={'primary.500'}>
                  {'Inicia sesión'}
                </Text>
              </HStack>
            </Pressable>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  )
}
