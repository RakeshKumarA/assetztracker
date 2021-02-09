import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  onboard: {
    assetId: "",
    assetName: "",
    assetStatus: "Onboarding",
    assetType: "rented",
    cost: "",
    invoiceNumber: "",
    lastauditDate: null,
    onboardDate: null,
    productSerial: "",
    purchaseDate: null,
    purchaseOrder: "",
    vendor: "",
    warranty: 1,
    warrantyExp: null,
  },
};

export const onboardSlice = createSlice({
  name: "onboard",
  initialState,
  reducers: {
    onboard_update: (state, action) => {
      state.onboard = action.payload;
    },
  },
});

export const { onboard_update } = onboardSlice.actions;

export default onboardSlice.reducer;
