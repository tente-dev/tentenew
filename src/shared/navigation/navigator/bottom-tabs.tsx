import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Favorites, Requests, StoresMap } from 'modules/stores'
import { Fragment } from 'react'
import { BottomTabs as Tabs } from '../components/bottom-tabs'
import { Account } from 'modules/auth'
import { useFavorites } from 'modules/stores/hooks/favorite'
import { RootState } from 'shared/store'
import { useSelector } from 'react-redux'
import { useGetStoreRequests } from 'modules/stores/hooks/requests'

const Tab = createBottomTabNavigator()

export const BottomTabs = () => {
  const { favorites } = useFavorites()
  const { requests } = useGetStoreRequests()
  const user = useSelector((state: RootState) => state.auth.user)

  return (
    <Fragment>
      <Tab.Navigator
        tabBar={props => <Tabs {...props} />}
        screenOptions={{ headerShown: false }}>
        <Tab.Screen
          name="Tiendas"
          component={StoresMap}
          options={{
            tabBarLabel: 'store',
          }}
        />
        <Tab.Screen
          name="Favoritos"
          component={Favorites}
          options={{
            tabBarLabel: 'heart',
            tabBarBadge: favorites.length ?? 0,
          }}
        />
        {Boolean(user?.admin) && (
          <Tab.Screen
            name="Solicitudes"
            component={Requests}
            options={{
              tabBarLabel: 'comment-question',
              tabBarBadge: requests.length ?? 0,
            }}
          />
        )}
        <Tab.Screen
          name="Cuenta"
          component={Account}
          options={{
            tabBarLabel: 'account-circle',
          }}
        />
      </Tab.Navigator>
    </Fragment>
  )
}
