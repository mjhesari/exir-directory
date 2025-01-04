import { createSlice } from "@reduxjs/toolkit";
import { DataState } from "@/types/ReduxTypes";

const initialState: DataState = {
  data: [],
  details: {
    count: 0,
  },
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setExchangeData: (state, { payload }) => {
      state.data = payload;
    },
  },
});

export default dataSlice.reducer;
export const { setExchangeData } = dataSlice.actions;

