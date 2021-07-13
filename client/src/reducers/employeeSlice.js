import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import { set_snackbar } from "./snackSlice";

const initialState = {
  loading: false,
  employeeadded: [],
  employeeViewed: [],
  employeeSearched: [],
  error: "",
};

export const employeeSlice = createSlice({
  name: "adduser",
  initialState,
  reducers: {
    employee_add_request: (state) => {
      state.loading = true;
      state.employeeadded = [];
      state.employeeViewed = [];
      state.employeeSearched = [];
    },
    employee_add_sucess: (state, action) => {
      state.loading = false;
      state.employeeadded = action.payload;
    },
    employee_view_sucess: (state, action) => {
      state.loading = false;
      state.employeeViewed = action.payload;
    },
    employee_search_sucess: (state, action) => {
      state.loading = false;
      state.employeeSearched = action.payload;
    },
    employee_add_failure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    employee_cleanup: (state) => {
      state.loading = false;
      state.employeeadded = [];
    },
  },
});

export const {
  employee_add_request,
  employee_add_sucess,
  employee_view_sucess,
  employee_search_sucess,
  employee_add_failure,
  employee_cleanup,
} = employeeSlice.actions;

export const addEmployee = (employees) => async (dispatch, getState) => {
  try {
    dispatch(employee_add_request());
    const {
      user: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.post("/api/employee", { employees }, config);
    if (data.status === 201) {
      delete data.status;

      dispatch(employee_add_sucess(data.employees));
      dispatch(
        set_snackbar({
          snackbarOpen: true,
          snackbarType: "success",
          snackbarMessage: "Employee Successfully Added",
          snackbarSeverity: "success",
        })
      );
    } else {
      dispatch(employee_add_failure(data.message));
      dispatch(
        set_snackbar({
          snackbarOpen: true,
          snackbarType: "error",
          snackbarMessage: data.message,
          snackbarSeverity: "error",
        })
      );
    }
  } catch (error) {
    dispatch(employee_add_failure(error.message));
    dispatch(
      set_snackbar({
        snackbarOpen: true,
        snackbarType: "error",
        snackbarMessage: error.message,
        snackbarSeverity: "error",
      })
    );
  }
};

export const viewEmployee = () => async (dispatch, getState) => {
  try {
    dispatch(employee_add_request());
    const {
      user: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get("/api/employee/view", config);
    if (data.status === 200) {
      delete data.status;

      dispatch(employee_add_sucess(data.employees));
    } else {
      dispatch(employee_add_failure(data.message));
      dispatch(
        set_snackbar({
          snackbarOpen: true,
          snackbarType: "error",
          snackbarMessage: data.message,
          snackbarSeverity: "error",
        })
      );
    }
  } catch (error) {
    dispatch(employee_add_failure(error.message));
    dispatch(
      set_snackbar({
        snackbarOpen: true,
        snackbarType: "error",
        snackbarMessage: error.message,
        snackbarSeverity: "error",
      })
    );
  }
};

export default employeeSlice.reducer;
