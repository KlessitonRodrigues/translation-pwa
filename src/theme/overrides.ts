import { ThemeOptions } from "@material-ui/core";
import { blue, grey } from "@material-ui/core/colors";

export const overrides: ThemeOptions["overrides"] = {
  MuiInputBase: {
    root: {
      backgroundColor: "white",
      borderRadius: "8px !important",
    },
  },
  MuiButton: {
    root: {
      backgroundColor: "white",
      color: grey[600],
      borderRadius: "8px",
      marginRight: "2px",
      fontWeight: "bold",
    },
    text: {
      background: "transparent",
    },
    contained: {
      backgroundColor: blue[600],
      color: "white",
      "&:hover": {
        backgroundColor: blue[800],
      },
    },
  },
};
