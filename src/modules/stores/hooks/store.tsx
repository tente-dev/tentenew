import { useCallback, useEffect, useState } from 'react'
import { useApiServiceMutation } from 'shared/api'
import { Store, StoreBranch } from '../types/store'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'shared/store'
import { updateStore, updateStoreBranches } from '../slice/store'

const STORE_FILTERS = {
  include: [
    {
      relation: 'owner',
      scope: {
        include: [{ relation: 'photo' }],
      },
    },
    { relation: 'branches', scope: { include: [{ relation: 'catalogue' }] } },
    'logo',
    'socialMedia',
  ],
}

export const useGetStoreBranches = () => {
  const dispatch = useDispatch()
  const [apiService, { isLoading: loading }] = useApiServiceMutation()
  const storeBranches = useSelector(
    (state: RootState) => state.stores.storeBranches,
  )
  const [stores, setStores] = useState<StoreBranch[]>(storeBranches ?? [])
  const getStoreBranches = useCallback(async () => {
    try {
      const result = (await apiService({
        method: 'GET',
        url: '/stores',
        params: {
          filter: JSON.stringify({
            ...STORE_FILTERS,
            where: { verified: true },
          }),
        },
      }).unwrap()) as Store[]
      let storeBranches: StoreBranch[] = []
      for (const store of result) {
        storeBranches = storeBranches.concat(
          store.branches.map(branch => ({
            branch,
            store,
          })),
        )
      }
      setStores(storeBranches)
      dispatch(updateStoreBranches(storeBranches))
    } catch (error) {
      console.log(JSON.stringify(error))
    }
  }, [])

  useEffect(() => {
    getStoreBranches()
  }, [getStoreBranches])

  return {
    getStoreBranches,
    stores,
    loading,
  }
}

export const useUserStoreInfo = () => {
  const userId = useSelector((state: RootState) => state.auth.user?.id)
  const [apiService] = useApiServiceMutation()
  const dispatch = useDispatch()
  const getStoreByUser = useCallback(async () => {
    if (!userId) return
    try {
      const result = (await apiService({
        method: 'GET',
        url: '/stores',
        params: {
          filter: JSON.stringify({
            ...STORE_FILTERS,
            where: { createdBy: userId },
          }),
        },
      }).unwrap()) as Store[]
      if (result[0]) {
        dispatch(updateStore(result[0]))
      }
    } catch (error) {
      console.log(JSON.stringify(error))
    }
  }, [userId])
  return {
    getStoreByUser,
  }
}
