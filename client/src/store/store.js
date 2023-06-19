import { configureStore } from "@reduxjs/toolkit";
import merchReducer from "./Slices/Merch";
import searchReducer from "./Slices/Search";
import filterReducer from "./Slices/Filters";

const store = configureStore({
  reducer: {
    merch: merchReducer,
    search: searchReducer,
    filters: filterReducer,
  },
});

export default store;
