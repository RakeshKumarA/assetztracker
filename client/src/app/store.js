import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../reducers/userSlice";
import snackReducer from "../reducers/snackSlice";
import addUserReducer from "../reducers/addUserSlice";
import onboardReducer from "../reducers/onboardSlice";
import assetSelReducer from "../reducers/assetSelSlice";
import softwareReducer from "../reducers/softwareSlice";
import hardwareReducer from "../reducers/hardwareSlice";
import depreciationReducer from "../reducers/depreciationSlice";
import themeReducer from "../reducers/themeSlice";

export default configureStore({
  reducer: {
    user: userReducer,
    snack: snackReducer,
    addUser: addUserReducer,
    onboard: onboardReducer,
    assetSel: assetSelReducer,
    software: softwareReducer,
    hardware: hardwareReducer,
    depreciation: depreciationReducer,
    theme: themeReducer,
  },
});
