import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../reducers/userSlice";
import snackReducer from "../reducers/snackSlice";

export default configureStore({
  reducer: {
    user: userReducer,
    snack: snackReducer,
  },
});
