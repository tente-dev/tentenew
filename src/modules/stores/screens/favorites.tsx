import React, { useCallback } from 'react'
import { useFavorites } from '../hooks/favorite'
import {
  NavigationProp,
  useFocusEffect,
  useNavigation,
} from '@react-navigation/native'
import { FlatList, Text, View } from 'native-base'
import { FavoriteItem } from '../components/favorite-item'
import { APP_BAR_HEIGHT, COLORS } from 'shared/styles'
import { AuthenticatedScreen } from 'modules/auth'
import { StatusBar } from 'react-native'
import { EmptyList } from 'shared/components/empty-list'
import { useGetStoreBranches } from '../hooks/store'

type Props = {}

export const Favorites = (props: Props) => {
  const { favorites, getFavorites } = useFavorites()
  const { stores } = useGetStoreBranches()
  const navigation = useNavigation<NavigationProp<any>>()

  const handleNavigate = (storeId: number, branchId: number) => {
    const item = stores.find(
      s => s.store.id === storeId && s.branch.id === branchId,
    )
    if (!item) return
    navigation.navigate('StoreBranchInformation', {
      item,
    })
  }

  useFocusEffect(
    useCallback(() => {
      getFavorites()
    }, [getFavorites]),
  )

  return (
    <AuthenticatedScreen description="Inicia sesión para ver tus tiendas favoritas">
      <View
        flex={1}
        bgColor={COLORS.primary[50]}
        paddingTop={StatusBar.currentHeight}>
        <View
          style={{ height: APP_BAR_HEIGHT }}
          justifyContent={'center'}
          alignItems={'center'}>
          <Text fontWeight={'700'} textAlign={'center'} fontSize={'lg'}>
            {'Favoritos'}
          </Text>
        </View>
        <FlatList
          data={favorites}
          _contentContainerStyle={{
            px: '7.5%',
            flex: 1,
            py: 4,
          }}
          ListEmptyComponent={() => (
            <EmptyList
              description="No tienes favoritos agregados"
              containerProps={{
                paddingBottom: (StatusBar.currentHeight ?? 0) + APP_BAR_HEIGHT,
              }}
            />
          )}
          renderItem={info => {
            const { item: favorite } = info
            return (
              <FavoriteItem
                key={`favorite_${favorite.id}`}
                favorite={favorite}
                onNavigate={handleNavigate}
              />
            )
          }}
        />
      </View>
    </AuthenticatedScreen>
  )
}
