import React, { useMemo } from 'react'
import { Store, StoreBranch } from '../types/store'
import { HStack, Icon, IconButton, Pressable, Text, VStack } from 'native-base'
import { Image } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { Favorite } from '../types/favorite'
import { Branch } from '../types/branch'
import { NavigationProp, useNavigation } from '@react-navigation/native'

type Props = {
  item: StoreBranch
  favorites: Favorite[]
  removeFromFavorites: (favorite: Favorite) => Promise<void>
  addToFavorites: (branch: Branch, store: Store) => Promise<void>
}

export const StoreBrachItem = (props: Props) => {
  const { item, favorites, addToFavorites, removeFromFavorites } = props
  const { branch, store } = item
  const navigation = useNavigation<NavigationProp<any>>()
  const favorite = useMemo(() => {
    return favorites.find(f => f.branchId === branch.id)
  }, [favorites, branch])
  const isOnFavorites = Boolean(favorite)
  const handleFavorite = () => {
    if (isOnFavorites) {
      if (favorite) removeFromFavorites(favorite)
    } else {
      addToFavorites(branch, store as Store)
    }
  }
  return (
    <Pressable
      minHeight={90}
      my={2}
      onPress={() => {
        navigation.navigate('StoreBranchInformation', { item })
      }}>
      <VStack>
        <HStack space={4} alignItems={'center'}>
          <Image
            source={{
              uri:
                store.logo?.path ??
                'https://pixsector.com/cache/a35c7d7b/avd437689ef3a02914ac1.png',
            }}
            style={{ width: 50, height: 50, borderRadius: 10 }}
          />
          <VStack flexGrow={1} mr={4} maxW={'60%'}>
            <HStack space={1}>
              <Text
                flexWrap={'wrap'}
                fontSize={'md'}
                fontWeight={'700'}>{`${store.name} (${branch.name})`}</Text>
            </HStack>
            <HStack flexDirection={'row'} flexGrow={1}>
              <Text
                textTransform={'capitalize'}
                fontSize={'sm'}
                flex={1}
                numberOfLines={1}
                flexWrap={'wrap'}
                fontWeight={'300'}>{`${store.slogan}`}</Text>
            </HStack>
          </VStack>
          <IconButton
            onPress={() => handleFavorite()}
            icon={
              <Icon
                size={7}
                name={isOnFavorites ? 'cards-heart' : 'cards-heart-outline'}
                as={MaterialCommunityIcons}
              />
            }
            variant={'ghost'}
            zIndex={1}
            colorScheme={'primary'}
          />
        </HStack>
      </VStack>
    </Pressable>
  )
}
