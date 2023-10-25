import { useEffect, useRef, useState } from 'react'
import { BranchPayload } from '../types/store'
import { TextInput } from 'react-native'
import { useRoute } from '@react-navigation/native'
import { LatLng } from 'react-native-maps'
import { useDispatch } from 'react-redux'
import { addBranch } from '../slice/store'
import DocumentPicker from 'react-native-document-picker'

interface Errors {
  name: boolean
}

export const useRegisterBranch = (initialPayload?: BranchPayload) => {
  const route = useRoute()
  const dispatch = useDispatch()
  const params = route.params as LatLng
  const branchNameRef = useRef<TextInput>(null)
  const [errors, setErrors] = useState<Errors>({ name: false })
  const [payload, setPayload] = useState(
    initialPayload ??
      ({
        bankTransferAsPaymentMethod: false,
        creditCardAsPaymentMethod: false,
        debitCardAsPaymentMethod: false,
        homeDelivery: false,
      } as BranchPayload),
  )
  const changeValue = (key: keyof BranchPayload, value: any) => {
    setPayload(current => ({
      ...current,
      [key]: value,
    }))
  }
  const resetLocation = () => {
    setPayload(current => ({
      ...current,
      lat: undefined as any,
      long: undefined as any,
    }))
  }
  const selectProductCatalogue = async () => {
    try {
      const result = await DocumentPicker.pickSingle({
        type: ['application/pdf'],
      })
      changeValue('productsCatalogue', result.uri)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (params?.latitude !== undefined && params?.longitude !== undefined) {
      setPayload(current => ({
        ...current,
        lat: params?.latitude,
        long: params?.longitude,
      }))
    }
  }, [params?.latitude, params?.longitude])

  const submit = () => {
    setErrors({ name: false })
    if (!payload.name) {
      setErrors(current => ({ ...current, name: true }))
      branchNameRef.current?.focus()
      return
    }
    dispatch(addBranch(payload))
  }

  return {
    payload,
    errors,
    refs: {
      branchNameRef,
    },
    changeValue,
    resetLocation,
    submit,
    selectProductCatalogue,
  }
}
