import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  price: 0,
};
const priceReducer = createSlice({
  name: 'price',
  initialState,
  reducers: {
    getPrice: (state, actions) => {
      return {
        ...state,
        price: actions.payload,
      };
    },
  },
});

export const { getPrice } = priceReducer.actions;
export default priceReducer.reducer;
