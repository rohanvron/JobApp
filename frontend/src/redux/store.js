import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import authReducer from './auth/authReducer';
import jobReducer from './jobs/jobReducer';

// persist config
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'] // only auth will be persisted
};

// root reducer
const rootReducer = combineReducers({
  auth: authReducer,
  jobs: jobReducer,
});

// persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);