import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1E88E5", // bright blue
    },
    secondary: {
      main: "#ffffff", // white
    },
    background: {
      default: "#f5f7fa", // very light blue / white
      paper: "#ffffff",
    },
    text: {
      primary: "#1E88E5",
      secondary: "#000000",
    },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
  },
});

export default theme;
