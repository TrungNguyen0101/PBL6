import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  username: '',
  email: '',
  password: '',
};
const dataSignUpSlice = createSlice({
  name: 'signup',
  initialState,
  reducers: {
    signUpData: (state, actions) => {
      return {
        ...state,
        username: actions.payload.username,
        email: actions.payload.email,
        password: actions.payload.password,
      };
    },
  },
});

export const { signUpData } = dataSignUpSlice.actions;
export default dataSignUpSlice.reducer;
