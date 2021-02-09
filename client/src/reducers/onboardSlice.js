import { createSlice } from "@reduxjs/toolkit";

const currentDate = new Date();
const nextmonth = new Date(currentDate.setMonth(currentDate.getMonth() + 1))
  .toISOString()
  .slice(0, 10);

const initialState = {
  onboard: {
    assetId: "",
    assetName: "",
    assetStatus: "",
    assetType: "",
    cost: "",
    invoiceNumber: "",
    lastauditDate: new Date().toISOString(),
    onboardDate: new Date().toISOString(),
    productSerial: "",
    purchaseDate: new Date().toISOString(),
    purchaseOrder: "",
    vendor: "",
    warranty: 1,
    warrantyExp: nextmonth,
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
