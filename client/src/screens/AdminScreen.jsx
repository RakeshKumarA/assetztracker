import React from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import AdminDrawer from "../components/admin/AdminDrawer";

import AdminForm from "../components/admin/AdminForm";

const useStyles = makeStyles({
  container: {
    minHeight: "100vh",
  },
  cardContainer: {
    height: "80%",
    width: "90%",
  },
});

const AdminScreen = () => {
  const classes = useStyles();

  return (
    <Grid
      container
      className={classes.container}
      justify="center"
      alignItems="center"
    >
      <Grid item container className={classes.cardContainer} spacing={2}>
        <Grid item container sm={2}>
          <AdminDrawer />
        </Grid>
        <Grid item container sm={10}>
          <AdminForm />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default AdminScreen;
