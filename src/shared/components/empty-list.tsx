import { Text, VStack, View } from 'native-base'
import React from 'react'
import { Dimensions } from 'react-native'
import Lottie from 'lottie-react-native'
import { LOTTIE_ANIMATIONS } from 'shared/animations/constants/lottie'
import { InterfaceViewProps } from 'native-base/lib/typescript/components/basic/View/types'

type Props = {
  description?: string
  containerProps?: InterfaceViewProps
}

export const EmptyList = (props: Props) => {
  const width = Dimensions.get('window').width
  const { description, containerProps } = props
  return (
    <View
      {...containerProps}
      flex={1}
      justifyContent={'center'}
      alignItems={'center'}>
      <VStack
        flexGrow={1}
        alignItems={'center'}
        justifyContent={'center'}
        space={3}>
        <Lottie
          style={{
            height: width * 0.5,
          }}
          source={LOTTIE_ANIMATIONS.empty}
          autoPlay
          loop={false}
        />
        <Text fontSize={16} fontWeight={'500'} textAlign={'center'} px={'10%'}>
          {description ?? 'Vacio'}
        </Text>
      </VStack>
    </View>
  )
}
