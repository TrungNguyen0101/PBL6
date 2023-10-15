import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  current: 0,
  firstForm: {},
  checkAdd: false,
};
const FormAddSlice = createSlice({
  name: 'formAdd',
  initialState,
  reducers: {
    nextForm: (state) => {
      state.current += 1;
    },
    prevForm: (state) => {
      state.current = state.current - 1;
    },
    saveFirstForm: (state, action) => {
      state.firstForm = action.payload;
    },
    getFirstForm: (state) => {
      return state.firstForm;
    },
    onCheckAdd: (state) => {
      state.checkAdd = true;
    },
    offCheckAdd: (state) => {
      state.checkAdd = false;
    },
  },
});

export const {
  nextForm,
  prevForm,
  saveFirstForm,
  getFirstForm,
  onCheckAdd,
  offCheckAdd,
} = FormAddSlice.actions;
export default FormAddSlice.reducer;
