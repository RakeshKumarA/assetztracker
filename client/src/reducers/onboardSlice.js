import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  onboard: {
    assetId: {
      lable: 'Asset Id',
      value: '',
    },
    assetName: {
      lable: 'Asset Name',
      value: '',
    },
    assetStatus: {
      lable: 'Asset Status',
      value: 'Onboarding',
    },
    assetType: {
      lable: 'Asset Type',
      value: 'rented',
    },
    cost: {
      lable: 'Cost',
      value: '',
    },
    invoiceNumber: {
      lable: 'Invoice Number',
      value: '',
    },
    lastauditDate: {
      lable: 'Last Audit Date',
      value: null,
    },
    onboardDate: {
      lable: 'Onboard Date',
      value: null,
    },
    productSerial: {
      lable: 'Product Serial',
      value: '',
    },
    purchaseDate: {
      lable: 'Purchase Date',
      value: null,
    },
    purchaseOrder: {
      lable: 'Purchase Order',
      value: '',
    },
    vendor: {
      lable: 'Vendor',
      value: '',
    },
    warranty: {
      lable: 'Warranty',
      value: '',
    },
    warrantyExp: {
      lable: 'Warranty Exp Date',
      value: null,
    },
  },
};

export const onboardSlice = createSlice({
  name: 'onboard',
  initialState,
  reducers: {
    onboard_update: (state, action) => {
      state.onboard = action.payload;
    },
    onboard_reset: (state) => initialState,
  },
});

export const { onboard_update, onboard_reset } = onboardSlice.actions;

export default onboardSlice.reducer;
