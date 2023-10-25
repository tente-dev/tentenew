import React, { Fragment, PropsWithChildren } from 'react'
import { useIsAuthenticated } from '../hooks/user-info'
import { Button, Text, VStack } from 'native-base'
import { useNavigationActions } from 'shared/navigation'
import { Dimensions, StatusBar } from 'react-native'
import { useTheme } from '@react-navigation/native'
import Lottie from 'lottie-react-native'
import { LOTTIE_ANIMATIONS } from 'shared/animations/constants/lottie'

interface Props {
  description?: string
}

export const AuthenticatedScreen = ({
  children,
  description,
}: PropsWithChildren<Props>) => {
  const { isAuthenticated } = useIsAuthenticated()
  const { navigateToLogin } = useNavigationActions()
  const theme = useTheme()
  const width = Dimensions.get('window').width

  return (
    <Fragment>
      {isAuthenticated ? (
        children
      ) : (
        <VStack
          space={4}
          flex={1}
          justifyContent={'center'}
          alignItems={'center'}
          px={'7.5%'}>
          <Text
            fontSize={17}
            fontWeight={'800'}
            textAlign={'center'}
            pb={4}
            pt={6}>
            {description ?? 'Inicia sesión'}
          </Text>
          <Lottie
            style={{
              height: width * 0.6,
            }}
            source={LOTTIE_ANIMATIONS.authenticate}
            autoPlay
            loop
          />
          <Button mt={7} onPress={navigateToLogin} width={'full'}>
            {'Iniciar sesión'}
          </Button>
        </VStack>
      )}
    </Fragment>
  )
}
