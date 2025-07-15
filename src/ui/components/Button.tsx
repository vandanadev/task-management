import { Button as MuiButton, ButtonProps } from "@mui/material";

const Button = (props: ButtonProps) => (
  <MuiButton variant="contained" color="primary" {...props} />
);

export default Button;
