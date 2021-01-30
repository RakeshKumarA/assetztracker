import React, { useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

//MUI Libs
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { CircularProgress } from "@material-ui/core";

//Modular imports
import { login } from "../reducers/userSlice";
import HomePage from "../assets/HomePage.svg";
import assetz from "../assets/assetzFinal.png";

//Form Validation Libs
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "90vh",
  },
  title: {
    marginTop: "5vh",
  },
  linkdeco: {
    textDecoration: "none",
  },
  homepage: {
    width: "60vw",
  },
  logo: {
    width: "20vw",
  },
  homepagecontainer: {
    minHeight: "90vh",
  },
}));

//Form Validation Schema
const schema = yup.object().shape({
  email: yup.string().email("Not a Valid Email").required("Email required"),
  password: yup.string().required("Password required"),
});

const LoginScreen = () => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.user);
  const { loading, userInfo } = userLogin;
  const location = useLocation();
  const history = useHistory();

  const { register, handleSubmit, errors } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const redirect = location.search
    ? location.search.split("=")[1]
    : "/dashboard";

  useEffect(() => {
    if (userInfo && Object.keys(userInfo).length !== 0) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const onClickHandler = (data) => {
    const { email, password } = data;
    dispatch(login(email, password));
  };

  return (
    <Grid container className={classes.root}>
      <Grid
        item
        sm={8}
        container
        direction="column"
        alignItems="center"
        justify="center"
        className={classes.homepagecontainer}
      >
        <Grid item>
          <img src={assetz} alt="Logo" className={classes.logo} />
        </Grid>
        <Grid item>
          <img src={HomePage} alt="Home Page" className={classes.homepage} />
        </Grid>
      </Grid>
      {loading ? (
        <CircularProgress />
      ) : (
        <Grid item xs={12} sm={4} container>
          <Grid
            item
            container
            sm={10}
            direction="column"
            justify="center"
            spacing={2}
          >
            <Grid item>
              <Typography
                variant="h4"
                color="initial"
                className={classes.title}
              >
                SIGN IN
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="subtitle1" color="initial">
                Email
              </Typography>
              <TextField
                name="email"
                label="Enter Email"
                variant="filled"
                fullWidth={true}
                type="email"
                size={"small"}
                inputRef={register}
                error={!!errors.email}
                helperText={errors?.email?.message}
              />
            </Grid>

            <Grid item>
              <Typography variant="subtitle1" color="initial">
                Password
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
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit((data) => onClickHandler(data))}
              >
                SIGN IN
              </Button>
            </Grid>
          </Grid>
        </Grid>
      )}
    </Grid>
  );
};

export default LoginScreen;
