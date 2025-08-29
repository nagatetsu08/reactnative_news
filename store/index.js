import { configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import { combineReducers } from 'redux'
import AsyncStorage from '@react-native-async-storage/async-storage';
import userReducer from './UserSlice'

const persistConfig = {
  key: 'root',
  storage: AsyncStorage
}

const rootReducer = combineReducers({
  user: userReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  // ここに登録して初めてreducerが使える
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // 非シリアライズ可能な値を無視する
       ignoredActions: ['persist/PERSIST'],
      },
   }),
})

export const persistor = persistStore(store)