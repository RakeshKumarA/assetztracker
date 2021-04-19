import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const viewUserSlice = createSlice({
  name: 'viewusers',
  initialState: {
   view:[],
   searcheduser:[],
  },
  reducers: {
    view_users: (state, action) => {
      state.view = action.payload;
  },
  searched_user: (state, action) => {
    state.searcheduser = action.payload;
  },
},
});

export const {
    view_users,
    searched_user,
} = viewUserSlice.actions;

export const viewUsers = () => async ( dispatch) => {
    const { data } = await axios.get(
      "/api/users/view");
      dispatch(view_users(data.data)) 
}; 





export default viewUserSlice.reducer;
