import React, { useEffect } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import { Grid,TableHead, Typography } from "@material-ui/core";
import TableRow from "@material-ui/core/TableRow";
import { makeStyles } from "@material-ui/core/styles";
import {  viewAssets } from ".././reducers/viewAssetSlice";
import { viewUsers } from ".././reducers/viewUserSlice";
import { useSelector, useDispatch } from "react-redux";


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
  
  const { asset } = useSelector((state) => state.viewAssets);
  const { view } = useSelector((state) => state.viewUser);
  function convert(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [day, mnth,date.getFullYear()].join("-");
  }

  
  useEffect(() => {
    dispatch(viewUsers());
  }, [dispatch]);

 
  useEffect(() => {
    dispatch(viewAssets());
  }, [dispatch]);
  return (
    <Paper className={classes.paperStyle}>
    <Grid container alignItems="center" direction="column">
      <Grid item>
        <Typography variant="h4" color="initial" className={classes.title}>
          View Assets
        </Typography>
      </Grid>
      <Paper style={{width:"75vw",margin:"0 0 5vh 0"}}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">Asset id</TableCell>
              <TableCell align="center">Asset name</TableCell>
              <TableCell align="center">Cost</TableCell>
              <TableCell align="center">Vendor</TableCell>
              <TableCell align="center">Warranty expiry date</TableCell>
              <TableCell align="center">Asset status</TableCell>
              <TableCell align="center">Asset added by</TableCell>
            </TableRow>
          </TableHead>
          {asset.map((row) => (
            <TableBody>
              <TableRow key={row.userid}>
                <TableCell align="center">{row.onboard.assetId.value}</TableCell>
                <TableCell align="center">{row.onboard.assetName.value}</TableCell>
                <TableCell align="center">{row.onboard.cost.value}</TableCell>
                <TableCell align="center">{row.onboard.vendor.value}</TableCell>
                <TableCell align="center">{convert(row.onboard.warrantyExp.value)}</TableCell>
                <TableCell align="center">{row.onboard.assetStatus.value}</TableCell>
                <TableCell align="center">{view.filter((result)=> row.userid === result.userid).map((value)=>(value.name))}</TableCell>
              </TableRow>
            </TableBody> 
          ))}
        </Table>
      </TableContainer>
    </Paper>
  </Grid>
  </Paper>
)}

export default ViewAssetScreen
