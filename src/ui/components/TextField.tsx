import {
  TextField as MuiTextField,
  TextFieldProps,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const TextField = (props: TextFieldProps) => {
  const isSearch = props.label === "Search by Name/Description";
  return (
    <MuiTextField
      variant="outlined"
      fullWidth
      margin="normal"
      InputProps={
        isSearch
          ? {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="primary" />
                </InputAdornment>
              ),
              style: {
                background: "transparent",
                borderRadius: 8,
              },
            }
          : { style: { background: "#fff", borderRadius: 8 } }
      }
      {...props}
    />
  );
};

export default TextField;
