import React, { Fragment, PropsWithChildren } from 'react'
import { useIsAuthenticated } from '../hooks/user-info'
import { Button, Text, VStack } from 'native-base'
import { useNavigationActions } from 'shared/navigation'
import { Dimensions, StatusBar, Image } from 'react-native'  // <-- Import Image here
import { useTheme } from '@react-navigation/native'


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
      
          <Image 
            source={require('../../../../assets/images/cuenta.png')}  
            style={{ width: width * 0.6, height: width * 0.6 }} 
            resizeMode="contain"
          />
       
          <Button mt={7} onPress={navigateToLogin} width={'full'}>
            {'Iniciar sesión'}
          </Button>
        </VStack>
      )}
    </Fragment>
  )
}
