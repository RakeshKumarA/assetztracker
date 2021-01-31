import { TextField } from "@material-ui/core";
import React from "react";

const AdminTextField = ({
  variant,
  color,
  InputLabelProps,
  InputProps,
  fullWidth,
  size,
  ...props
}) => {
  return (
    <TextField
      variant="outlined"
      color="secondary"
      InputLabelProps={{
        style: {
          color: "#fff",
        },
      }}
      InputProps={{
        style: {
          color: "#fff",
        },
      }}
      fullWidth={true}
      size={"small"}
      {...props}
    >
      {props.children}
    </TextField>
  );
};

export default AdminTextField;
