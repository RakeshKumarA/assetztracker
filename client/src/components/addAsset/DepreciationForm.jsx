import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Typography,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";
import CustomTextField from "../customcomponents/CustomTextField";

//Form Validation Libs
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { option_update } from "../../reducers/assetSelSlice";
import { depreciation_update } from "../../reducers/depreciationSlice";

const useStyles = makeStyles({
  inputlablestyle: {
    // color: "#7b7b7b",
  },
  select: {
    // color: "#fff",
  },
  container: {
    paddingTop: "2rem",
  },
});

const DepreciationForm = () => {
  const classes = useStyles();
  const { depreciation } = useSelector((state) => state.depreciation);
  const dispatch = useDispatch();
  const { register, handleSubmit, control } = useForm({
    defaultValues: depreciation,
  });

  const handleContclick = (data) => {
    console.log(data);
    dispatch(depreciation_update(data));
    dispatch(option_update(5));
  };

  const handleBackclick = () => {
    dispatch(option_update(3));
  };

  return (
    <>
      <Typography variant="h4" color="initial">
        Depreciation
      </Typography>
      <Grid container justify="center" className={classes.container}>
        <Grid item container sm={6} spacing={2}>
          <Grid item container direction="column">
            <CustomTextField
              name="shelflife"
              label="Shelf Life"
              inputRef={register}
            />
          </Grid>
          <Grid item container direction="column">
            <CustomTextField
              name="residualvalue"
              label="Residual Value"
              inputRef={register}
            />
          </Grid>
          <Grid item container direction="column">
            <FormControl variant="outlined">
              <InputLabel color="secondary" className={classes.inputlablestyle}>
                Depreciation Method
              </InputLabel>
              <Controller
                as={
                  <Select
                    className={classes.select}
                    MenuProps={{ classes: { paper: classes.select } }}
                  >
                    <MenuItem value="">None</MenuItem>
                    <MenuItem value="straightlinemethod">
                      Straight Line Method
                    </MenuItem>
                    <MenuItem value="writtendownmethod">
                      Written Down Method
                    </MenuItem>
                  </Select>
                }
                name="depmethod"
                control={control}
                defaultValue=""
              />
            </FormControl>
          </Grid>
        </Grid>
        <Grid
          item
          sm={10}
          container
          justify="flex-end"
          spacing={2}
          className={classes.container}
        >
          <Grid item>
            <Button
              variant="contained"
              color="default"
              onClick={handleBackclick}
            >
              Back
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleSubmit((data) => handleContclick(data))}
            >
              Continue
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default DepreciationForm;
