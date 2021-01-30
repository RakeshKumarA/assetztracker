import React from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  Divider,
  Drawer,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  CircularProgress,
} from "@material-ui/core";
import { set_snackbar } from "../../reducers/snackSlice";
import { user_logout } from "../../reducers/userSlice";
import DashboardIcon from "@material-ui/icons/Dashboard";
import AddBoxIcon from "@material-ui/icons/AddBox";
import VisibilityIcon from "@material-ui/icons/Visibility";
import AssessmentIcon from "@material-ui/icons/Assessment";
import SettingsIcon from "@material-ui/icons/Settings";
import NotificationsActiveIcon from "@material-ui/icons/NotificationsActive";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { makeStyles } from "@material-ui/core/styles";

import assetzLogo from "../../assets/assetzlogo.png";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  drawer: {
    width: "16.66vw",
  },
  logo: {
    width: "5rem",
    background: "#C2CFE0",
    borderRadius: "1rem",
  },
  logocontainer: {
    padding: "2rem 0 1rem 0",
  },
  drawerPaper: {
    width: "16.66vw",
    color: "#fff",
  },
  iconstyle: {
    color: "#fff",
  },
});

const DrawerComponent = () => {
  const classes = useStyles();
  const { userInfo } = useSelector((state) => state.user);
  const history = useHistory();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.user);

  const drawerTopList = [
    {
      id: 1,
      name: "Dashboard",
      icon: <DashboardIcon />,
      onClickHandler: () => history.push("/"),
    },
    {
      id: 2,
      name: "Add Assets",
      icon: <AddBoxIcon />,
      onClickHandler: () => history.push("/addasset"),
    },
    {
      id: 3,
      name: "View Assets",
      icon: <VisibilityIcon />,
      onClickHandler: () => history.push("/viewasset"),
    },

    {
      id: 4,
      name: "Report",
      icon: <AssessmentIcon />,
      onClickHandler: () => history.push("/report"),
    },
  ];

  const drawerBottomList = [
    {
      id: 1,
      name: "Settings",
      icon: <SettingsIcon />,
      onClickHandler: () => history.push("/setting"),
    },
    {
      id: 2,
      name: "Notifications",
      icon: <NotificationsActiveIcon />,
      onClickHandler: () => history.push("/notifs"),
    },
    {
      id: 3,
      name: "Log Out",
      icon: <ExitToAppIcon />,
      onClickHandler: () => {
        dispatch(user_logout());
        dispatch(
          set_snackbar({
            snackbarOpen: true,
            snackbarType: "success",
            snackbarMessage: "Sucessfully logged out",
          })
        );
      },
    },
  ];

  const drawerAdminList = [
    {
      id: 1,
      name: "Admin",
      icon: <AssignmentIndIcon />,
      onClickHandler: () => history.push("/admin"),
    },
  ];

  return (
    <>
      {loading ? (
        <CircularProgress />
      ) : (
        <Drawer
          variant="permanent"
          className={classes.drawer}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <Grid container justify="center" className={classes.logocontainer}>
            <img src={assetzLogo} alt="logo" className={classes.logo} />
          </Grid>
          <Grid container justify="center">
            <Typography variant="h5">{userInfo.name}</Typography>
          </Grid>
          <Divider />
          <List>
            {drawerTopList.map((draweritem) => (
              <ListItem
                button
                key={draweritem.id}
                onClick={draweritem.onClickHandler}
              >
                <ListItemIcon className={classes.iconstyle}>
                  {draweritem.icon}
                </ListItemIcon>
                <ListItemText primary={draweritem.name} />
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {drawerBottomList.map((draweritem) => (
              <ListItem
                button
                key={draweritem.id}
                onClick={draweritem.onClickHandler}
              >
                <ListItemIcon className={classes.iconstyle}>
                  {draweritem.icon}
                </ListItemIcon>
                <ListItemText primary={draweritem.name} />
              </ListItem>
            ))}
          </List>
          <Divider />
          {userInfo.role === "admin" && (
            <List>
              {drawerAdminList.map((draweritem) => (
                <ListItem
                  button
                  key={draweritem.id}
                  onClick={draweritem.onClickHandler}
                >
                  <ListItemIcon className={classes.iconstyle}>
                    {draweritem.icon}
                  </ListItemIcon>
                  <ListItemText primary={draweritem.name} />
                </ListItem>
              ))}
            </List>
          )}
        </Drawer>
      )}
    </>
  );
};

export default DrawerComponent;
