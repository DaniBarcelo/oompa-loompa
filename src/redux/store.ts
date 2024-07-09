import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer } from 'redux-persist';
import expireReducer from 'redux-persist-transform-expire';
import rootReducer from './rootReducer';

const persistConfig = {
  key: 'root',
  storage,
  transforms: [
    expireReducer('oompaLoompa', {
      expireSeconds: 86400,
      expiredState: { oompaLoompas: [] },
      autoExpire: true,
    }),
    expireReducer('pageCounter', {
      expireSeconds: 86400,
      expiredState: { pageCounter: 1 },
      autoExpire: true,
    }),
  ],
};

const persistedReducer: any = persistReducer<RootState>(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export { store, persistor };