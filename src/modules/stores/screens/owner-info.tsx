import { View } from 'native-base'
import React from 'react'
import { OwnerInfoForm } from '../components/owner-info-form'

export const OwnerInfo = () => {
  return (
    <View flex={1}>
      <OwnerInfoForm />
    </View>
  )
}
