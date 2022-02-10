import { createTheme } from "@material-ui/core";

import { typography } from "./theme/typography";
import { overrides } from "./theme/overrides";
import { palette } from "./theme/palette";

export const theme = createTheme({
  typography,
  palette,
  overrides,
});
