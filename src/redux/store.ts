import { configureStore } from "@reduxjs/toolkit";
import webstoreSlice from "./slice/webstore";

const store = configureStore({
  reducer: {
    webstore: webstoreSlice,
  },
});

export default store;
