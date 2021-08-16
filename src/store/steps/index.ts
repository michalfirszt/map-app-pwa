import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  base: '',
  type: '',
};

const stepsSlice = createSlice({
  name: 'steps',
  initialState,
  reducers: {
    setBase: (state, { payload }) => {
      state.base = payload;
    },
    setType: (state, { payload }) => {
      state.type = payload;
    },
  },
});

export const { setBase, setType } = stepsSlice.actions;
export default stepsSlice.reducer;
