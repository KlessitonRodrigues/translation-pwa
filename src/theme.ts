import { createTheme } from "@material-ui/core";

import { typography } from "./theme/typography";
import { overrides } from "./theme/overrides";
import { palette } from "./theme/palette";

const spacing = (factor: number) => `${factor * 0.25}rem`;

export const theme = createTheme({
  typography,
  palette,
  overrides,
  spacing,
});
