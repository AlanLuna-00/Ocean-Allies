// ID NOMBRE MAIL ROL
import { createSlice } from "@reduxjs/toolkit";

export const usersSlice = createSlice({
  name: "Users",
  initialState: {
    list: [],
  },
  reducers: {
    setUsersList: (state, action) => {
      state.list = action.payload;
    },
  },
});
