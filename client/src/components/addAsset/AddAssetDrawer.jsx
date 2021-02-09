import React from "react";
import Grid from "@material-ui/core/Grid";
import { Divider, Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import CodeIcon from "@material-ui/icons/Code";
import DnsIcon from "@material-ui/icons/Dns";
import DescriptionIcon from "@material-ui/icons/Description";
import TrendingDownIcon from "@material-ui/icons/TrendingDown";
import { option_update } from "../../reducers/assetSelSlice";
import { useDispatch } from "react-redux";

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
  },
  titleStyle: {
    padding: "1rem 0",
  },
});

const AddAssetDrawer = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const drawerTopList = [
    {
      id: 1,
      name: "Onboard",
      icon: <AddCircleIcon />,
      onClickHandler: () => dispatch(option_update(1)),
    },
    {
      id: 2,
      name: "Software",
      icon: <CodeIcon />,
      onClickHandler: () => dispatch(option_update(2)),
    },
    {
      id: 3,
      name: "Hardware",
      icon: <DnsIcon />,
      onClickHandler: () => dispatch(option_update(3)),
    },
    {
      id: 4,
      name: "Depreciation",
      icon: <TrendingDownIcon />,
      onClickHandler: () => dispatch(option_update(4)),
    },
    {
      id: 5,
      name: "Documents",
      icon: <DescriptionIcon />,
      onClickHandler: () => dispatch(option_update(5)),
    },
  ];

  return (
    <Paper className={classes.paperStyle}>
      <Grid container justify="center">
        <Typography variant="h5" className={classes.titleStyle}>
          Add Asset
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
            <ListItemIcon>{draweritem.icon}</ListItemIcon>
            <ListItemText primary={draweritem.name} />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default AddAssetDrawer;
