import Typography from "@material-ui/core/Typography";
import Image from "next/image";

import TranslateImg from "../../assets/img/language.png";

import * as s from "./styles";

export default function Header() {
  return (
    <s.HearderBox>
      <Image width="42px" height="42px" src={TranslateImg} alt="translation app" />
      <Typography variant="h5">Translation App</Typography>
    </s.HearderBox>
  );
}
