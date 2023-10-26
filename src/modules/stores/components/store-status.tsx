import { NavigationProp, useNavigation } from '@react-navigation/native'
import { Alert, Box, Button, Icon, Text, VStack } from 'native-base'
import React, { Fragment } from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { useSelector } from 'react-redux'
import { useNavigationActions } from 'shared/navigation'
import { RootState } from 'shared/store'

export const StoreStatus = () => {
  const { navigateToStoreRegistration } = useNavigationActions()
  const store = useSelector((state: RootState) => state.stores.store)
  const navigation = useNavigation<NavigationProp<any>>()

  return (
    <Fragment>
      {!store && (
        <Fragment>
          <Button
            width={'100%'}
            onPress={navigateToStoreRegistration}
            variant={'subtle'}
            endIcon={
              <Icon
                size={22}
                opacity={0.6}
                as={MaterialIcons}
                name="navigate-next"
              />
            }>
            {'Registra tu tienda'}
          </Button>
          <Text mt={4} textAlign={'center'} fontSize={'xs'} opacity={0.5}>
            {'Registra tu tienda y aumenta tu alcance a través de Tente'}
          </Text>
        </Fragment>
      )}
      {Boolean(store?.verified) && (
        <Fragment>
          <Alert w="100%" status="success">
            <VStack space={1} flexShrink={1} w="100%" alignItems="center">
              <Alert.Icon size="md" />
              <Text fontSize="md" fontWeight="medium">
                {'Tu tienda a sido verificada'}
              </Text>

              <Box
                mb={2}
                _text={{
                  textAlign: 'center',
                }}>
                {'Ahora tu tienda puede ser visible para los demas usuarios.'}
              </Box>
            </VStack>
          </Alert>
        </Fragment>
      )}
      {store && !store.verified && !store.nonAcceptedFields && (
        <Fragment>
          <Alert w="100%" status="success">
            <VStack space={1} flexShrink={1} w="100%" alignItems="center">
              <Alert.Icon size="md" />
              <Text fontSize="md" fontWeight="medium">
                {'Solicitud enviada'}
              </Text>

              <Box
                mb={2}
                _text={{
                  textAlign: 'center',
                }}>
                {
                  'Hemos recibido tu solicitud, vamos a revisar toda la información enviada para revisar su veracidad y validez.'
                }
              </Box>
            </VStack>
          </Alert>
        </Fragment>
      )}
      {store && store.nonAcceptedFields && (
        <Fragment>
          <Alert w="100%" status="warning">
            <VStack space={1} flexShrink={1} w="100%" alignItems="center">
              <Alert.Icon size="md" />
              <Text fontSize="md" fontWeight="medium">
                {'Cambios pendientes'}
              </Text>

              <Box
                mb={2}
                _text={{
                  textAlign: 'center',
                }}>
                {
                  'Hemos revisado tu solicitud y necesitamos que actualizes o corrijas cierta información.'
                }
              </Box>
            </VStack>
          </Alert>
          <Button
            variant={'link'}
            colorScheme={'tertiary'}
            onPress={() =>
              navigation.navigate('CorrectInfo', {
                nonAcceptedFields: JSON.parse(store.nonAcceptedFields ?? ''),
              })
            }>
            {'Actualizar información'}
          </Button>
        </Fragment>
      )}
    </Fragment>
  )
}
