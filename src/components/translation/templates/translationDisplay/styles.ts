import Box from "@material-ui/core/Box";
import styled from "@material-ui/core/styles/styled";

export const Display = styled(Box)(({ theme: { spacing, palette } }) => ({
  width: spacing(250),
  padding: spacing(2),
  border: "1px solid",
  borderColor: palette.secondary[300],
  borderRadius: spacing(2),
}));

export const DisplayTranslation = styled(Box)(({ theme: { spacing, palette } }) => ({
  width: spacing(250),
  padding: spacing(2),
  border: "1px solid",
  borderColor: palette.secondary[300],
  borderRadius: spacing(2),
}));
