import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  current: 0,
  firstForm: {},
  firstFormEdit: {},
  checkAdd: false,
  mainImage: [],
  errorMainImage: '',
  descImage: [],
  errorDescImage: '',
};
const FormAddSlice = createSlice({
  name: 'formAdd',
  initialState,
  reducers: {
    /* step form */
    nextForm: (state) => {
      state.current += 1;
    },
    prevForm: (state) => {
      state.current = state.current - 1;
    },
    /* first form */
    saveFirstForm: (state, action) => {
      state.firstForm = action.payload;
    },
    /* first form edit */
    saveFirstFormEdit: (state, action) => {
      state.firstFormEdit = action.payload;
    },
    /* check form add */
    onCheckAdd: (state) => {
      state.checkAdd = true;
    },
    offCheckAdd: (state) => {
      state.checkAdd = false;
    },
    /* main image */
    saveMainImage: (state, action) => {
      state.mainImage = action.payload;
    },
    saveErrorMainImage: (state, action) => {
      state.errorMainImage = action.payload;
    },
    /* desc image */
    saveDescImage: (state, action) => {
      state.descImage = action.payload;
    },
    saveErrorDescImage: (state, action) => {
      state.errorDescImage = action.payload;
    },
  },
});

export const {
  nextForm,
  prevForm,
  saveFirstForm,
  saveFirstFormEdit,
  onCheckAdd,
  offCheckAdd,
  saveMainImage,
  saveErrorMainImage,
  saveDescImage,
  saveErrorDescImage,
} = FormAddSlice.actions;
export default FormAddSlice.reducer;
