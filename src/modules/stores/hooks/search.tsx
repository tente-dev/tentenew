import { useFocusEffect } from '@react-navigation/native'
import { useCallback, useState } from 'react'
import { useGetStoreBranches } from './store'

export const useSearch = () => {
  const { stores, getStoreBranches } = useGetStoreBranches()
  const [name, setName] = useState('')
  const resetName = () => setName('')
  const changeName = (value: string) => setName(value)
  useFocusEffect(
    useCallback(() => {
      getStoreBranches()
    }, [getStoreBranches]),
  )
  const filtered = useCallback(() => {
    if (!name) return stores
    return stores.filter(s =>
      s.store.name.toUpperCase().includes(name.toUpperCase()),
    )
  }, [name, stores])
  return {
    stores: filtered(),
    name,
    changeName,
    resetName,
  }
}
