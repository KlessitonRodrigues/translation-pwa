import { createTheme } from "@material-ui/core";

import { typography } from "./theme/typography";
import { overrides } from "./theme/overrides";
import { palette } from "./theme/palette";

const spacing = (...factors: number[]) => factors.map((factor) => `${factor * 0.25}rem`).join(" ");

export const theme = createTheme({
  typography,
  palette,
  overrides,
  spacing,
});
