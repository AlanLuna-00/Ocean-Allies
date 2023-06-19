import { createSlice } from "@reduxjs/toolkit";

export const filterSlice = createSlice({
  name: "filter",
  initialState: {
    filters: [],
  },
  reducers: {
    setFilterList: (state, action) => {
      state.list = action.payload;
    },
  },
});

export const { setFilterList } = filterSlice.actions;

export default filterSlice.reducer;
