import { Box, styled } from "@material-ui/core";

export const LangGrid = styled(Box)(({ theme: { spacing, palette } }) => ({
  display: "grid",
  gridTemplateColumns: "1fr 1fr 1fr",
  alignContent: "flex-start",
  height: spacing(250),
  margin: "auto",
}));

export const LangItem = styled(Box)(({ theme: { spacing, palette } }) => ({
  //@ts-ignore
  backgroundColor: palette.primary[50],
  margin: spacing(2),
  padding: spacing(2),
  borderRadius: 8,
}));
