import { useNavigation } from '@react-navigation/native'
import { FlatList, HStack, Icon, IconButton, Input, View } from 'native-base'
import React from 'react'
import { Keyboard, StatusBar } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { APP_BAR_HEIGHT, COLORS, TEXT_COLORS } from 'shared/styles'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { useSearch } from '../hooks/search'
import { StoreBrachItem } from '../components/store-brach-item'
import { useFavorites } from '../hooks/favorite'

export const Search = () => {
  const { changeName, name, stores, resetName } = useSearch()
  const navigation = useNavigation()
  const { addToFavorites, removeFromFavorites, favorites } = useFavorites()
  return (
    <View flex={1}>
      <StatusBar backgroundColor={COLORS.primary[50]} translucent={false} />
      <HStack
        bgColor={COLORS.primary[50]}
        pt={3}
        pb={3}
        pr={6}
        alignItems={'center'}>
        <IconButton
          _pressed={{ bgColor: 'transparent' }}
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
        <Input
          isFocused
          placeholder="Buscar tiendas por nombre..."
          variant="filled"
          flexGrow={1}
          borderRadius="10"
          py="1"
          px="4"
          value={name}
          onChangeText={value => {
            changeName(value)
          }}
          height={46}
          InputRightElement={
            <Icon
              onPress={() => {
                if (name) {
                  resetName()
                } else {
                  Keyboard.dismiss()
                }
              }}
              ml="2"
              mr="4"
              size="5"
              color="gray.400"
              as={<MaterialIcons name={name ? 'cancel' : 'search'} />}
            />
          }
        />
      </HStack>
      <FlatList
        data={stores}
        _contentContainerStyle={{ px: '7.5%', py: 10 }}
        disableScrollViewPanResponder
        flexGrow={1}
        renderItem={info => {
          const { item } = info
          return (
            <StoreBrachItem
              item={item}
              key={`store_branch_${info.item.branch.id}`}
              addToFavorites={addToFavorites}
              removeFromFavorites={removeFromFavorites}
              favorites={favorites}
            />
          )
        }}
      />
    </View>
  )
}
