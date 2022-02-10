import { ThemeOptions } from "@material-ui/core";
import { grey } from "@material-ui/core/colors";

export const typography: ThemeOptions["typography"] = {
  allVariants: {
    color: grey[700],
  },
  subtitle1: {
    fontSize: "1.2rem",
    fontWeight: "bold",
    textTransform: "capitalize",
  },
};
