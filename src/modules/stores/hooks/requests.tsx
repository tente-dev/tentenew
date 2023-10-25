import { useState, useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useApiServiceMutation } from 'shared/api'
import { RootState } from 'shared/store'
import { updateRequests } from '../slice/store'
import { Store } from '../types/store'
import { useIsAuthenticated } from 'modules/auth/hooks/user-info'

const STORE_FILTERS = {
  include: [
    { relation: 'logo' },
    { relation: 'branches', scope: { include: [{ relation: 'catalogue' }] } },
    { relation: 'socialMedia' },
    { relation: 'owner', scope: { include: [{ relation: 'photo' }] } },
  ],
}

export const useGetStoreRequests = () => {
  const dispatch = useDispatch()
  const { isAuthenticated } = useIsAuthenticated()
  const [apiService, { isLoading: loading }] = useApiServiceMutation()
  const isAdmin = useSelector((state: RootState) => state.auth.user?.admin)
  const requests = useSelector((state: RootState) => state.stores.requests)
  const getStoreRequests = useCallback(async () => {
    if (!isAdmin || !isAuthenticated) return
    try {
      const result = (await apiService({
        method: 'GET',
        url: '/stores',
        params: {
          filter: JSON.stringify({
            ...STORE_FILTERS,
            where: { verified: false },
          }),
        },
      }).unwrap()) as Store[]
      dispatch(updateRequests(result))
    } catch (error) {
      console.log(JSON.stringify(error))
    }
  }, [isAdmin, isAuthenticated])

  useEffect(() => {
    getStoreRequests()
  }, [getStoreRequests])

  return {
    getStoreRequests,
    requests,
    loading,
  }
}

export interface NonAcceptedBranch {
  [key: number]: string[]
}

export interface NonAcceptedFields {
  store?: string[]
  owner?: string[]
  socialMedia?: string[]
  branches?: string[]
  note?: string
}

export const useRequestFields = () => {
  const [nonAcceptedFields, setNonAcceptedFields] =
    useState<NonAcceptedFields>()

  const toggleField = (key: keyof NonAcceptedFields, value: string) => {
    setNonAcceptedFields(current => {
      let array = (current ?? ({} as NonAcceptedFields))[key] ?? []
      if (Array.isArray(array)) {
        const includesValue = array.includes(value)
        if (includesValue) {
          array = array.filter(a => a !== value)
        } else {
          array = [...array, value]
        }
        return { ...current, [key]: array as string[] }
      }
      return current
    })
  }

  const updateNote = (value: string) => {
    setNonAcceptedFields(current => ({ ...current, note: value }))
  }

  const storeNameRejected = Boolean(nonAcceptedFields?.store?.includes('name'))
  const storeSloganRejected = Boolean(
    nonAcceptedFields?.store?.includes('slogan'),
  )
  const storeStrRejected = Boolean(nonAcceptedFields?.store?.includes('str'))
  const storeDescriptionRejected = Boolean(
    nonAcceptedFields?.store?.includes('description'),
  )
  const storeLogoRejected = Boolean(nonAcceptedFields?.store?.includes('logo'))
  const instagramRejected = Boolean(
    nonAcceptedFields?.socialMedia?.includes('instagram'),
  )
  const whatsappRejected = Boolean(
    nonAcceptedFields?.socialMedia?.includes('whatsapp'),
  )
  const facebookRejected = Boolean(
    nonAcceptedFields?.socialMedia?.includes('facebook'),
  )
  const tiktokRejected = Boolean(
    nonAcceptedFields?.socialMedia?.includes('tiktok'),
  )
  const ownerNameRejected = Boolean(
    nonAcceptedFields?.owner?.includes('fullName'),
  )
  const ownerEmailRejected = Boolean(
    nonAcceptedFields?.owner?.includes('email'),
  )
  const ownerIdentificationRejected = Boolean(
    nonAcceptedFields?.owner?.includes('identification'),
  )
  const ownerIdentificationPhotoRejected = Boolean(
    nonAcceptedFields?.owner?.includes('identificationPhoto'),
  )

  const isBranchRejected = (id: number) => {
    return nonAcceptedFields?.branches?.includes(id.toString())
  }

  return {
    toggleField,
    nonAcceptedFields,
    storeNameRejected,
    storeSloganRejected,
    storeStrRejected,
    storeDescriptionRejected,
    storeLogoRejected,
    instagramRejected,
    whatsappRejected,
    facebookRejected,
    tiktokRejected,
    ownerEmailRejected,
    ownerIdentificationPhotoRejected,
    ownerIdentificationRejected,
    ownerNameRejected,
    isBranchRejected,
    updateNote,
  }
}
