// Public imports
import { createSlice } from '@reduxjs/toolkit';

//* Initial state
const initialState = {
  test: {},
};

//* Slice
const testSlice = createSlice({
  name: 'test',
  initialState,
  reducers: {
    setTest: (state, { payload }) => {
      state.test = payload;
    },
  },
});

export const { setTest } = testSlice.actions;
export default testSlice.reducer;
