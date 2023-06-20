import { configureStore } from "@reduxjs/toolkit";
import merchReducer from "./Slices/Merch";
import searchReducer from "./Slices/Search";
import filterReducer from "./Slices/Filters";
import userReducer from "./Slices/User/Index";

const store = configureStore({
  reducer: {
    merch: merchReducer,
    search: searchReducer,
    filters: filterReducer,
    user: userReducer,
  },
});

export default store;
