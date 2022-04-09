import Box from "@material-ui/core/Box";
import styled from "@material-ui/core/styles/styled";

export const HearderBox = styled(Box)(({ theme: { spacing, palette } }) => ({
  width: spacing(250),
  padding: spacing(2),
  display: "flex",
  alignItems: "center",
  // @ts-ignore
  backgroundColor: palette.primary[50],
  // @ts-ignore
  border: "1px solid " + palette.secondary[300],
  borderRadius: spacing(2),
  margin: spacing(2) + " auto",
}));
