import { Alert, Box, HStack, Icon, Text, VStack, useToast } from 'native-base'
import { InterfaceToastProps } from 'native-base/lib/typescript/components/composites/Toast'
import React, { useState } from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

interface UseShowToast {
  showToast: (
    status: 'error' | 'success' | 'warning' | 'info' | undefined,
    description?: string,
    title?: string,
    duration?: number,
    placement?: InterfaceToastProps['placement'],
  ) => void
}

export const useShowToast = (): UseShowToast => {
  const toast = useToast()
  const [id, setId] = useState(Math.random().toString())
  const showToast = (
    status: 'error' | 'success' | 'warning' | 'info' | undefined,
    description?: string,
    title?: string,
    duration?: number,
    placement?: InterfaceToastProps['placement'],
  ) => {
    if (!toast.isActive(id)) {
      toast.show({
        id: id,
        duration: duration ?? 3000,
        placement: placement ?? 'bottom',
        render: () => (
          <Alert
            minW={'90%'}
            maxW={'90%'}
            status={status}
            colorScheme={status}
            ml={'5%'}>
            <HStack
              space={1}
              flexShrink={1}
              alignItems="center"
              justifyContent={'flex-start'}
              flexGrow={1}
              width={'100%'}
              px={1}>
              <Icon
                size={25}
                as={MaterialCommunityIcons}
                name="information-outline"
                color={`${status}.500`}
              />
              <VStack ml={2} flexGrow={1}>
                {title && (
                  <HStack>
                    <Text fontSize={14} fontWeight="bold" opacity={0.7}>
                      {title}
                    </Text>
                  </HStack>
                )}
                {description && (
                  <HStack flexDirection={'row'} flexGrow={1}>
                    <Text flex={1} flexWrap={'wrap'}>{`${description}`}</Text>
                  </HStack>
                )}
              </VStack>
            </HStack>
          </Alert>
        ),
      })
      setTimeout(() => {
        setId(Math.random().toString())
      }, duration ?? 2000)
    }
  }

  return {
    showToast,
  }
}
