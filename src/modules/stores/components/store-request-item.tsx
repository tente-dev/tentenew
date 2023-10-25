import React from 'react'
import { Store } from '../types/store'
import { HStack, Pressable, Text, VStack } from 'native-base'
import { Image } from 'react-native'
import { NavigationProp, useNavigation } from '@react-navigation/native'

type Props = {
  item: Store
}

export const StoreRequestItem = (props: Props) => {
  const { item } = props
  const navigation = useNavigation<NavigationProp<any>>()
  return (
    <Pressable
      minHeight={65}
      my={2}
      onPress={() => {
        navigation.navigate('StoreRequest', { item })
      }}>
      <VStack>
        <HStack space={4} alignItems={'center'}>
          <Image
            source={{
              uri:
                item.logo?.path ??
                'https://pixsector.com/cache/a35c7d7b/avd437689ef3a02914ac1.png',
            }}
            style={{ width: 50, height: 50, borderRadius: 10 }}
          />
          <VStack flexGrow={1} mr={4}>
            <HStack space={1}>
              <Text fontSize={'md'} fontWeight={'700'}>{`${item.name}`}</Text>
            </HStack>
            <HStack flexDirection={'row'} flexGrow={1}>
              <Text
                textTransform={'capitalize'}
                fontSize={'sm'}
                flex={1}
                numberOfLines={1}
                flexWrap={'wrap'}
                fontWeight={'300'}>{`${item.slogan}`}</Text>
            </HStack>
          </VStack>
        </HStack>
      </VStack>
    </Pressable>
  )
}
