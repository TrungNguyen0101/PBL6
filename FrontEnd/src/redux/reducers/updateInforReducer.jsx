import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isUpdate: false,
};
const updateInforReducer = createSlice({
  name: 'update',
  initialState,
  reducers: {
    updateReducer: (state) => {
      return {
        ...state,
        isUpdate: !state.isUpdate,
      };
    },
  },
});

export const { updateReducer } = updateInforReducer.actions;
export default updateInforReducer.reducer;
