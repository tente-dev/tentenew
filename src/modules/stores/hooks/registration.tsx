import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'shared/store'
import {
  updateBranches,
  updateCurrentStep,
  updateOwner,
  updateOwnerInfoValues,
  updateSocialMediaValues,
  updateStore,
  updateStoreInfoValues,
} from '../slice/store'
import { TextInput } from 'react-native'
import { launchImageLibrary, launchCamera } from 'react-native-image-picker'
import { EventArg } from '@react-navigation/native'
import { useNavigationActions } from 'shared/navigation'
import { EmailRegEx } from 'modules/auth/constants/regex'
import { useShowToast } from 'shared/feedback'
import { useApiServiceMutation } from 'shared/api'
import { Owner } from '../types/owner'
import { RegistrationProcess, Store } from '../types/store'
import { multipartHeader } from 'shared/api/utils'
import { Branch } from '../types/branch'

interface StoreInfoErrors {
  name: boolean
  str: boolean
}

interface OwnerInfoErrors {
  fullName: boolean
  email: boolean
  identification: boolean
}

const FILE_KEYS = ['identificationPhoto', 'logo']

export const useRegistrationProcess = () => {
  /** General */
  const [apiService, { isLoading: loading }] = useApiServiceMutation()
  const { showToast } = useShowToast()
  const registrationProcess = useSelector(
    (state: RootState) => state.stores.registrationProcess,
  )
  const { currentStep, storeInfo, owner, branches, socialMedia } =
    registrationProcess
  const dispatch = useDispatch()
  const tabPressHandler = (
    e: EventArg<'tabPress', true, undefined>,
    requestedStep: number,
  ) => {
    if (currentStep >= requestedStep || loading) {
      return
    }
    e.preventDefault()
  }
  const { navigateToOwnerInfo, navigateToBranches, resetToMaps } =
    useNavigationActions()

  /** General */

  /** Store info */
  const [storeInfoErrors, setStoreInfoErrors] = useState<StoreInfoErrors>({
    name: false,
    str: false,
  })
  const storeNameRef = useRef<TextInput>(null)
  const storeSloganRef = useRef<TextInput>(null)
  const storeStrRef = useRef<TextInput>(null)
  const storeDescriptionRef = useRef<TextInput>(null)
  const changeStoreInfoValue = (
    key: keyof (typeof registrationProcess)['storeInfo'],
    value: any,
  ) => {
    dispatch(updateStoreInfoValues({ key, value }))
  }
  const selectLogoFile = async () => {
    try {
      const result = await launchImageLibrary({ mediaType: 'photo' })
      if (result && result.assets) {
        changeStoreInfoValue('logo', result.assets[0].uri)
      }
      console.log(result)
    } catch (error) {
      console.log(error)
    }
  }
  const validateStep = (step: number) => {
    if (step === 1) {
      setStoreInfoErrors({ name: false, str: false })
      if (!storeInfo.name) {
        setStoreInfoErrors(current => ({ ...current, name: true }))
        storeNameRef.current?.focus()
        dispatch(updateCurrentStep(1))
        return false
      }
      if (!storeInfo.str) {
        setStoreInfoErrors(current => ({ ...current, str: true }))
        storeStrRef.current?.focus()
        dispatch(updateCurrentStep(1))
        return false
      }
    }
    if (step === 2) {
      setOwnerInfoErrors({
        email: false,
        fullName: false,
        identification: false,
      })
      if (!owner.fullName) {
        setOwnerInfoErrors(current => ({ ...current, fullName: true }))
        ownerFullNameRef.current?.focus()
        dispatch(updateCurrentStep(2))
        return false
      }
      if (!owner.email || !EmailRegEx.test(owner.email)) {
        setOwnerInfoErrors(current => ({ ...current, email: true }))
        ownerEmailRef.current?.focus()
        dispatch(updateCurrentStep(2))
        return false
      }
      if (!owner.identification) {
        setOwnerInfoErrors(current => ({ ...current, identification: true }))
        ownerIdentificationRef.current?.focus()
        dispatch(updateCurrentStep(2))
        return false
      }
      if (!owner.identificationPhoto) {
        showToast(
          'warning',
          'Sube una foto tuya con tu cédula para continuar...',
          'Campos requeridos!',
        )
        dispatch(updateCurrentStep(2))
        return false
      }
    }
    if (step === 3) {
      if (branches.length === 0) {
        showToast(
          'warning',
          'Registra una sucursal para continuar...',
          'Campos requeridos!',
        )
        dispatch(updateCurrentStep(2))
        return false
      }
    }
    return true
  }
  const completeStoreInfo = () => {
    if (validateStep(1)) {
      dispatch(updateCurrentStep(2))
      navigateToOwnerInfo()
    }
  }

  /** Store info */

  /** Social media */

  const instagramRef = useRef<TextInput>(null)
  const whatsappRef = useRef<TextInput>(null)
  const facebookRef = useRef<TextInput>(null)
  const tiktokRef = useRef<TextInput>(null)
  const changeSocialMediaValue = (
    key: keyof (typeof registrationProcess)['socialMedia'],
    value: any,
  ) => {
    dispatch(updateSocialMediaValues({ key, value }))
  }

  /** Social media */

  /** Owner info */

  const [ownerInfoErrors, setOwnerInfoErrors] = useState<OwnerInfoErrors>({
    fullName: false,
    email: false,
    identification: false,
  })
  const ownerFullNameRef = useRef<TextInput>(null)
  const ownerEmailRef = useRef<TextInput>(null)
  const ownerIdentificationRef = useRef<TextInput>(null)
  const changeOwnerInfoValue = (
    key: keyof (typeof registrationProcess)['owner'],
    value: any,
  ) => {
    dispatch(updateOwnerInfoValues({ key, value }))
  }
  const completeOwnerInfo = () => {
    if (validateStep(2)) {
      dispatch(updateCurrentStep(3))
      navigateToBranches()
    }
  }
  const takeIdentificationPhoto = async () => {
    try {
      const result = await launchCamera({ mediaType: 'photo' })
      if (result && result.assets) {
        changeOwnerInfoValue('identificationPhoto', result.assets[0].uri)
      }
      console.log(result)
    } catch (error) {
      console.log(error)
    }
  }

  /** Owner info */

  const submitRequest = async () => {
    for (let i = 1; i <= 3; i++) {
      const validStep = validateStep(i)
      if (!validStep) {
        return
      }
    }
    try {
      /** Owner */
      const ownerFormData = new FormData()
      for (const key in owner) {
        if (FILE_KEYS.includes(key)) {
          ownerFormData.append('file', {
            uri: owner[key as keyof RegistrationProcess['owner']],
            name: `owner_${Date.now()}.png`,
            type: 'image/png',
          } as any)
        } else {
          ownerFormData.append(
            key,
            String(owner[key as keyof RegistrationProcess['owner']]),
          )
        }
      }
      const ownerResponse = (await apiService({
        headers: multipartHeader,
        url: '/owners',
        method: 'POST',
        body: ownerFormData,
      }).unwrap()) as Owner
      dispatch(updateOwner(ownerResponse))
      /** Owner */
      /** Store */
      const storeFormData = new FormData()
      storeFormData.append('ownerId', String(ownerResponse.id))
      for (const key in storeInfo) {
        if (FILE_KEYS.includes(key)) {
          storeFormData.append('file', {
            uri: storeInfo[key as keyof RegistrationProcess['storeInfo']],
            name: `logo_${Date.now()}.png`,
            type: 'image/png',
          } as any)
        } else {
          storeFormData.append(
            key,
            String(storeInfo[key as keyof RegistrationProcess['storeInfo']]),
          )
        }
      }
      const storeResponse = (await apiService({
        headers: multipartHeader,
        url: '/stores',
        method: 'POST',
        body: storeFormData,
      }).unwrap()) as Store
      dispatch(updateStore(storeResponse))
      /** Store */
      /** Branches */
      const registeredBranches: Branch[] = []
      for (const branch of branches) {
        let fileResponse
        if (branch.productsCatalogue) {
          const productsCatalogueFormData = new FormData()
          productsCatalogueFormData.append('file', {
            uri: branch.productsCatalogue,
            name: `product_catalogue_${Date.now()}.pdf`,
            type: 'application/pdf',
          } as any)
          fileResponse = (await apiService({
            headers: multipartHeader,
            url: '/files',
            method: 'POST',
            body: productsCatalogueFormData,
          }).unwrap()) as any
        }
        delete branch.productsCatalogue
        const branchResponse = (await apiService({
          url: '/branches',
          method: 'POST',
          body: {
            ...branch,
            storeId: storeResponse.id,
            bankTransferAsPaymentMethod: Number(
              branch.bankTransferAsPaymentMethod,
            ),
            creditCardAsPaymentMethod: Number(branch.creditCardAsPaymentMethod),
            debitCardAsPaymentMethod: Number(branch.debitCardAsPaymentMethod),
            homeDelivery: Number(branch.homeDelivery),
            productsCatalogueId: fileResponse?.id,
          } as any,
        }).unwrap()) as Branch
        registeredBranches.push(branchResponse)
      }
      dispatch(updateBranches(registeredBranches))
      /** Branches */
      /** Social Media */
      await apiService({
        url: '/social-media',
        method: 'POST',
        body: {
          instagram: socialMedia.instagram,
          whatsapp: socialMedia.whatsapp,
          facebook: socialMedia.facebook,
          tiktok: socialMedia.tiktok,
          storeId: storeResponse.id,
        },
      }).unwrap()
      /** Social Media */
      showToast(
        'success',
        'Revisaremos tu información lo mas pronto posible!',
        'Solicitud enviada',
      )
      resetToMaps()
    } catch (error) {
      console.log(JSON.stringify(error))
      showToast(
        'error',
        'Hubo un error al enviar tu solicitud',
        'Error de registo',
      )
    }
  }

  return {
    ...registrationProcess,
    storeInfoErrors,
    ownerInfoErrors,
    changeStoreInfoValue,
    changeSocialMediaValue,
    changeOwnerInfoValue,
    selectLogoFile,
    tabPressHandler,
    completeStoreInfo,
    completeOwnerInfo,
    takeIdentificationPhoto,
    submitRequest,
    refs: {
      storeNameRef,
      storeSloganRef,
      storeStrRef,
      storeDescriptionRef,
      instagramRef,
      whatsappRef,
      facebookRef,
      tiktokRef,
      ownerFullNameRef,
      ownerEmailRef,
      ownerIdentificationRef,
    },
    loading,
  }
}
