import { configureStore, combineReducers } from '@reduxjs/toolkit';
import userReducer from './User';

const rootReducer = combineReducers({
  user: userReducer
});

export default configureStore({
  reducer: rootReducer,
});