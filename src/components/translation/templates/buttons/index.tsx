import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";

import { TranslationButtonsProps as Props } from "../../types";
import ToggleTextButton from "../../../../templates/buttons/toggleTextButton";
import EraseIcon from "../../../../assets/fluencyIcons/Erase.svg";
import RepeatIcon from "../../../../assets/fluencyIcons/Repeat.svg";
import TranslationIcon from "../../../../assets/fluencyIcons/TranslationWhite.svg";
import BookIcon from "../../../../assets/fluencyIcons/Book.svg";
import VoiceIcon from "../../../../assets/fluencyIcons/Voice.svg";

export default function Buttons({ actions }: Props) {
  return (
    <Box display="flex" m={2}>
      <Button
        onClick={() => actions.onTranslate()}
        startIcon={<TranslationIcon />}
        variant="contained"
        size="small"
      >
        <b>Translate</b>
      </Button>
      <ToggleTextButton
        onClick={() => actions.onClear()}
        startIcon={<EraseIcon />}
        variant="text"
        size="small"
      >
        <b>Clear Fields</b>
      </ToggleTextButton>
      <ToggleTextButton
        onClick={() => actions.onInvert()}
        startIcon={<RepeatIcon />}
        variant="text"
        size="small"
      >
        <b>Invert</b>
      </ToggleTextButton>
      <ToggleTextButton
        onClick={() => actions.onDictionary()}
        startIcon={<BookIcon />}
        variant="text"
        size="small"
      >
        <b>Dictionary</b>
      </ToggleTextButton>
      <ToggleTextButton
        onClick={() => actions.onSpeak()}
        startIcon={<VoiceIcon />}
        variant="text"
        size="small"
      >
        <b>Speak</b>
      </ToggleTextButton>
    </Box>
  );
}
