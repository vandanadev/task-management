import {
  CircularProgress as MuiCircularProgress,
  CircularProgressProps,
} from "@mui/material";

const CircularProgress = (props: CircularProgressProps) => (
  <MuiCircularProgress size={24} sx={{ verticalAlign: "middle" }} {...props} />
);

export default CircularProgress;
