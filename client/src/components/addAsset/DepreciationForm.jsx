import React from "react";
import { useDispatch, useSelector } from "react-redux";

//Material UI
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Typography,
  Button,
  FormControl,
  MenuItem,
  TextField as TextFieldMaterial,
} from "@material-ui/core";

//Modular Import
import { option_update } from "../../reducers/assetSelSlice";
import { depreciation_update } from "../../reducers/depreciationSlice";
import CustomTextField from "../customcomponents/CustomTextField";

//Import Validation Schema
import { depreciationValidationSchema } from "../../schema/validationSchema";

//Formik
import { Formik, Form, Field } from "formik";

const useStyles = makeStyles({
  container: {
    paddingTop: "2rem",
  },
  formStyle: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    maxWidth: "450px",
  },
});

const DepreciationForm = () => {
  const classes = useStyles();
  const { depreciation } = useSelector((state) => state.depreciation);
  const dispatch = useDispatch();

  const handleBackclick = () => {
    dispatch(option_update(3));
  };

  return (
    <>
      <Typography variant="h4" color="initial">
        Depreciation
      </Typography>
      <Grid container justify="center" className={classes.container}>
        <Formik
          initialValues={depreciation}
          validationSchema={depreciationValidationSchema}
          onSubmit={(values) => {
            dispatch(depreciation_update(values));
            dispatch(option_update(5));
          }}
        >
          {({ submitForm }) => (
            <Form className={classes.formStyle}>
              <Grid item container sm={8} spacing={2} alignItems="center">
                <Grid item container direction="column">
                  <CustomTextField name="shelflife" label="Shelf Life" />
                </Grid>
                <Grid item container direction="column">
                  <CustomTextField
                    name="residualvalue"
                    label="Residual Value"
                  />
                </Grid>
                <Grid item container direction="column">
                  <FormControl fullWidth>
                    <Field
                      fullWidth
                      name="depmethod"
                      label="Depreciation Method"
                      variant="outlined"
                      as={TextFieldMaterial}
                      select
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value="straightlinemethod">
                        Straight Line Method
                      </MenuItem>
                      <MenuItem value="writtendownmethod">
                        Written Down Method
                      </MenuItem>
                    </Field>
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
                    onClick={submitForm}
                  >
                    Continue
                  </Button>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </Grid>
    </>
  );
};

export default DepreciationForm;
