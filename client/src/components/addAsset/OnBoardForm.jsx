import React from "react";
import { useDispatch, useSelector } from "react-redux";

//Material UI
import {
  Button,
  FormControl,
  Grid,
  MenuItem,
  TextField as TextFieldMaterial,
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
import { KeyboardDateTimePicker } from "formik-material-ui-pickers";

// Imports
import CustomTextField from "../customcomponents/CustomTextField";
import { onboard_update } from "../../reducers/onboardSlice";
import { option_update_continue } from "../../reducers/assetSelSlice";

const useStyles = makeStyles({
  container: {
    paddingTop: "2rem",
  },
  formStyle: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
});

const OnBoardForm = () => {
  const classes = useStyles();
  const { onboard } = useSelector((state) => state.onboard);
  const { enable } = useSelector((state) => state.assetSel);
  const dispatch = useDispatch();

  const initialValues = {
    assetId: onboard.assetId.value,
    assetName: onboard.assetName.value,
    assetStatus: onboard.assetStatus.value,
    assetType: onboard.assetType.value,
    cost: onboard.cost.value,
    invoiceNumber: onboard.invoiceNumber.value,
    lastauditDate: onboard.lastauditDate.value,
    onboardDate: onboard.onboardDate.value,
    productSerial: onboard.productSerial.value,
    purchaseDate: onboard.purchaseDate.value,
    purchaseOrder: onboard.purchaseOrder.value,
    vendor: onboard.vendor.value,
    warranty: onboard.warranty.value,
    warrantyExp: onboard.warrantyExp.value,
  };

  const enableoncontinue = { ...enable, software: false };

  return (
    <Grid container direction="column">
      <Typography variant="h4" color="initial">
        Onboard
      </Typography>
      <Formik
        initialValues={initialValues}
        validationSchema={onboardValidationSchema}
        onSubmit={(values) => {
          const valuetobeuploaded = {
            assetId: {
              lable: "Asset Id",
              value: values.assetId,
            },
            assetName: {
              lable: "Asset Name",
              value: values.assetName,
            },
            assetStatus: {
              lable: "Asset Status",
              value: values.assetStatus,
            },
            assetType: {
              lable: "Asset Type",
              value: values.assetType,
            },
            cost: {
              lable: "Cost",
              value: values.cost,
            },
            invoiceNumber: {
              lable: "Invoice Number",
              value: values.invoiceNumber,
            },
            lastauditDate: {
              lable: "Last Audit Date",
              value: values.lastauditDate
                ? values.lastauditDate.toString()
                : values.lastauditDate,
            },
            onboardDate: {
              lable: "Onboard Date",
              value: values.onboardDate
                ? values.onboardDate.toString()
                : values.onboardDate,
            },
            productSerial: {
              lable: "Product Serial",
              value: values.productSerial,
            },
            purchaseDate: {
              lable: "Purchase Date",
              value: values.purchaseDate
                ? values.purchaseDate.toString()
                : values.purchaseDate,
            },
            purchaseOrder: {
              lable: "Purchase Order",
              value: values.purchaseOrder,
            },
            vendor: {
              lable: "Vendor",
              value: values.vendor,
            },
            warranty: {
              lable: "Warranty",
              value: values.warranty,
            },
            warrantyExp: {
              lable: "Warranty Exp Date",
              value: values.warrantyExp
                ? values.warrantyExp.toString()
                : values.warrantyExp,
            },
          };
          dispatch(onboard_update(valuetobeuploaded));
          dispatch(
            option_update_continue({
              option: 2,
              enable: enableoncontinue,
            })
          );
        }}
      >
        {({ submitForm, setFieldValue }) => (
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
                <Grid item container direction="column">
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Field
                      component={KeyboardDateTimePicker}
                      name="onboardDate"
                      label="Onboard Date"
                      autoOk
                      inputVariant="outlined"
                      format="yyyy-mm-dd HH:MM:SS p"
                    />
                  </MuiPickersUtilsProvider>
                </Grid>
                <Grid item container direction="column">
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Field
                      component={KeyboardDateTimePicker}
                      name="purchaseDate"
                      label="Purchase Date"
                      autoOk
                      inputVariant="outlined"
                      format="yyyy-mm-dd HH:MM:SS p"
                    />
                  </MuiPickersUtilsProvider>
                </Grid>
                <Grid item container direction="column">
                  <FormControl fullWidth>
                    <Field
                      fullWidth
                      name="assetType"
                      label="Asset Type"
                      variant="outlined"
                      as={TextFieldMaterial}
                      select
                    >
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

                <Grid item container direction="column">
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Field
                      component={KeyboardDateTimePicker}
                      name="warrantyExp"
                      label="Warranty Expiry Date"
                      autoOk
                      inputVariant="outlined"
                      format="yyyy-mm-dd HH:MM:SS p"
                    />
                  </MuiPickersUtilsProvider>
                </Grid>
                <Grid item container direction="column">
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Field
                      component={KeyboardDateTimePicker}
                      name="lastauditDate"
                      label="Last Audit Date"
                      autoOk
                      inputVariant="outlined"
                      format="yyyy-mm-dd HH:MM:SS p"
                    />
                  </MuiPickersUtilsProvider>
                </Grid>
                <Grid item container>
                  <CustomTextField
                    name="assetStatus"
                    label="Asset Status"
                    disabled
                  />
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
