import React, { useCallback } from 'react'
import { useLogout } from '../hooks/logout'
import {
  Button,
  HStack,
  Icon,
  IconButton,
  ScrollView,
  Text,
  VStack,
} from 'native-base'
import { ImageBackground, StatusBar } from 'react-native'
import { IMAGES } from 'shared/images/constants/image'
import { APP_BAR_HEIGHT, TEXT_COLORS } from 'shared/styles'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { UserInfo } from '../components/user-info'
import { StoreStatus, useUserStoreInfo } from 'modules/stores'
import { AuthenticatedScreen } from './authenticated-screen'

export const Account = () => {
  const { logout } = useLogout()
  const navigation = useNavigation()
  const { getStoreByUser } = useUserStoreInfo()

  useFocusEffect(
    useCallback(() => {
      getStoreByUser()
    }, [getStoreByUser]),
  )

  return (
    <AuthenticatedScreen description="Inicia sesión para ver la información de tu cuenta">
      <ScrollView
        flex={1}
        width={'full'}
        contentContainerStyle={{
          flex: 1,
        }}>
        <StatusBar backgroundColor="transparent" translucent={true} />
        <ImageBackground
          source={require('../../../../assets/images/cover.png')}
          style={{
            height: APP_BAR_HEIGHT * 2.95,
            width: '100%',
            paddingTop: StatusBar.currentHeight,
          }}>
          <HStack style={{ height: APP_BAR_HEIGHT }} alignItems={'center'}>
            <IconButton
              onPress={() => navigation.goBack()}
              style={{ width: APP_BAR_HEIGHT, height: APP_BAR_HEIGHT }}
              icon={
                <Icon
                  color={TEXT_COLORS.primary}
                  size={34}
                  as={MaterialCommunityIcons}
                  name="chevron-left"
                />
              }
            />
            <Text fontSize={16} fontWeight={'800'}>
              {'Cuenta'}
            </Text>
          </HStack>
        </ImageBackground>
        <VStack px="7.5%" py={6} space={6} flexGrow={1}>
          <UserInfo />
          <StoreStatus />
          <VStack flexGrow={1} />
          <Button width={'100%'} onPress={logout}>
            {'Cerrar sesión'}
          </Button>
        </VStack>
      </ScrollView>
    </AuthenticatedScreen>
  )
}
