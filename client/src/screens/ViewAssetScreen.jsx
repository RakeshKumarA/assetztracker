import React, { useEffect, useState } from "react";
import CustomTable from "../components/customcomponents/CustomTable";
import Paper from "@material-ui/core/Paper";
import { Grid, Typography, TextField, Button } from "@material-ui/core";
//MUI Libs
import { makeStyles } from "@material-ui/core/styles";
import { searchAsset, viewAssets } from ".././reducers/viewAssetSlice";
import { useSelector, useDispatch } from "react-redux";
import { set_snackbar } from "../reducers/snackSlice";

const useStyles = makeStyles({
  paperStyle: {
    width: "80%",
    minHeight: "95vh",
    margin: "4vh auto",
  },
  title: {
    padding: "1.5rem 0",
  },
  searchContainer: {
    width: "90%",
    paddingBottom: "2rem",
  },
});

const ViewAssetScreen = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  // View Assets
  const { assets } = useSelector((state) => state.viewAsset);
  const tableRows = assets.map((value) => ({
    id: value.id,
    assetId: value.onboard.assetId.value,
    assetName: value.onboard.assetName.value,
    cost: value.onboard.cost.value,
    vendor: value.onboard.vendor.value,
    warrantyExp: value.onboard.warrantyExp.value,
    assetStatus: value.onboard.assetStatus.value,
    name: value.name,
  }));
  // Search Asset
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(viewAssets());
  }, [dispatch]);

  const onSearchHandler = () => {
    if (searchTerm === "") {
      dispatch(
        set_snackbar({
          snackbarOpen: true,
          snackbarType: "warning",
          snackbarMessage: "Please Enter AssetId",
          snackbarSeverity: "warning",
        })
      );
    } else {
      dispatch(searchAsset(searchTerm));
      setSearchTerm("");
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const onResetHandler = () => {
    setSearchTerm("");
    dispatch(viewAssets());
  };

  return (
    <Paper className={classes.paperStyle}>
      <Grid container alignItems="center" direction="column">
        <Grid item>
          <Typography variant="h4" color="initial" className={classes.title}>
            View Assets
          </Typography>
        </Grid>
        <Grid item container className={classes.searchContainer} spacing={2}>
          <Grid item xs={6}>
            <TextField
              label="Search By Asset ID"
              variant="outlined"
              color="secondary"
              fullWidth={true}
              size={"small"}
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="secondary"
              onClick={onSearchHandler}
            >
              Search
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              onClick={onResetHandler}
            >
              Reset
            </Button>
          </Grid>
        </Grid>
        <CustomTable rows={tableRows} screen="viewScreen" />
      </Grid>
    </Paper>
  );
};

export default ViewAssetScreen;
