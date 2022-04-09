import { ThemeOptions } from "@material-ui/core";
import { blue, grey } from "@material-ui/core/colors";

export const typography: ThemeOptions["typography"] = {
  allVariants: {
    color: grey[700],
  },
  subtitle1: {
    color: blue[600],
    fontSize: "1.1rem",
    fontWeight: "bold",
    textTransform: "capitalize",
  },
  subtitle2: {
    color: blue[600],
  },
};
