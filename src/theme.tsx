import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#2F80ED",
    },
  },
  overrides: {
    MuiButton: {
      contained: {
        borderRadius: 8,
        fontSize: 12,
        padding: "7px 20px",
        textTransform: "none",
      },
      containedPrimary: {
        background: "#2F80ED",
        color: "white",
        "&:hover": {
          backgroundColor: "#2d79e1",
        },
      },
      textSecondary: {
        background: "#F2F2F2",
        color: "#828282",
        "&:hover": {
          backgroundColor: "#e7e7e7",
        },
      },
    },
    MuiAvatar: {
      rounded: {
        borderRadius: 8,
      },
    },
    MuiPaper: {
      elevation8: { boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.05)" },
    },
    MuiIconButton: {
      root: {
        color: "#fff",
        borderRadius: "8px",
        background: "#2F80ED",
        padding: "8px",
        "&:hover": {
          backgroundColor: "#276fce",
        },
      },
    },
  },

  typography: {
    fontFamily: ["Poppins", "sans-serif"].join(","),
  },
});

export default theme;
