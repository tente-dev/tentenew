import { RootState } from '@store'
import { useCallback, useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useApiServiceMutation } from 'shared/api'
import { User } from '../types/user'
import { deleteSession, saveUser } from '../slice/auth'
import { useShowToast, useFeedback } from 'shared/feedback'
import { useFavorites } from 'modules/stores/hooks/favorite'
import { resetStoreState, useUserStoreInfo } from 'modules/stores'
import { useGetStoreRequests } from 'modules/stores/hooks/requests'

export const useUserInfo = () => {
  const user = useSelector((state: RootState) => state.auth.user)
  const isAuthenticated = Boolean(user)
  const token = useSelector((state: RootState) => state.auth.token)
  const userId = useSelector((state: RootState) => state.auth.user?.id)
  const dispatch = useDispatch()
  const [apiService] = useApiServiceMutation()
  const { showToast } = useShowToast()
  const { openLoadingModal, closeLoadingModal, checkRegisterStoreModal } =
    useFeedback()
  const { getFavorites } = useFavorites()
  const { getStoreByUser } = useUserStoreInfo()
  const { getStoreRequests } = useGetStoreRequests()

  const getUserInfo = useCallback(async () => {
    if (token) {
      try {
        openLoadingModal()
        const user = (await apiService({
          method: 'GET',
          url: 'users',
        }).unwrap()) as User
        dispatch(saveUser(user))
        checkRegisterStoreModal()
        if (user.admin) {
          await getStoreRequests()
        }
      } catch (error) {
        console.log(error)
        dispatch(deleteSession())
        dispatch(resetStoreState())
        showToast(
          'error',
          'Hubo un error al obtener tu información de usuario...',
        )
      }
    }
    return { isAuthenticated }
  }, [token])

  const getStoreUserInfo = useCallback(async () => {
    if (userId) {
      try {
        openLoadingModal()
        await getFavorites()
        await getStoreByUser()
      } catch (error) {
        console.log(error)
        dispatch(deleteSession())
        showToast(
          'error',
          'Hubo un error al obtener tu información de usuario...',
        )
      } finally {
        closeLoadingModal()
      }
    }
  }, [userId])

  useEffect(() => {
    getStoreUserInfo()
  }, [getStoreUserInfo])

  useEffect(() => {
    getUserInfo()
  }, [getUserInfo])

  return { isAuthenticated }
}

export const useUserAvatar = () => {
  const user = useSelector((state: RootState) => state.auth.user)
  const avatar = useMemo(() => {
    return `https://api.dicebear.com/6.x/thumbs/png?seed=${
      user?.email ?? 'tente'
    }`
  }, [user?.email])
  return {
    avatar,
  }
}

export const useIsAuthenticated = () => {
  const user = useSelector((state: RootState) => state.auth.user)
  const isAuthenticated = Boolean(user)

  return {
    isAuthenticated,
  }
}
