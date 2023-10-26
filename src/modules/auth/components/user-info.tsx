import { Text, VStack } from 'native-base'
import { useUserAvatar } from '../hooks/user-info'
import { Image } from 'react-native'
import { useSelector } from 'react-redux'
import { RootState } from 'shared/store'
import { View } from 'react-native'; // Make sure to import View

export const UserInfo = () => {
  const { avatar } = useUserAvatar();
  const user = useSelector((state: RootState) => state.auth.user);
  return (
    <VStack justifyContent={'center'} alignItems={'center'} space={3}>
      <View
        style={{
          width: 100,
          height: 100,
          borderRadius: 50,
          borderWidth: 2,
          borderColor: '#ddd',
          shadowColor: "#000",
          shadowOffset: {
              width: 0,
              height: 0,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 0, // For Android shadow
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Image
          source={require('../../../../assets/images/perfil2.png')}
          style={{
            width: '100%',
            height: '100%',
            borderRadius: 50, // Half of width/height to make it circular
          }}
        />
      </View>
      <VStack>
        <Text fontWeight={'700'} textAlign={'center'} fontSize={16}>{`${
          user?.firstname ?? ''
        } ${user?.lastname ?? ''}`}</Text>
        <Text opacity={0.5} textAlign={'center'}>{`${user?.email}`}</Text>
      </VStack>
    </VStack>
  );
};