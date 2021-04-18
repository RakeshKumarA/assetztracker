import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const viewUserSlice = createSlice({
  name: 'viewusers',
  initialState: {
   view:[],
  },
  reducers: {
    view_users: (state, action) => {
      state.view = action.payload;
  },
},
});

export const {
    view_users,
} = viewUserSlice.actions;

export const viewUsers = () => async ( dispatch) => {
    const { data } = await axios.get(
      "/api/users/view");
      dispatch(view_users(data.data)) 
}; 





export default viewUserSlice.reducer;
