import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { StatusBar, Text } from 'native-base'
import { Fragment } from 'react'
import { useTheme } from '@react-navigation/native'
import { BranchesInfo, OwnerInfo, StoreInfo } from 'modules/stores'
import { TabLabel } from '../components/tab-label'
import { useRegistrationProcess } from 'modules/stores/hooks/registration'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'

const Tab = createMaterialTopTabNavigator()

export const StoreRegistrationNavigator = () => {
  const theme = useTheme()
  const { tabPressHandler, currentStep, loading } = useRegistrationProcess()
  return (
    <BottomSheetModalProvider>
      <Fragment>
        <StatusBar translucent={false} backgroundColor={theme.colors.card} />
        <Tab.Navigator>
          <Tab.Screen
            name="StoreInfo"
            component={StoreInfo}
            options={{
              tabBarLabel: ({ focused }) => (
                <TabLabel
                  focused={(focused || currentStep >= 1) && !loading}
                  label={'1) Inf. General'}
                />
              ),
              swipeEnabled: false,
            }}
            listeners={{
              tabPress: e => tabPressHandler(e, 1),
            }}
          />
          <Tab.Screen
            name="OwnerInfo"
            component={OwnerInfo}
            options={{
              tabBarLabel: ({ focused }) => (
                <TabLabel
                  focused={(focused || currentStep >= 2) && !loading}
                  label={'2) Propietario'}
                />
              ),
              swipeEnabled: false,
            }}
            listeners={{
              tabPress: e => tabPressHandler(e, 2),
            }}
          />
          <Tab.Screen
            name="BranchesInfo"
            component={BranchesInfo}
            options={{
              tabBarLabel: ({ focused }) => (
                <TabLabel
                  focused={(focused || currentStep >= 3) && !loading}
                  label={'3) Sucursales'}
                />
              ),
              swipeEnabled: false,
            }}
            listeners={{
              tabPress: e => tabPressHandler(e, 3),
            }}
          />
        </Tab.Navigator>
      </Fragment>
    </BottomSheetModalProvider>
  )
}
