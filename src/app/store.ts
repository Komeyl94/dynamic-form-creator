import { configureStore, ThunkAction, Action, combineReducers } from '@reduxjs/toolkit';
import formsReducer from '../features/forms/formSlice';
import permissionsReducer from '../features/permissions/permissionsSlice';
import servicesReducer from '../features/services/servicesSlice';
import userReducer from '../features/user/userSlice';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';

const persistConfig = {
  key: 'root',
  storage,
}

const rootReducer = combineReducers({
  forms: formsReducer,
  permissions: permissionsReducer,
  services: servicesReducer,
  user: userReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

const persistor = persistStore(store);

export { persistor };

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
