import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1976d2",
      contrastText: "#fff",
    },
    secondary: {
      main: "#0d47a1",
      contrastText: "#fff",
    },
    background: {
      default: "#f5f7fa",
      paper: "#fff",
    },
    text: {
      primary: "#212b36",
      secondary: "#1976d2",
    },
    error: {
      main: "#d32f2f",
    },
    success: {
      main: "#388e3c",
    },
    warning: {
      main: "#fbc02d",
    },
    info: {
      main: "#0288d1",
    },
  },
  shape: {
    borderRadius: 10,
  },
  typography: {
    fontFamily: "Inter, Roboto, Arial, sans-serif",
    h4: {
      fontWeight: 600,
      color: "#0d47a1",
      letterSpacing: "0.02em",
    },
    h5: {
      fontWeight: 700,
      color: "#0d47a1",
      letterSpacing: "0.01em",
    },
    button: {
      fontWeight: 700,
      textTransform: "none",
      letterSpacing: "0.01em",
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          background: "#fff",
          borderRadius: 10,
          boxShadow: "0 2px 8px rgba(25, 118, 210, 0.08)",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 700,
          borderRadius: 10,
          boxShadow: "0 2px 8px rgba(25, 118, 210, 0.12)",
          padding: "8px 24px",
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          background: "#f5f7fa",
          borderRadius: 10,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 10,
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 16,
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          marginBottom: 8,
          boxShadow: "0 1px 4px rgba(25, 118, 210, 0.07)",
        },
      },
    },
  },
});

export default theme;
