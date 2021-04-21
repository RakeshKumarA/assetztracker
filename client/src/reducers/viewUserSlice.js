import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { set_snackbar } from "./snackSlice";


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
export const searchUsers = (value) => async (dispatch) => {
  const { data } = await axios.post("/api/users/search",{
    name:value
  })
  if(data.data != "")
  {
      dispatch(view_users(data.data));
}
else if (data.data == ""){
  dispatch(
    set_snackbar({
      snackbarOpen: true,
      snackbarType: "error",
      snackbarMessage: "User Not Found",
      snackbarSeverity:"error",
    })
  );
}
}
export const deleteUsers = (id) => async (dispatch) => {
  const { data } = await axios.post("/api/users/remove",{
    userid:id
  })
  console.log(data.data);
  dispatch(view_users(data.data))
}
export default viewUserSlice.reducer;