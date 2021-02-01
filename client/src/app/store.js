import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../reducers/userSlice";
import snackReducer from "../reducers/snackSlice";
import addUserReducer from "../reducers/addUserSlice";

export default configureStore({
  reducer: {
    user: userReducer,
    snack: snackReducer,
    addUser: addUserReducer,
  },
});
