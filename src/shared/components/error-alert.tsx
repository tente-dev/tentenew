import { Alert, HStack, Icon, IconButton, Text, VStack } from 'native-base'
import { IAlertProps } from 'native-base/lib/typescript/components/composites/Alert/types'
import React, { Fragment, useEffect, useState } from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

type Props = {
  message?: string
  alertProps?: IAlertProps
}

export const ErrorAlert = (props: Props) => {
  const { message, alertProps } = props
  const [show, setShow] = useState(false)

  useEffect(() => {
    setShow(Boolean(message))
  }, [message])

  return (
    <Fragment>
      {show ? (
        <Alert
          {...alertProps}
          w="100%"
          colorScheme={'error'}
          borderRadius={19}
          bgColor={'error.50'}>
          <VStack space={2} flexShrink={1} w="100%">
            <HStack flexShrink={1} space={2} justifyContent="space-between">
              <HStack space={2} flexShrink={1} alignItems={'center'}>
                <IconButton
                  pointerEvents="none"
                  opacity={0.7}
                  colorScheme={'error'}
                  icon={<Icon size={25} as={MaterialIcons} name="error" />}
                />
                <Text color="coolGray.800" maxW={'80%'} fontSize={13}>
                  {message}
                </Text>
              </HStack>
              <IconButton
                colorScheme={'error'}
                _icon={{
                  color: 'coolGray.600',
                }}
                icon={<Icon size={22} as={MaterialIcons} name="close" />}
                onPress={() => setShow(false)}
              />
            </HStack>
          </VStack>
        </Alert>
      ) : undefined}
    </Fragment>
  )
}
