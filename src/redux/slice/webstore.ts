import { createSlice } from "@reduxjs/toolkit";

const webstoreSlice = createSlice({
  name: "webstore",
  initialState: {
    webstore: [],
    percentaseMembership: 0,
  },
  reducers: {
    setWebstore: (state, action) => {
      state.webstore = action.payload;
    },
    setPercentaseMembership: (state, action) => {
      state.percentaseMembership = action.payload;
    },
  },
});

export const { setWebstore, setPercentaseMembership } = webstoreSlice.actions;

export default webstoreSlice.reducer;
