import { configureStore } from '@reduxjs/toolkit';
import oompaLoompaReducer from './oompaLoompaSlice';
import pageCounterReducer from './pageCounterSlice';

const store = configureStore({
  reducer: {
    oompaLoompa: oompaLoompaReducer,
    pageCounter: pageCounterReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;