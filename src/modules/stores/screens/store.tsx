import { useNavigation, useRoute, useTheme } from '@react-navigation/native'
import { ScrollView } from 'native-base'
import React, { useEffect } from 'react'
import { StoreBranch as IStoreBranch } from '../types/store'
import { StoreBranchInfo } from '../components/store-info'
import { StatusBar } from 'react-native'

export const StoreBranchInformation = () => {
  const route = useRoute()
  const params = route.params as any
  const item: IStoreBranch | undefined = params?.item
  const navigation = useNavigation()
  const theme = useTheme()

  useEffect(() => {
    if (!item) {
      navigation.goBack()
    } else {
      navigation.setOptions({
        title: item.store.name,
      })
    }
  }, [item, navigation])

  return (
    <ScrollView _contentContainerStyle={{ px: '7.5%', py: 4 }} flex={1}>
      <StatusBar
        translucent={false}
        backgroundColor={theme.colors.background}
      />
      {item && <StoreBranchInfo item={item} />}
    </ScrollView>
  )
}
