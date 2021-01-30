import React from "react";
import Grid from "@material-ui/core/Grid";
import { Button, Paper, TextField, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AdminDrawer from "../components/drawer/AdminDrawer";

//Form Validation Libs
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

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
  title: {
    padding: "1rem 0",
  },
});

//Form Validation Schema
const schema = yup.object().shape({
  email: yup.string().email("Not a Valid Email").required("Email required"),
  password: yup.string().required("Password required"),
  name: yup
    .string()
    .required("First Name Required")
    .max(12, "Maximum 12 Characters"),
});

const AdminScreen = () => {
  const classes = useStyles();
  const { register, handleSubmit, errors } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const onClickHandler = (data) => {
    console.log(data);
  };

  return (
    <Grid
      container
      className={classes.container}
      justify="center"
      alignItems="center"
    >
      <Grid item container className={classes.cardContainer} spacing={2}>
        <Grid item container sm={2}>
          <Paper className={classes.paperStyle}>
            <AdminDrawer />
          </Paper>
        </Grid>
        <Grid item container sm={10}>
          <Paper className={classes.paperStyle}>
            <Typography
              variant="h4"
              color="initial"
              align="center"
              className={classes.title}
            >
              Add New User
            </Typography>

            <Grid
              item
              container
              direction="column"
              justify="center"
              alignItems="center"
            >
              <Grid item container sm={4} spacing={2}>
                <Grid item container direction="column">
                  <Typography variant="subtitle1" color="initial">
                    Name
                  </Typography>
                  <TextField
                    name="name"
                    label="Enter Name"
                    variant="filled"
                    fullWidth={true}
                    size={"small"}
                    inputRef={register}
                    error={!!errors.name}
                    helperText={errors?.name?.message}
                  />
                </Grid>
                <Grid item container direction="column">
                  <Typography variant="subtitle1" color="initial">
                    Email
                  </Typography>
                  <TextField
                    name="email"
                    label="Enter Email"
                    variant="filled"
                    type="email"
                    size={"small"}
                    inputRef={register}
                    error={!!errors.email}
                    helperText={errors?.email?.message}
                  />
                </Grid>
                <Grid item container direction="column">
                  <Typography variant="subtitle1" color="initial">
                    Temporary Password
                  </Typography>
                  <TextField
                    name="password"
                    label="Enter Password"
                    variant="filled"
                    fullWidth={true}
                    size={"small"}
                    inputRef={register}
                    error={!!errors.password}
                    helperText={errors?.password?.message}
                    type="password"
                  />
                </Grid>
                <Grid item container direction="column">
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleSubmit((data) => onClickHandler(data))}
                  >
                    REGISTER
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default AdminScreen;
