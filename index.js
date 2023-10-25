/**
 * @format
 */

import { AppRegistry } from 'react-native'
import App from './App'
import { name as appName } from './app.json'
import { Provider } from 'react-redux'
import { store, persistor } from '@store'
import { PersistGate } from 'redux-persist/integration/react'

const RootComponent = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  )
}

AppRegistry.registerComponent(appName, () => RootComponent)
