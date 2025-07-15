import {
  Select as MuiSelect,
  MenuItem,
  InputLabel,
  FormControl,
  SelectProps,
} from "@mui/material";
import React from "react";

type Props = SelectProps & {
  label: string;
  options: string[];
};

const Select: React.FC<Props> = ({ label, options, ...props }) => (
  <FormControl fullWidth margin="normal">
    <InputLabel>{label}</InputLabel>
    <MuiSelect label={label} {...props}>
      {options.map((option) => (
        <MenuItem key={option} value={option}>
          {option}
        </MenuItem>
      ))}
    </MuiSelect>
  </FormControl>
);

export default Select;
