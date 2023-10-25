import React, { useCallback } from 'react';
import { useLogout } from '../hooks/logout';
import {
  Button,
  HStack,
  Icon,
  IconButton,
  ScrollView,
  Text,
  VStack,
  View,
} from 'native-base';
import { Image, ImageBackground, StatusBar, StyleSheet } from 'react-native';
import { IMAGES } from 'shared/images/constants/image';
import { APP_BAR_HEIGHT, TEXT_COLORS } from 'shared/styles';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { UserInfo } from '../components/user-info';
import { StoreStatus, useUserStoreInfo } from 'modules/stores';
import { AuthenticatedScreen } from './authenticated-screen';

export const Account = () => {
  const { logout } = useLogout();
  const navigation = useNavigation();
  const { getStoreByUser } = useUserStoreInfo();

  useFocusEffect(
    useCallback(() => {
      getStoreByUser();
    }, [getStoreByUser]),
  );
 

  return (
    <AuthenticatedScreen description="Inicia sesión para ver la información de tu cuenta">
      <ScrollView style={styles.container}>
        <StatusBar backgroundColor="transparent" translucent={true} />
        <ImageBackground
          source={IMAGES.nature_bg}
          style={styles.imageBackground}>
          <HStack style={styles.header}>
            <IconButton
              onPress={() => navigation.goBack()}
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
        <VStack style={styles.content}>
          <UserInfo />
          <StoreStatus />

          <View style={styles.imageContainer}>
            <Image
              source={require('../../../../assets/images/person.png')}
              style={styles.image}
            />
          </View>

          <Button width={'100%'} onPress={logout} style={styles.button}>
            {'Cerrar sesión'}
          </Button>
        </VStack>
      </ScrollView>
    </AuthenticatedScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: "#FFF5E1",
  },
  imageBackground: {
    height: APP_BAR_HEIGHT * 2.95,
    width: '100%',
    paddingTop: StatusBar.currentHeight,
    justifyContent: 'center',
  },
  header: {
    height: APP_BAR_HEIGHT,
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  content: {
    paddingHorizontal: '7.5%',
    paddingVertical: 20,
  },
  imageContainer: {
    alignSelf: 'center',
    marginVertical: 20,
  },
  image: {
    width: 100,
    height: 100,
  },
  button: {
    marginTop: 20,
  },
});
