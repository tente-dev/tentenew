import { Text, VStack } from 'native-base'
import { useUserAvatar } from '../hooks/user-info'
import { Image } from 'react-native'
import { useSelector } from 'react-redux'
import { RootState } from 'shared/store'

export const UserInfo = () => {
  const { avatar } = useUserAvatar()
  const user = useSelector((state: RootState) => state.auth.user)
  return (
    <VStack justifyContent={'center'} alignItems={'center'} space={3}>
      <Image
        source={{ uri: avatar }}
        style={{ width: 80, height: 80, borderRadius: 10 }}
      />
      <VStack>
        <Text fontWeight={'700'} textAlign={'center'} fontSize={16}>{`${
          user?.firstname ?? ''
        } ${user?.lastname ?? ''}`}</Text>
        <Text opacity={0.5} textAlign={'center'}>{`${user?.email}`}</Text>
      </VStack>
    </VStack>
  )
}
