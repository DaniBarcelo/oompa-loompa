import { combineReducers } from '@reduxjs/toolkit';
import oompaLoompaReducer from './oompaLoompaSlice';

const rootReducer = combineReducers({
  oompaLoompa: oompaLoompaReducer
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;