import { useTheme } from '@react-navigation/native'
import { CircleIcon, HStack, Icon, Slide, Text, VStack } from 'native-base'
import React, { forwardRef, useImperativeHandle, useState } from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { PasswordValidations } from '../hooks/password'

type Props = {
  validations: PasswordValidations
  placement?: 'top' | 'right' | 'bottom' | 'left' | undefined
}
export type PasswordStrengthRef = { open: () => void; close: () => void }

export const PasswordStrength = forwardRef<PasswordStrengthRef, Props>(
  (props, ref) => {
    const { validations, placement } = props
    const theme = useTheme()
    const [show, setShow] = useState(false)
    useImperativeHandle(ref, () => ({
      open: () => setShow(true),
      close: () => setShow(false),
    }))
    return (
      <Slide in={show} placement={placement ?? 'top'}>
        <VStack py={4} bgColor={theme.colors.background} px="7.5%">
          <Text fontWeight={'700'}>{'Tu contraseña debe tener:'}</Text>
          <HStack
            opacity={validations.uppercase ? 1 : 0.5}
            mt={2}
            alignItems={'center'}
            space={1}>
            <Icon
              as={MaterialCommunityIcons}
              size={4}
              color={validations.uppercase ? 'success.500' : undefined}
              name={validations.uppercase ? 'check-circle' : 'circle-small'}
            />
            <Text
              color={validations.uppercase ? 'success.500' : undefined}
              fontSize={'xs'}>
              {'Al menos una letra mayúscula.'}
            </Text>
          </HStack>
          <HStack
            opacity={validations.lowercase ? 1 : 0.5}
            alignItems={'center'}
            space={1}>
            <Icon
              as={MaterialCommunityIcons}
              size={4}
              color={validations.lowercase ? 'success.500' : undefined}
              name={validations.lowercase ? 'check-circle' : 'circle-small'}
            />
            <Text
              color={validations.lowercase ? 'success.500' : undefined}
              fontSize={'xs'}>
              {'Al menos una letra minúscula.'}
            </Text>
          </HStack>
          <HStack
            opacity={validations.numeric ? 1 : 0.5}
            alignItems={'center'}
            space={1}>
            <Icon
              as={MaterialCommunityIcons}
              size={4}
              color={validations.numeric ? 'success.500' : undefined}
              name={validations.numeric ? 'check-circle' : 'circle-small'}
            />
            <Text
              color={validations.numeric ? 'success.500' : undefined}
              fontSize={'xs'}>
              {'Un caracter numérico.'}
            </Text>
          </HStack>
          <HStack
            opacity={validations.special ? 1 : 0.5}
            alignItems={'center'}
            space={1}>
            <Icon
              as={MaterialCommunityIcons}
              size={4}
              color={validations.special ? 'success.500' : undefined}
              name={validations.special ? 'check-circle' : 'circle-small'}
            />
            <Text
              color={validations.special ? 'success.500' : undefined}
              fontSize={'xs'}>
              {'Un caracter especial.'}
            </Text>
          </HStack>
          <HStack
            opacity={validations.length ? 1 : 0.5}
            alignItems={'center'}
            space={1}>
            <Icon
              as={MaterialCommunityIcons}
              size={4}
              color={validations.length ? 'success.500' : undefined}
              name={validations.length ? 'check-circle' : 'circle-small'}
            />
            <Text
              color={validations.length ? 'success.500' : undefined}
              fontSize={'xs'}>
              {'8 caracteres como mínimo.'}
            </Text>
          </HStack>
        </VStack>
      </Slide>
    )
  },
)
