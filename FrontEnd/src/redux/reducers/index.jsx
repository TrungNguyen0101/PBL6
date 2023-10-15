import { combineReducers } from '@reduxjs/toolkit';
import menuReducer from './menuReducer';
import formAddReducer from './FormAddReducer';

const rootReducer = combineReducers({
  menu: menuReducer,
  form: formAddReducer,
  // Thêm các reducer khác ở đây
});

export default rootReducer;
