// reducers/counterSlice.ts
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  collapsed: false,
};
const menuSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    toggleMenu: (state) => {
      state.collapsed = !state.collapsed;
    },
  },
});

export const { toggleMenu } = menuSlice.actions;
export default menuSlice.reducer;
