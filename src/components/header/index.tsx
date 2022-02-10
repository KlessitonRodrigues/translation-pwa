import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Image from "next/image";

import TranslateImg from "../../assets/img/language.png";

export default function Header() {
  return (
    <Box p={2} marginLeft={3} display="flex" alignItems="center" bgcolor="white">
      <Image width="48px" height="48px" src={TranslateImg} alt="translation app" />
      <Typography variant="h4">Translation App</Typography>
    </Box>
  );
}
