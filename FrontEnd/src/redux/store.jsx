import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers/index";

const store = configureStore({
  reducer: rootReducer,
  // Các tùy chọn khác như middleware có thể được thêm ở đây
});

export default store;
