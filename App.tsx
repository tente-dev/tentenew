/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { FeedbackProvider } from '@feedback'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { MainNavigator, linking } from '@navigation'
import { NavigationContainer } from '@react-navigation/native'
import { nativeBaseTheme, navigationTheme } from '@styles'
import { NativeBaseProvider } from 'native-base'
import React from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { enableLatestRenderer } from 'react-native-maps'

enableLatestRenderer()

function App(): JSX.Element {
  return (
    <NavigationContainer theme={navigationTheme} linking={linking as any}>
      <NativeBaseProvider theme={nativeBaseTheme}>
        <GestureHandlerRootView
          style={{
            flex: 1,
          }}>
          <BottomSheetModalProvider>
            <FeedbackProvider>
              <MainNavigator />
            </FeedbackProvider>
          </BottomSheetModalProvider>
        </GestureHandlerRootView>
      </NativeBaseProvider>
    </NavigationContainer>
  )
}

export default App
