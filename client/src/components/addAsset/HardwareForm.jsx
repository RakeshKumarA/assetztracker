import React from "react";
import { v4 as uuidv4 } from "uuid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";

import { useForm } from "react-hook-form";
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
import { hardware_delete, hardware_update } from "../../reducers/hardwareSlice";
import { option_update } from "../../reducers/assetSelSlice";

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
});

const HardwareForm = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const { errors, register, handleSubmit } = useForm();
  const currentdate = new Date().toISOString().slice(0, 10);
  const { hardware } = useSelector((state) => state.hardware);
  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleclick = (data) => {
    const datawithkey = { ...data, id: uuidv4() };
    dispatch(hardware_update(datawithkey));
    handleClose();
  };

  const clickContinueHandler = () => {
    dispatch(option_update(4));
  };

  const clickBackHandler = () => {
    dispatch(option_update(2));
  };

  const handleDelete = (id) => {
    dispatch(hardware_delete(id));
  };

  return (
    <>
      <Typography variant="h4" color="initial">
        Hardware
      </Typography>
      <Grid container alignItems="center" direction="column" spacing={2}>
        <Grid item sm={10} container justify="flex-end">
          <Button
            variant="contained"
            color="secondary"
            onClick={handleClickOpen}
          >
            Add Hardware
          </Button>
        </Grid>
        <Grid item sm={10}>
          <TableContainer component={Paper} elevation={8}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Hardware Name</TableCell>
                  <TableCell align="right">Version</TableCell>
                  <TableCell align="right">Expiry Date</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {hardware.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell component="th" scope="row">
                      {row.hardwareName}
                    </TableCell>
                    <TableCell align="right">{row.hardwareVersion}</TableCell>
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
        <DialogTitle id="form-dialog-title">Add Hardware</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            name="hardwareName"
            inputRef={register({
              required: "Hardware Name is Required",
            })}
            id="name"
            label="Hardware Name"
            fullWidth
            required
            error={!!errors.hardwareName}
            helperText={errors?.hardwareName?.message}
          />
          <TextField
            name="hardwareVersion"
            inputRef={register}
            id="name"
            label="Hardware Version"
            fullWidth
          />
          <TextField
            name="expDate"
            inputRef={register}
            id="name"
            label="Expiry Date"
            type="date"
            defaultValue={currentdate}
            fullWidth
          />
        </DialogContent>
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

export default HardwareForm;
