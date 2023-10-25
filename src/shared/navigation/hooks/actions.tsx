import {
  CommonActions,
  NavigationProp,
  useNavigation,
} from '@react-navigation/native'
import { SelectLocationRouteParams } from '../types/params'

export const useNavigationActions = () => {
  const navigation = useNavigation<NavigationProp<any>>()
  const resetToMaps = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'BottomTabs' }],
      }),
    )
  }
  const resetToLogin = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [
          { name: 'Welcome' },
          {
            name: 'AuthNavigator',
            params: {
              screen: 'Login',
            },
          },
        ],
      }),
    )
  }
  const resetOnLogout = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          { name: 'BottomTabs' },
          {
            name: 'AuthNavigator',
            params: {
              screen: 'Login',
            },
          },
        ],
      }),
    )
  }
  const navigateToRegister = () =>
    navigation.navigate('AuthNavigator', { screen: 'Register' })
  const navigateToForgotPassword = () => navigation.navigate('ForgotPassword')
  const navigateToSelectLocation = (params?: SelectLocationRouteParams) =>
    navigation.navigate('SelectLocation', params ?? {})

  const navigateToLogin = () =>
    navigation.navigate('AuthNavigator', { screen: 'Login' })

  const navigateToSearch = () => navigation.navigate('Search')

  const resetToEmailSent = (email: string) => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          { name: 'Welcome' },
          {
            name: 'AuthNavigator',
            params: {
              screen: 'EmailSent',
              params: { email },
            },
          },
        ],
      }),
    )
  }

  const resetEmailVerified = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          { name: 'Welcome' },
          {
            name: 'AuthNavigator',
            params: {
              screen: 'EmailVerified',
            },
          },
        ],
      }),
    )
  }

  const navigateToMaps = () => navigation.navigate('BottomTabs')

  const navigateToOwnerInfo = () => navigation.navigate('OwnerInfo')
  const navigateToBranches = () => navigation.navigate('BranchesInfo')

  const navigateToStoreRegistration = () =>
    navigation.navigate('StoreRegistration')

  const navigateToCatalogue = (params: any) =>
    navigation.navigate('Catalogue', params)

  return {
    resetToMaps,
    navigateToRegister,
    navigateToLogin,
    navigateToMaps,
    resetToEmailSent,
    resetEmailVerified,
    navigateToForgotPassword,
    resetToLogin,
    navigateToStoreRegistration,
    navigateToOwnerInfo,
    navigateToBranches,
    navigateToSelectLocation,
    resetOnLogout,
    navigateToSearch,
    navigateToCatalogue,
  }
}
