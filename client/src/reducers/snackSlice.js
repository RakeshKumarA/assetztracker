import { createSlice } from "@reduxjs/toolkit";

export const snackSlice = createSlice({
  name: "snack",
  initialState: {
    snackbarOpen: false,
    snackbarType: "success",
    snackbarMessage: "",
  },
  reducers: {
    set_snackbar: (state, action) => {
      const { snackbarOpen, snackbarMessage, snackbarType } = action.payload;
      return {
        ...state,
        snackbarOpen,
        snackbarType,
        snackbarMessage,
      };
    },
  },
});

export const { set_snackbar } = snackSlice.actions;

export default snackSlice.reducer;
