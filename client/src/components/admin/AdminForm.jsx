import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@material-ui/core";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";

//Form Validation Libs
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import AdminTextField from "../customcomponents/AdminTextField";
import { useDispatch } from "react-redux";
import { addUser } from "../../reducers/addUserSlice";

const useStyles = makeStyles({
  container: {
    minHeight: "100vh",
  },
  cardContainer: {
    height: "80%",
    width: "90%",
  },

  title: {
    padding: "1rem 0",
  },
  inputlablestyle: {
    color: "#fff",
  },
  select: {
    color: "#fff",
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

const AdminForm = () => {
  const classes = useStyles();
  const { register, handleSubmit, errors, reset } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });
  const dispatch = useDispatch();

  const onClickHandler = (data) => {
    const { email, name, password, role } = data;
    dispatch(addUser(email, name, password, role));
    reset({ email: "", name: "", password: "", role: "view" });
  };
  return (
    <Grid item container sm={4} spacing={2}>
      <Grid item container direction="column">
        <Typography
          variant="h4"
          color="initial"
          align="center"
          className={classes.title}
        >
          Add New User
        </Typography>
      </Grid>
      <Grid item container direction="column">
        <AdminTextField
          name="name"
          label="First Name"
          inputRef={register}
          error={!!errors.name}
          helperText={errors?.name?.message}
        />
      </Grid>
      <Grid item container direction="column">
        <AdminTextField
          name="email"
          label="Email"
          inputRef={register}
          error={!!errors.email}
          helperText={errors?.email?.message}
        />
      </Grid>
      <Grid item container direction="column">
        <AdminTextField
          name="password"
          label="Default Password"
          inputRef={register}
          error={!!errors.password}
          helperText={errors?.password?.message}
          type="password"
        />
      </Grid>
      <Grid item container direction="column">
        <FormControl variant="outlined">
          <InputLabel
            id="demo-simple-select-label"
            color="secondary"
            className={classes.inputlablestyle}
            shrink={true}
          >
            Role
          </InputLabel>
          <Select
            defaultValue="view"
            className={classes.inputlablestyle}
            MenuProps={{ classes: { paper: classes.select } }}
            inputProps={{
              inputRef: (ref) => {
                if (!ref) return;
                register({
                  name: "role",
                  value: ref.value,
                });
              },
            }}
          >
            <MenuItem value={"view"}>view</MenuItem>
            <MenuItem value={"write"}>write</MenuItem>
            <MenuItem value={"admin"}>admin</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item container direction="column">
        <Button
          variant="contained"
          color="secondary"
          onClick={handleSubmit((data) => onClickHandler(data))}
        >
          Add User
        </Button>
      </Grid>
    </Grid>
  );
};

export default AdminForm;
