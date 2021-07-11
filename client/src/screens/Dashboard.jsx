import React from "react";
import { useDispatch, useSelector } from "react-redux";
//MUI Libs
import { Grid, Typography, Card, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

//Other Libraries
import PieChart from "../components/charts/PieChart";
import { useEffect } from "react";
import { dashboardChart } from "../reducers/dashboardSlice";
import CustomTable from "../components/customcomponents/CustomTable";

const useStyles = makeStyles({
  title: {
    padding: "1.5rem 0",
  },
  latestactstyle: {
    padding: "2rem",
  },
  cardStyle: {
    width: "90%",
    height: "40vh",
    padding: "1rem",
  },
  chartTitleStyle: {
    paddingBottom: "1rem",
  },
  paperStyle: {
    width: "97%",
    minHeight: "95vh",
    margin: "4vh auto",
  },
  title: {
    padding: "1.5rem 0",
  },
});

const Dashboard = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { assetsCountByStatus, assetsCountByCategory } = useSelector(
    (state) => state.dashboard.stats
  );
  const { assetsFilterList } = useSelector((state) => state.dashboard);
  const tableRows = assetsFilterList.map((value) => ({
    id: value.id,
    assetId: value.onboard.assetId.value,
    assetName: value.onboard.assetName.value,
    cost: value.onboard.cost.value,
    vendor: value.onboard.vendor.value,
    warrantyExp: value.onboard.warrantyExp.value,
    assetStatus: value.onboard.assetStatus.value,
    name: value.name,
  }));
  const statusCountLabel = ["Onboarded", "Assigned", "InStock"];
  const categoryCountLabel = ["Rented", "Owned", "Leased"];
  const rewardData = [55, 45, 98];
  const rewardLable = ["Today", "Week", "Month"];

  useEffect(() => {
    dispatch(dashboardChart());
  }, [dispatch]);

  return (
    <Grid container direction="column">
      <Grid item>
        <Typography
          variant="h3"
          color="initial"
          className={classes.latestactstyle}
        >
          Latest Activity
        </Typography>
      </Grid>
      <Grid item container justify="center">
        <Grid item md={4} sm={8} container justify="center">
          <Typography
            variant="h5"
            color="initial"
            className={classes.chartTitleStyle}
          >
            Asset Count by Status
          </Typography>
          <Card className={classes.cardStyle}>
            <PieChart
              rawData={assetsCountByStatus}
              type="assetByStatus"
              labels={statusCountLabel}
            />
          </Card>
        </Grid>
        <Grid item md={4} sm={8} container justify="center">
          <Typography
            variant="h5"
            color="initial"
            className={classes.chartTitleStyle}
          >
            Asset Count by Category
          </Typography>
          <Card className={classes.cardStyle}>
            <PieChart
              rawData={assetsCountByCategory}
              type="assetByCategory"
              labels={categoryCountLabel}
            />
          </Card>
        </Grid>
        <Grid item md={4} sm={8} container justify="center">
          <Typography variant="h5" color="initial">
            Asset Count by Period
          </Typography>
          <Card className={classes.cardStyle}>
            <PieChart rawData={rewardData} type="Reward" labels={rewardLable} />
          </Card>
        </Grid>
      </Grid>
      <Grid item>
        <Paper className={classes.paperStyle}>
          <Grid container alignItems="center" direction="column">
            <Grid item>
              <Typography
                variant="h4"
                color="initial"
                className={classes.title}
              >
                View Filtered List
              </Typography>
            </Grid>
            <CustomTable rows={tableRows} />
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
