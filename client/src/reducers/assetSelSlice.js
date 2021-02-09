import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  option: 1,
};

export const assetSelSlice = createSlice({
  name: "option",
  initialState,
  reducers: {
    option_update: (state, action) => {
      state.option = action.payload;
    },
  },
});

export const { option_update } = assetSelSlice.actions;

export default assetSelSlice.reducer;
