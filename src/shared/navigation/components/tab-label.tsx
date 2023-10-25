import { Text } from 'native-base'
import React from 'react'

type Props = { focused?: boolean; label: string }

export const TabLabel = ({ focused, label }: Props) => (
  <Text fontSize={12} fontWeight={'600'} opacity={focused ? 1 : 0.3}>
    {label}
  </Text>
)
