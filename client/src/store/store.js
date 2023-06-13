import { configureStore } from "@reduxjs/toolkit";
import merchReducer from "./Slices/Merch";

const store = configureStore({
  reducer: {
    merch: merchReducer,
  },
});

export default store;
