import { createSlice } from "@reduxjs/toolkit";

export const merchSlice = createSlice({
  name: "merch",
  initialState: {
    list: [],
  },
  reducers: {
    setMerchList: (state, action) => {
      state.list = action.payload;
    },
  },
});

export const { setMerchList } = merchSlice.actions;

export default merchSlice.reducer;
