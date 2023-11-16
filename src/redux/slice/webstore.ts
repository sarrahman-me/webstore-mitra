import { createSlice } from "@reduxjs/toolkit";

const webstoreSlice = createSlice({
  name: "webstore",
  initialState: {
    webstore: [],
    domain: "",
    percentaseMembership: 0,
  },
  reducers: {
    setDomain: (state, action) => {
      state.domain = action.payload;
    },
    setWebstore: (state, action) => {
      state.webstore = action.payload;
    },
    setPercentaseMembership: (state, action) => {
      state.percentaseMembership = action.payload;
    },
  },
});

export const { setWebstore, setPercentaseMembership, setDomain } = webstoreSlice.actions;

export default webstoreSlice.reducer;
