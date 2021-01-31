import React from "react";
import Grid from "@material-ui/core/Grid";
import { Divider, Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import PersonAddIcon from "@material-ui/icons/PersonAdd";

const useStyles = makeStyles({
  container: {
    minHeight: "100vh",
  },
  cardContainer: {
    height: "80%",
    width: "90%",
  },
  paperStyle: {
    width: "100%",
    color: "#fff",
  },
  titleStyle: {
    padding: "1rem 0",
  },
  iconstyle: {
    color: "#fff",
  },
});

const AdminDrawer = () => {
  const classes = useStyles();

  const drawerTopList = [
    {
      id: 1,
      name: "Add User",
      icon: <PersonAddIcon />,
      onClickHandler: () => console.log("Clicled"),
    },
  ];

  return (
    <Paper className={classes.paperStyle}>
      <Grid container justify="center">
        <Typography variant="h5" className={classes.titleStyle}>
          Admin
        </Typography>
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
    </Paper>
  );
};

export default AdminDrawer;
