import { createSlice } from "@reduxjs/toolkit";

const webstoreSlice = createSlice({
  name: "webstore",
  initialState: {
    webstore: [],
    domain: "",
    mitra: {},
    percentaseMembership: 0,
    membership: {},
  },
  reducers: {
    setDomain: (state, action) => {
      state.domain = action.payload;
    },
    setWebstore: (state, action) => {
      state.webstore = action.payload;
    },
    setMitra: (state, action) => {
      state.mitra = action.payload;
    },
    setPercentaseMembership: (state, action) => {
      state.percentaseMembership = action.payload;
    },
    setMembership: (state, action) => {
      state.membership = action.payload;
    },
  },
});

export const {
  setWebstore,
  setPercentaseMembership,
  setDomain,
  setMitra,
  setMembership,
} = webstoreSlice.actions;

export default webstoreSlice.reducer;
