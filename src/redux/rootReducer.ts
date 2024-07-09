import { combineReducers } from '@reduxjs/toolkit';
import oompaLoompaReducer from './oompaLoompaSlice';
import pageCounterReducer from './pageCounterSlice';

const rootReducer = combineReducers({
  oompaLoompa: oompaLoompaReducer,
  pageCounter: pageCounterReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;