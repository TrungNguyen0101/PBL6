import { combineReducers } from '@reduxjs/toolkit';
import menuReducer from './menuReducer';
import formAddReducer from './formAddReducer';
import globalReducer from './globalReducer';
import updateInforReducer from './updateInforReducer';
import priceReducer from './priceReducer';

const rootReducer = combineReducers({
  menu: menuReducer,
  form: formAddReducer,
  darkMode: globalReducer,
  updateInfor: updateInforReducer,
  getPriceBook: priceReducer,
  // Thêm các reducer khác ở đây
});

export default rootReducer;
