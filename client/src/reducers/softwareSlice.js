import { createSlice } from "@reduxjs/toolkit";

const initialState = { software: [] };

export const softwareSlice = createSlice({
  name: "software",
  initialState,
  reducers: {
    software_update: (state, action) => {
      return {
        ...state,
        software: [action.payload, ...state.software],
      };
    },
    software_delete: (state, action) => {
      return {
        ...state,
        software: state.software.filter(
          (software) => software.id !== action.payload
        ),
      };
    },
  },
});

export const { software_update, software_delete } = softwareSlice.actions;

export default softwareSlice.reducer;
