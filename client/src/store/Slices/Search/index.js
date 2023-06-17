import { createSlice } from "@reduxjs/toolkit";

export const searchSlice = createSlice({
  name: "search",
  initialState: {
    list: [],
  },
  reducers: {
    setSearchList: (state, action) => {
      state.list = action.payload;
    },
  },
});

export const { setSearchList } = searchSlice.actions;

export default searchSlice.reducer;
