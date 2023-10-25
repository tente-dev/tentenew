import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Welcome } from '@auth'
import { AuthNavigator } from './auth'
import { useUserInfo } from 'modules/auth/hooks/user-info'
import { StoreRegistrationNavigator } from './store-registration'
import { BackHeader } from '../components/back-header'
import { BottomTabs } from './bottom-tabs'
import { SelectLocation } from '@geolocation'
import {
  Catalogue,
  CorrectInfo,
  Search,
  StoreBranchInformation,
  StoreRequest,
} from 'modules/stores'

const Stack = createNativeStackNavigator()

export const MainNavigator = () => {
  const { isAuthenticated } = useUserInfo()
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, animation: 'slide_from_left' }}>
      {!isAuthenticated && <Stack.Screen name="Welcome" component={Welcome} />}
      {!isAuthenticated && (
        <Stack.Screen name="AuthNavigator" component={AuthNavigator} />
      )}
      <Stack.Screen name="BottomTabs" component={BottomTabs} />
      <Stack.Screen
        name="StoreRegistration"
        component={StoreRegistrationNavigator}
        options={{
          header: props => <BackHeader {...props} />,
          headerShown: true,
          title: 'Registra tu tienda',
        }}
      />
      <Stack.Screen
        name="SelectLocation"
        component={SelectLocation}
        options={{
          header: props => <BackHeader {...props} />,
          headerShown: true,
          title: 'Selecciona una ubicación',
        }}
      />
      <Stack.Screen
        name="Search"
        component={Search}
        options={{
          headerShown: false,
          title: 'Buscar',
        }}
      />
      <Stack.Screen
        name="StoreBranchInformation"
        component={StoreBranchInformation}
        options={{
          header: props => <BackHeader {...props} />,
          headerShown: true,
          title: 'Información de tienda',
        }}
      />
      <Stack.Screen
        name="StoreRequest"
        component={StoreRequest}
        options={{
          header: props => <BackHeader {...props} />,
          headerShown: true,
          title: 'Solicitud',
        }}
      />
      <Stack.Screen
        name="CorrectInfo"
        component={CorrectInfo}
        options={{
          header: props => <BackHeader {...props} />,
          headerShown: true,
          title: 'Corregir Información',
        }}
      />
      <Stack.Screen
        name="Catalogue"
        component={Catalogue}
        options={{
          header: props => <BackHeader {...props} />,
          headerShown: true,
          title: 'Catalogo de productos',
        }}
      />
    </Stack.Navigator>
  )
}
