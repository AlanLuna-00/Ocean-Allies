import { createSlice } from "@reduxjs/toolkit";

export const filterSlice = createSlice({
  name: "filter",
  initialState: {
    list: {
      page: 1,
      category: null,
      price: null,
      sort: null,
      size: null,
      name: "",
      color: null,
    },
  },
  reducers: {
    setFilterList: (state, action) => {
      state.list = action.payload;
    },
  },
});

export const { setFilterList } = filterSlice.actions;

export default filterSlice.reducer;
