import { useRoute, useTheme } from '@react-navigation/native'
import { View } from 'native-base'
import React from 'react'
import { Dimensions, StatusBar } from 'react-native'
import Pdf from 'react-native-pdf'

type Props = {}

export const Catalogue = () => {
  const route = useRoute()
  const params = route.params as any
  const catalogue = params?.catalogue ?? ''
  const theme = useTheme()

  return (
    <View flex={1}>
      <StatusBar translucent={false} backgroundColor={theme.colors.card} />
      <Pdf
        trustAllCerts={false}
        source={{
          uri: catalogue,
          cache: true,
        }}
        style={{
          flex: 1,
          backgroundColor: theme.colors.background,
          width: Dimensions.get('window').width,
          height: Dimensions.get('window').height,
        }}
      />
    </View>
  )
}
