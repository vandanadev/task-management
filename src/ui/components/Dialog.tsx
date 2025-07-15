import {
  Dialog as MuiDialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogProps,
} from "@mui/material";
import React from "react";

interface Props extends DialogProps {
  title?: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
}

const Dialog: React.FC<Props> = ({ title, children, actions, ...props }) => (
  <MuiDialog {...props}>
    <DialogTitle>{title}</DialogTitle>
    <DialogContent>{children}</DialogContent>
    {actions && <DialogActions>{actions}</DialogActions>}
  </MuiDialog>
);

export default Dialog;
