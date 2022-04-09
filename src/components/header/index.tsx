import { Typography, Box, Button } from "@material-ui/core";
import Image from "next/image";

import TranslateImg from "../../assets/img/language.png";
import GearIcon from "../../assets/fluencyIcons/Settings.svg";

import * as s from "./styles";

export default function Header() {
  return (
    <s.HearderBox display="flex" justifyContent="space-between">
      <Box display="flex" alignItems="center">
        <Image width="42px" height="42px" src={TranslateImg} alt="translation app" />
        <Typography variant="h5">Translation App</Typography>
      </Box>
      <Button variant="text">
        <GearIcon />
      </Button>
    </s.HearderBox>
  );
}
