import { Snackbar as MuiSnackbar, SnackbarProps, Alert } from "@mui/material";
import React from "react";

interface Props extends SnackbarProps {
  severity?: "success" | "error" | "info" | "warning";
  message: string;
}

const Snackbar: React.FC<Props> = ({
  severity = "info",
  message,
  ...props
}) => (
  <MuiSnackbar
    autoHideDuration={2000}
    anchorOrigin={{ vertical: "top", horizontal: "right" }}
    {...props}
  >
    <Alert severity={severity} sx={{ width: "100%" }}>
      {message}
    </Alert>
  </MuiSnackbar>
);

export default Snackbar;
