import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useSelector } from "react-redux";
import LoginScreen from "./screens/LoginScreen";
import PageNotFound from "./screens/PageNotFound";
import Dashboard from "./screens/Dashboard";
import PrivateRoute from "./components/routes/PrivateRoute";
import PublicRoute from "./components/routes/PublicRoute";
import CustomSnackBar from "./components/snackbar/CustomSnackBar";
import DrawerComponent from "./components/drawer/DrawerComponent";
import AdminRoute from "./components/routes/AdminRoute";
import AdminScreen from "./screens/AdminScreen";

const useStyles = makeStyles({
  container: {
    display: "flex",
  },
});

const App = () => {
  const classes = useStyles();
  const { userInfo } = useSelector((state) => state.user);

  return (
    <>
      <CustomSnackBar />
      <Router>
        <div className={classes.container}>
          {userInfo && Object.keys(userInfo).length !== 0 && (
            <DrawerComponent />
          )}
          <Switch>
            <PublicRoute path="/" exact component={LoginScreen} />
            <PrivateRoute path="/dashboard" exact component={Dashboard} />
            <AdminRoute path="/admin" exact component={AdminScreen} />
            <Route component={PageNotFound} />
          </Switch>
        </div>
      </Router>
    </>
  );
};

export default App;
