import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  depreciation: {
    shelflife: "",
    residualvalue: "",
    depmethod: "",
  },
};

export const depreciationSlice = createSlice({
  name: "depreciation",
  initialState,
  reducers: {
    depreciation_update: (state, action) => {
      state.depreciation = action.payload;
    },
  },
});

export const { depreciation_update } = depreciationSlice.actions;

export default depreciationSlice.reducer;
