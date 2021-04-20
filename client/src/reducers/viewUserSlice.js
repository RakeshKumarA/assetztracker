import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { set_snackbar } from './snackSlice';

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
export const searchUsers = (value) => async (dispatch) => {
  console.log(value);
    if(value!==""){
      dispatch(searched_user(value));
    }
      else if (value===""){
       console.log("came here");
      dispatch(
        set_snackbar({
          snackbarOpen: true,
          snackbarType: "error",
          snackbarMessage: "User Not Found",
        })
      );
      }
}





export default viewUserSlice.reducer;
