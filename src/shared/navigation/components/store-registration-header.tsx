import { NativeStackHeaderProps } from '@react-navigation/native-stack'
import { HStack, Icon, IconButton, Text, VStack, View } from 'native-base'
import React from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { APP_BAR_HEIGHT, TEXT_COLORS } from 'shared/styles'

const STEPS = [
  {
    label: 'Inf. General',
    route: 'StoreInfo',
  },
  {
    label: 'Propietario',
    route: 'Owner',
  },
  {
    label: 'Sucursales',
    route: 'Branches',
  },
]

export const StoreRegistrationHeader = (props: NativeStackHeaderProps) => {
  const { route } = props
  return (
    <View>
      <HStack pt={2} alignItems={'center'} space={1}>
        <IconButton
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
        <Text fontWeight={'700'} textAlign={'center'} fontSize={'lg'}>
          {'Registro de tienda'}
        </Text>
      </HStack>
      <HStack px={4}>
        {STEPS.map(step => (
          <VStack
            key={step.label}
            width={'33%'}
            alignItems={'center'}
            justifyContent={'center'}
            px={2}
            space={2}
            opacity={route.name === step.route ? 1 : 0.3}>
            <Text
              color={route.name === step.route ? 'primary.500' : undefined}
              textAlign={'center'}>
              {step.label}
            </Text>
            <View
              borderRadius={'full'}
              height={1}
              width={'100%'}
              bgColor={
                route.name === step.route ? 'primary.500' : TEXT_COLORS.primary
              }></View>
          </VStack>
        ))}
      </HStack>
    </View>
  )
}
