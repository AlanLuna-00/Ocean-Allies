// ID NOMBRE MAIL ROL
import { createSlice } from "@reduxjs/toolkit";

export const usersSlice = createSlice({
  name: "User",
  initialState: {
    user: {},
  },
  reducers: {
    setUserData: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setUserData } = usersSlice.actions;

export default usersSlice.reducer;
