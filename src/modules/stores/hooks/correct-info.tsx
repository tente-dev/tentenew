import { RootState } from 'shared/store'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { BranchPayload, RegistrationProcess } from '../types/store'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker'
import { NonAcceptedFields } from './requests'
import { useShowToast } from 'shared/feedback'
import { useApiServiceMutation } from 'shared/api'
import {
  NavigationProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native'
import { LatLng } from 'react-native-maps'
import { multipartHeader } from 'shared/api/utils'

export const useCorrectInfo = () => {
  const navigation = useNavigation<NavigationProp<any>>()
  const route = useRoute()
  const { showToast } = useShowToast()
  const params: LatLng & { id: number } = route.params as any
  const storedStore = useSelector((state: RootState) => state.stores.store)
  const [apiService, { isLoading: loading }] = useApiServiceMutation()
  const [store, setStore] = useState<RegistrationProcess['storeInfo']>({
    ...storedStore,
    logo: storedStore?.logo.path ?? '',
  } as RegistrationProcess['storeInfo'])

  const [socialMedia, setSocialMedia] = useState<
    RegistrationProcess['socialMedia']
  >({
    ...storedStore?.socialMedia,
  } as RegistrationProcess['socialMedia'])

  const [owner, setOwner] = useState<RegistrationProcess['owner']>({
    ...storedStore?.owner,
    identificationPhoto: storedStore?.owner?.photo?.path,
  } as RegistrationProcess['owner'])

  const [branches, setBranches] = useState<RegistrationProcess['branches']>(
    storedStore?.branches.map(s => ({
      ...(s as any),
    })) as RegistrationProcess['branches'],
  )

  const changeStoreInfoValue = (
    key: keyof RegistrationProcess['storeInfo'],
    value: any,
  ) => {
    setStore(current => ({
      ...current,
      [key]: value,
    }))
  }

  const changeOwnerValue = (
    key: keyof RegistrationProcess['owner'],
    value: any,
  ) => {
    setOwner(current => ({
      ...current,
      [key]: value,
    }))
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

  const takeIdentificationPhoto = async () => {
    try {
      const result = await launchCamera({ mediaType: 'photo' })
      if (result && result.assets) {
        changeOwnerValue('identificationPhoto', result.assets[0].uri)
      }
      console.log(result)
    } catch (error) {
      console.log(error)
    }
  }

  const changeSocialMediaValue = (
    key: keyof RegistrationProcess['socialMedia'],
    value: any,
  ) => {
    setSocialMedia(current => ({
      ...current,
      [key]: value,
    }))
  }

  const changeBranchValue = (index: number, value: BranchPayload) => {
    setBranches(current => current.map((c, i) => (i === index ? value : c)))
  }

  const checkRequiredFields = () => {
    const fields = JSON.parse(
      storedStore?.nonAcceptedFields ?? '',
    ) as NonAcceptedFields
    if (fields.branches?.includes('name') && !store.name) {
      showToast(
        'error',
        'Ingresa un nombre para continuar',
        'Campos requeridos',
      )
      return false
    }
    if (fields.branches?.includes('str') && !store.name) {
      showToast('error', 'Ingresa tu RUC para continuar', 'Campos requeridos')
      return false
    }
    if (fields.owner?.includes('fullName') && !owner.fullName) {
      showToast(
        'error',
        'Ingresa el nombre de propietario para continuar',
        'Campos requeridos',
      )
      return false
    }
    if (fields.owner?.includes('email') && !owner.email) {
      showToast(
        'error',
        'Ingresa el email de propietario para continuar',
        'Campos requeridos',
      )
      return false
    }
    if (fields.owner?.includes('identification') && !owner.identification) {
      showToast(
        'error',
        'Ingresa el email de propietario para continuar',
        'Campos requeridos',
      )
      return false
    }
    for (const branch of branches) {
      if (fields.branches?.includes(String((branch as any).id))) {
        if (!branch.name) {
          showToast(
            'error',
            'Toda sucursale debe tener un nombre',
            'Campos requeridos',
          )
          return false
        }
      }
    }
    return true
  }

  useEffect(() => {
    if (
      params?.latitude !== undefined &&
      params?.longitude !== undefined &&
      params?.id
    ) {
      setBranches(current => {
        return current.map(c =>
          (c as any).id === params.id
            ? { ...c, lat: params.latitude, long: params.longitude }
            : c,
        )
      })
    }
  }, [params?.latitude, params?.longitude, params?.id])

  const updateStore = async () => {
    const validFields = checkRequiredFields()
    if (validFields) {
      const nonAcceptedFields = JSON.parse(
        storedStore?.nonAcceptedFields ?? '',
      ) as NonAcceptedFields
      try {
        if (nonAcceptedFields.store) {
          await apiService({
            method: 'PATCH',
            url: `stores/${storedStore?.id}`,
            body: {
              id: storedStore?.id,
              name: store.name,
              slogan: store.slogan,
              str: store.str,
              description: store.description,
              verified: 0,
              createdBy: storedStore?.createdBy,
              logoId: storedStore?.logoId,
              ownerId: storedStore?.ownerId,
              nonAcceptedFields: '',
            } as any,
          }).unwrap()
        }
        if (nonAcceptedFields.owner) {
          await apiService({
            method: 'PATCH',
            url: `owners/${storedStore?.ownerId}`,
            body: {
              id: storedStore?.ownerId,
              fullName: owner.fullName,
              email: owner.email,
              identification: owner.identification,
              identificationPhotoId: storedStore?.owner?.identificationPhotoId,
              verified: 0,
            } as any,
          }).unwrap()
        }
        if (nonAcceptedFields.socialMedia) {
          await apiService({
            method: 'PATCH',
            url: `social-media/${storedStore?.socialMedia.id}`,
            body: {
              ...socialMedia,
            } as any,
          }).unwrap()
        }
        if (nonAcceptedFields.branches) {
          for (const branch of branches) {
            const updatedBranch = branches.find(b =>
              nonAcceptedFields.branches?.includes(String((branch as any).id)),
            )
            if (updatedBranch) {
              await apiService({
                method: 'PATCH',
                url: `branches/${(branch as any).id}`,
                body: {
                  id: (branch as any).id,
                  name: branch.name,
                  bankTransferAsPaymentMethod: Number(
                    branch.bankTransferAsPaymentMethod,
                  ),
                  debitCardAsPaymentMethod: Number(
                    branch.debitCardAsPaymentMethod,
                  ),
                  creditCardAsPaymentMethod: Number(
                    branch.creditCardAsPaymentMethod,
                  ),
                  homeDelivery: Number(branch.homeDelivery),
                  lat: branch.lat ?? undefined,
                  long: branch.long ?? undefined,
                  storeId: storedStore?.id,
                } as any,
              }).unwrap()
            }
          }
        }
        if (
          nonAcceptedFields.store?.includes('logo') &&
          store.logo !== storedStore?.logo.path
        ) {
          const storeFormData = new FormData()
          storeFormData.append('file', {
            uri: store.logo,
            name: `logo_${Date.now()}.png`,
            type: 'image/png',
          })
          await apiService({
            headers: multipartHeader,
            method: 'PATCH',
            url: `files/${storedStore?.logoId}`,
            body: storeFormData,
          }).unwrap()
        }
        if (
          nonAcceptedFields.owner?.includes('identificationPhoto') &&
          owner.identificationPhoto !== storedStore?.owner.photo.path
        ) {
          const ownerFormData = new FormData()
          ownerFormData.append('file', {
            uri: owner.identificationPhoto,
            name: `owner_${Date.now()}.png`,
            type: 'image/png',
          })
          await apiService({
            headers: multipartHeader,
            method: 'PATCH',
            url: `files/${storedStore?.owner.identificationPhotoId}`,
            body: ownerFormData,
          }).unwrap()
        }
        showToast(
          'success',
          'Revisaremos tus cambios lo mas pronto posible',
          'Información actualizada',
        )
        navigation.goBack()
      } catch (error) {
        showToast('error', 'Error actualizando informción de tienda')
        console.log(JSON.stringify(error))
      }
    }
  }

  return {
    store,
    socialMedia,
    owner,
    branches,
    loading,
    changeStoreInfoValue,
    changeSocialMediaValue,
    selectLogoFile,
    changeOwnerValue,
    changeBranchValue,
    takeIdentificationPhoto,
    updateStore,
  }
}
