import React from "react";
import { useDispatch, useSelector } from "react-redux";
//MUI Libs
import { Grid, Typography, Card } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

//Other Libraries
import PieChart from "../components/charts/PieChart";
import { useEffect } from "react";
import { dashboardChart } from "../reducers/dashboardSlice";

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
});

const Dashboard = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { assetsCountByStatus, assetsCountByCategory } = useSelector(
    (state) => state.dashboard.stats
  );
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
              type="Asset Count by Status"
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
              type="Asset Count by Category"
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
    </Grid>
  );
};

export default Dashboard;
