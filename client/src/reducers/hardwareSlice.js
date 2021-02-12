import { createSlice } from '@reduxjs/toolkit';

const initialState = { hardware: [] };

export const hardwareSlice = createSlice({
  name: 'hardware',
  initialState,
  reducers: {
    hardware_update: (state, action) => {
      return {
        ...state,
        hardware: [action.payload, ...state.hardware], // new todos array
      };
    },
    hardware_delete: (state, action) => {
      return {
        ...state,
        hardware: state.hardware.filter(
          (hardware) => hardware.id !== action.payload
        ),
      };
    },
    hardware_reset: (state) => initialState,
  },
});

export const {
  hardware_update,
  hardware_delete,
  hardware_reset,
} = hardwareSlice.actions;

export default hardwareSlice.reducer;
