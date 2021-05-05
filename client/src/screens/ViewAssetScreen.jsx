import React, { useEffect } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import { Grid,TableHead, Typography } from "@material-ui/core";
import TableRow from "@material-ui/core/TableRow";
//MUI Libs
import { makeStyles } from "@material-ui/core/styles";
import {  viewAssets } from ".././reducers/viewAssetSlice";
import { useSelector, useDispatch } from "react-redux";
import {
  viewUsers,
  
} from ".././reducers/viewUserSlice";

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
  
  const { assets } = useSelector((state) => state.viewAsset);
  const { view } = useSelector((state) => state.viewUser);

 useEffect(() => {
  dispatch(viewUsers());
}, [dispatch]);

  useEffect(() => {
    dispatch(viewAssets());
  }, [dispatch]);

  function convert(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [ day,mnth,date.getFullYear()].join("-");
  }
  return (
    <Paper className={classes.paperStyle}>
    <Grid container alignItems="center" direction="column">
     
      <Grid item>
        <Typography variant="h4" color="initial" className={classes.title}>
          View Assets
        </Typography>
      </Grid>
     
      <Paper style={{width:"75vw",marginTop:"2vh"}}>
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
  )
}

export default ViewAssetScreen