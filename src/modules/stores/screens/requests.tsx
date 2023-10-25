import React, { useCallback } from 'react'
import { useGetStoreRequests } from '../hooks/requests'
import { FlatList, View, Text } from 'native-base'
import { StoreRequestItem } from '../components/store-request-item'
import { StatusBar } from 'react-native'
import { useFocusEffect, useTheme } from '@react-navigation/native'
import { COLORS, APP_BAR_HEIGHT } from 'shared/styles'

export const Requests = () => {
  const { requests, getStoreRequests } = useGetStoreRequests()
  const theme = useTheme()

  useFocusEffect(
    useCallback(() => {
      getStoreRequests()
    }, [getStoreRequests]),
  )

  return (
    <View
      flex={1}
      bgColor={COLORS.primary[50]}
      paddingTop={StatusBar.currentHeight}>
      <View
        style={{ height: APP_BAR_HEIGHT }}
        justifyContent={'center'}
        alignItems={'center'}>
        <Text fontWeight={'700'} textAlign={'center'} fontSize={'lg'}>
          {'Solicitudes'}
        </Text>
      </View>
      <FlatList
        data={requests}
        _contentContainerStyle={{
          px: '7.5%',
          py: 4,
        }}
        disableScrollViewPanResponder
        flexGrow={1}
        renderItem={info => {
          const { item } = info
          return (
            <StoreRequestItem
              item={item}
              key={`store_request_${info.item.id}`}
            />
          )
        }}
      />
    </View>
  )
}
