import { createSlice } from "@reduxjs/toolkit";
import { PostDataContainer } from "@/types/dataTypes";

const initialState: PostDataContainer = {
  data: [],
  details: {
    count: 0,
  },
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    setPostData: (state, { payload }) => {
      state.data = payload;
    },
  },
});

export default postSlice.reducer;
export const { setPostData } = postSlice.actions;

