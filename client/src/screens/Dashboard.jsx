import React from "react";
import Button from "@material-ui/core/Button";
import { user_logout } from "../reducers/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { CircularProgress } from "@material-ui/core";
import { set_snackbar } from "../reducers/snackSlice";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.user);
  const onLogoutClick = () => {
    dispatch(user_logout());
    dispatch(
      set_snackbar({
        snackbarOpen: true,
        snackbarType: "success",
        snackbarMessage: "Sucessfully logged out",
      })
    );
  };

  return (
    <div>
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <h1>This is Dashboard component from dashboard screen</h1>
          <Button variant="contained" color="primary" onClick={onLogoutClick}>
            Logout
          </Button>
        </>
      )}
    </div>
  );
};

export default Dashboard;
