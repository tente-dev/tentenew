import { combineReducers, configureStore } from '@reduxjs/toolkit'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  PersistConfig,
} from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { api } from '@api'
import { authSlice } from '@auth'
import { feedbackSlice } from '@feedback'
import { storeSlice } from '@stores'

const persistConfig: PersistConfig<ReturnType<typeof rootReducer>> = {
  key: 'root',
  version: 1,
  storage: AsyncStorage,
  blacklist: [api.reducerPath],
}

const rootReducer = combineReducers({
  auth: authSlice.reducer,
  feedback: feedbackSlice.reducer,
  stores: storeSlice.reducer,
  [api.reducerPath]: api.reducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          FLUSH,
          REHYDRATE,
          PAUSE,
          PERSIST,
          PURGE,
          REGISTER,
          'theme',
        ],
      },
    }).concat(api.middleware),
})

export const persistor = persistStore(store)
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
