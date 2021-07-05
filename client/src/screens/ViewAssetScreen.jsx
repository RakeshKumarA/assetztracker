import React, { useEffect, useState } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import {
  Grid,
  TableHead,
  Typography,
  TextField,
  Button,
} from "@material-ui/core";
import TableRow from "@material-ui/core/TableRow";
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

  function convert(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [day, mnth, date.getFullYear()].join("-");
  }
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
        <Paper style={{ width: "75vw", marginTop: "2vh" }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center">ASSET ID</TableCell>
                  <TableCell align="center">ASSET NAME</TableCell>
                  <TableCell align="center">COST</TableCell>
                  <TableCell align="center">VENDOR</TableCell>
                  <TableCell align="center">WARRANTY EXPIRY DATE</TableCell>
                  <TableCell align="center">ASSET STATUS</TableCell>
                  <TableCell align="center">ASSET ADDED BY</TableCell>
                </TableRow>
              </TableHead>
              {assets.map((row) => (
                <TableBody key={row.id}>
                  <TableRow>
                    <TableCell align="center">
                      {row.onboard.assetId.value}
                    </TableCell>
                    <TableCell align="center">
                      {row.onboard.assetName.value}
                    </TableCell>
                    <TableCell align="center">
                      {row.onboard.cost.value}
                    </TableCell>
                    <TableCell align="center">
                      {row.onboard.vendor.value}
                    </TableCell>
                    <TableCell align="center">
                      {convert(row.onboard.warrantyExp.value)}
                    </TableCell>
                    <TableCell align="center">
                      {row.onboard.assetStatus.value}
                    </TableCell>
                    <TableCell align="center">{row.name}</TableCell>
                  </TableRow>
                </TableBody>
              ))}
            </Table>
          </TableContainer>
        </Paper>
      </Grid>
    </Paper>
  );
};

export default ViewAssetScreen;
