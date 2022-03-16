import Box from "@material-ui/core/Box";
import styled from "@material-ui/core/styles/styled";

export const HearderBox = styled(Box)(({ theme: { spacing, palette } }) => ({
  width: spacing(250),
  padding: spacing(2),
  display: "flex",
  alignItems: "center",
  backgroundColor: palette.primary[50],
  borderRadius: spacing(2),
  margin: spacing(2) + " auto",
}));
