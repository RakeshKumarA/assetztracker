import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";

import { Controller, useForm } from "react-hook-form";
import {
  Grid,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { useDispatch, useSelector } from "react-redux";
import { software_update, software_delete } from "../../reducers/softwareSlice";
import { option_update } from "../../reducers/assetSelSlice";

//Date
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

const useStyles = makeStyles({
  table: {
    minWidth: 600,
  },
  tablecolor: {
    // color: "#fff",
  },
  iconstyle: {
    // color: "#fff",
  },
  paper: {
    // backgroundColor: "#fff",
  },
  datepicker: {
    display: "block",
    boxSizing: "border-box",
    width: "100%",
    borderRadius: "0.25rem",
    border: "1px solid white",
    padding: "10px 15px",
    marginBottom: "10px",
    fontSize: "14px",
  },
});

const SoftwareForm = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const {
    errors,
    register,
    handleSubmit,
    control,
    setValue,
    watch,
  } = useForm();
  const currentdate = new Date().toISOString().slice(0, 10);
  const { software } = useSelector((state) => state.software);
  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleclick = (data) => {
    console.log(data);
    // const datawithkey = { ...data, id: uuidv4() };
    // dispatch(software_update(datawithkey));
    handleClose();
  };

  const clickContinueHandler = () => {
    dispatch(option_update(3));
  };

  const clickBackHandler = () => {
    dispatch(option_update(1));
  };

  const handleDelete = (id) => {
    dispatch(software_delete(id));
  };

  //Date
  const [selectedDate, setSelectedDate] = React.useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <>
      <Typography variant="h4" color="initial">
        Software
      </Typography>
      <Grid container alignItems="center" direction="column" spacing={2}>
        <Grid item sm={10} container justify="flex-end">
          <Button
            variant="contained"
            color="secondary"
            onClick={handleClickOpen}
          >
            Add Software
          </Button>
        </Grid>
        <Grid item sm={10}>
          <TableContainer component={Paper} elevation={8}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Software Name</TableCell>
                  <TableCell align="right">Version</TableCell>
                  <TableCell align="right">Expiry Date</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {software.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell component="th" scope="row">
                      {row.softwareName}
                    </TableCell>
                    <TableCell align="right">{row.softwareVersion}</TableCell>
                    <TableCell align="right">{row.expDate}</TableCell>
                    <TableCell align="center" padding="none">
                      <IconButton
                        size="small"
                        className={classes.iconstyle}
                        onClick={() => handleDelete(row.id)}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item sm={10} container justify="flex-end" spacing={2}>
          <Grid item>
            <Button
              variant="contained"
              color="default"
              onClick={clickBackHandler}
            >
              Back
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="secondary"
              onClick={clickContinueHandler}
            >
              Continue
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        PaperProps={{
          classes: {
            root: classes.paper,
          },
        }}
      >
        <DialogTitle id="form-dialog-title">Add Software</DialogTitle>

        <TextField
          autoFocus
          name="softwareName"
          inputRef={register({
            required: "Software Name is Required",
          })}
          id="name"
          label="Software Name"
          fullWidth
          required
          error={!!errors.softwareName}
          helperText={errors?.softwareName?.message}
        />

        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Controller
            as={ReactDatePicker}
            control={control}
            valueName="expDate" // DateSelect value's name is selected
            onChange={([expDate]) => expDate}
            name="expDate"
            className={classes.datepicker}
            placeholderText="Select date"
          />
        </MuiPickersUtilsProvider>
        <TextField
          name="softwareVersion"
          inputRef={register}
          id="name"
          label="Software Version"
          fullWidth
        />
        <DialogActions>
          <Button
            onClick={handleSubmit((data) => handleclick(data))}
            variant="contained"
            color="secondary"
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default SoftwareForm;
