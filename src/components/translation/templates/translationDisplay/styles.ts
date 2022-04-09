import Box from "@material-ui/core/Box";
import styled from "@material-ui/core/styles/styled";

export const Display = styled(Box)(({ theme: { spacing, palette } }) => ({
  width: spacing(250),
  minHeight: spacing(100),
  padding: spacing(2),
  border: "1px solid",
  // @ts-ignore
  borderColor: palette.secondary[300],
  borderRadius: spacing(2),
  margin: spacing(2) + " auto",
}));

export const Translation = styled(Box)(({ theme: { spacing } }) => ({
  width: "100%",
  padding: spacing(2),
}));

export const Dictionary = styled(Box)(({ theme: { spacing } }) => ({
  width: "100%",
  padding: spacing(2),
}));

export const Divisor = styled("hr")(({ theme: { spacing, palette } }) => ({
  width: "100%",
  // @ts-ignore
  border: "1px solid " + palette.secondary[200],
}));
