import { useCallback, useEffect, useState } from 'react'
import { Filters, useApiServiceMutation } from 'shared/api'
import { Store, StoreBranch } from '../types/store'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'shared/store'
import { Favorite } from '../types/favorite'
import { updateFavorites } from '../slice/store'
import { useShowToast } from 'shared/feedback'
import { Branch } from '../types/branch'
import { useIsAuthenticated } from 'modules/auth/hooks/user-info'
import { useNavigationActions } from 'shared/navigation'

const FAVORITE_FILTERS = {
  include: [
    {
      relation: 'branch',
      scope: {
        include: [{ relation: 'store', scope: { include: ['logo'] } }],
      },
    },
  ],
}

export const useFavorites = () => {
  const dispatch = useDispatch()
  const { showToast } = useShowToast()
  const { navigateToLogin } = useNavigationActions()
  const { isAuthenticated } = useIsAuthenticated()
  const [apiService, { isLoading: loading }] = useApiServiceMutation()
  const favorites = useSelector((state: RootState) => state.stores.favorites)
  const userId = useSelector((state: RootState) => state.auth.user?.id)
  const getFavorites = useCallback(async () => {
    if (!isAuthenticated || !userId) return
    try {
      const result = (await apiService({
        method: 'GET',
        url: '/favorites',
        params: {
          filter: JSON.stringify({ ...FAVORITE_FILTERS, where: { userId } }),
        },
      }).unwrap()) as Favorite[]
      dispatch(updateFavorites(result))
    } catch (error) {
      console.log(JSON.stringify(error))
    }
  }, [isAuthenticated, userId])

  const removeFromFavorites = async (favorite: Favorite) => {
    try {
      await apiService({
        method: 'DELETE',
        url: `/favorites/${favorite.id}`,
      }).unwrap()
      const newFavorites = [...favorites].filter(f => f.id !== favorite.id)
      console.log('newFavorites', newFavorites)
      dispatch(updateFavorites(newFavorites))
      showToast(
        'success',
        'Eliminado de favoritos',
        `${favorite.branch.store.name} - ${favorite.branch.name}`,
      )
    } catch (error) {
      console.log(error)
      showToast('error', 'Error', 'No se pudo eliminar el favorito...')
    }
  }

  const addToFavorites = async (branch: Branch, store: Store) => {
    if (!isAuthenticated) {
      showToast('warning', 'Inicia sesion para agregar favoritos')
      navigateToLogin()
      return
    }
    if (!userId) return
    try {
      await apiService({
        method: 'POST',
        url: `/favorites`,
        body: {
          branchId: branch.id,
          userId: userId,
        },
      }).unwrap()
      showToast(
        'success',
        'Agregado a favoritos',
        `${store.name} - ${branch.name}`,
      )
      await getFavorites()
    } catch (error) {
      console.log(error)
      showToast('error', 'Error', 'No se pudo agregar el favorito...')
    }
  }

  const getFavoriteByBranch = (branchId: number) => {
    const favorite = favorites.find(
      f => f.branchId === branchId && f.userId === userId,
    )
    return favorite
  }

  useEffect(() => {
    getFavorites()
  }, [getFavorites])

  return {
    getFavorites,
    removeFromFavorites,
    addToFavorites,
    getFavoriteByBranch,
    favorites,
    loading,
  }
}
