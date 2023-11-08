import { combineReducers } from '@reduxjs/toolkit';
import menuReducer from './menuReducer';
import formAddReducer from './formAddReducer';
import dataSignUpReducer from './dataSignUpReducer';

const rootReducer = combineReducers({
  menu: menuReducer,
  form: formAddReducer,
  signup: dataSignUpReducer,
  // Thêm các reducer khác ở đây
});

export default rootReducer;
