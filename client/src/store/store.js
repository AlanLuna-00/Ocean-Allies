import { configureStore } from "@reduxjs/toolkit";
import merchReducer from "./Slices/Merch";
import searchReducer from "./Slices/Search";

const store = configureStore({
  reducer: {
    merch: merchReducer,
    search: searchReducer,
  },
});

export default store;
