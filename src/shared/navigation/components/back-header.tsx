import { NativeStackHeaderProps } from '@react-navigation/native-stack'
import { HStack, Icon, IconButton, Text, View } from 'native-base'
import React from 'react'
import { APP_BAR_HEIGHT, TEXT_COLORS } from '@styles'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useTheme } from '@react-navigation/native'

export const BackHeader = (props: NativeStackHeaderProps) => {
  const theme = useTheme()
  return (
    <View
      style={{ height: APP_BAR_HEIGHT }}
      backgroundColor={theme.colors.background}>
      <HStack
        width={'full'}
        flexGrow={1}
        justifyContent={'center'}
        alignItems={'center'}>
        <IconButton
          _pressed={{ bgColor: 'transparent' }}
          onPress={() => props.navigation.goBack()}
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
        <Text
          fontWeight={'700'}
          textAlign={'center'}
          fontSize={'lg'}
          flexGrow={1}
          maxW={'70%'}>
          {props.options.title ?? props.route.name}
        </Text>
        <View style={{ width: APP_BAR_HEIGHT, height: APP_BAR_HEIGHT }} />
      </HStack>
    </View>
  )
}
