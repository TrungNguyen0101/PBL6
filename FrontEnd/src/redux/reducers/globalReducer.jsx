import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  darkMode: false,
};
const globalReducer = createSlice({
  name: 'global',
  initialState,
  reducers: {
    toggleDarkMode: (state, actions) => {
      return {
        ...state,
        darkMode: actions.payload,
      };
    },
  },
});

export const { toggleDarkMode } = globalReducer.actions;
export default globalReducer.reducer;
