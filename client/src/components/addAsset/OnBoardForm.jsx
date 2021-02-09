import React from "react";
import { useDispatch, useSelector } from "react-redux";

//Material UI
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Typography,
} from "@material-ui/core";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { makeStyles } from "@material-ui/core/styles";

//Import Validation Schema
import { onboardValidationSchema } from "../../schema/validationSchema";

//Formik Imports
import { Formik, Form, Field } from "formik";

//Formik Material ui
import { Select } from "formik-material-ui";
import { KeyboardDateTimePicker } from "formik-material-ui-pickers";

// Imports
import CustomTextField from "../customcomponents/CustomTextField";
import { onboard_update } from "../../reducers/onboardSlice";
import { option_update } from "../../reducers/assetSelSlice";

const useStyles = makeStyles({
  container: {
    paddingTop: "2rem",
  },
  inputlablestyle: {
    // color: "#7b7b7b",
  },
  select: {
    // color: "#fff",
  },
  formStyle: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  paper: {
    // backgroundColor: "#fff",
  },
});

const OnBoardForm = () => {
  const classes = useStyles();
  const { onboard } = useSelector((state) => state.onboard);
  const dispatch = useDispatch();

  return (
    <Grid container direction="column">
      <Typography variant="h4" color="initial">
        Onboard
      </Typography>
      <Formik
        initialValues={onboard}
        validationSchema={onboardValidationSchema}
        onSubmit={(values) => {
          console.log(values.lastauditDate.toISOString());
          values.lastauditDate = values.lastauditDate.toISOString();
          values.onboardDate = values.onboardDate.toISOString();
          values.purchaseDate = values.purchaseDate.toISOString();
          values.warrantyExp = values.warrantyExp.toISOString();
          dispatch(onboard_update(values));
          dispatch(option_update(2));
        }}
      >
        {({ submitForm }) => (
          <Form className={classes.formStyle}>
            <Grid
              container
              justify="space-evenly"
              className={classes.container}
            >
              <Grid
                item
                sm={4}
                container
                direction="column"
                alignItems="flex-start"
                spacing={2}
              >
                <Grid item container>
                  <CustomTextField name="assetName" label="Asset Name" />
                </Grid>
                <Grid item container>
                  <CustomTextField name="cost" label="Cost" />
                </Grid>
                <Grid item container>
                  <CustomTextField name="warranty" label="Warranty" />
                </Grid>
                <Grid item container>
                  <CustomTextField name="vendor" label="Vendor" />
                </Grid>
                <Grid item container>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Field
                      component={KeyboardDateTimePicker}
                      name="onboardDate"
                      label="Onboard Date"
                      autoOk
                      inputVariant="outlined"
                    />
                  </MuiPickersUtilsProvider>
                </Grid>
                <Grid item container>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Field
                      component={KeyboardDateTimePicker}
                      name="purchaseDate"
                      label="Purchase Date"
                      autoOk
                      inputVariant="outlined"
                    />
                  </MuiPickersUtilsProvider>
                </Grid>
                <Grid item container direction="column">
                  <FormControl variant="outlined">
                    <InputLabel
                      color="secondary"
                      className={classes.inputlablestyle}
                    >
                      Asset Type
                    </InputLabel>
                    <Field
                      component={Select}
                      className={classes.select}
                      MenuProps={{ classes: { paper: classes.select } }}
                      name="assetType"
                      variant="outlined"
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value={"rented"}>Rented</MenuItem>
                      <MenuItem value={"leased"}>Leased</MenuItem>
                      <MenuItem value={"own"}>Own</MenuItem>
                    </Field>
                  </FormControl>
                </Grid>
              </Grid>
              <Grid
                item
                sm={4}
                container
                direction="column"
                alignItems="flex-start"
                spacing={2}
              >
                <Grid item container>
                  <CustomTextField
                    name="invoiceNumber"
                    label="Invoice Number"
                  />
                </Grid>
                <Grid item container>
                  <CustomTextField
                    name="purchaseOrder"
                    label="Purchase Order"
                  />
                </Grid>
                <Grid item container>
                  <CustomTextField name="assetId" label="Asset Id" />
                </Grid>
                <Grid item container>
                  <CustomTextField
                    name="productSerial"
                    label="Product Serial"
                  />
                </Grid>

                <Grid item container>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Field
                      component={KeyboardDateTimePicker}
                      name="warrantyExp"
                      label="Warranty Expiry Date"
                      autoOk
                      inputVariant="outlined"
                    />
                  </MuiPickersUtilsProvider>
                </Grid>
                <Grid item container>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Field
                      component={KeyboardDateTimePicker}
                      name="lastauditDate"
                      label="Last Audit Date"
                      autoOk
                      inputVariant="outlined"
                    />
                  </MuiPickersUtilsProvider>
                </Grid>
                <Grid item container>
                  <CustomTextField name="assetStatus" label="Asset Status" />
                </Grid>
              </Grid>
            </Grid>
            <Grid
              container
              justify="flex-end"
              className={classes.container}
              spacing={2}
            >
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
  );
};

export default OnBoardForm;
