import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";

import ToggleTextButton from "../../../../templates/buttons/toggleTextButton";
import BroomIcon from "../../../../assets/fluencyIcons/Broom.svg";
import RepeatIcon from "../../../../assets/fluencyIcons/Repeat.svg";
import TranslationIcon from "../../../../assets/fluencyIcons/TranslationWhite.svg";
import BookIcon from "../../../../assets/fluencyIcons/Book.svg";
import VoiceIcon from "../../../../assets/fluencyIcons/Voice.svg";

type Props = {
  onTranslate: () => void;
  onClear: () => void;
  onInvert: () => void;
  onDicionary: () => void;
  onSpeak: () => void;
};

export default function Buttons(props: Props) {
  return (
    <Box display="flex" m={1}>
      <Button
        onClick={() => props.onTranslate()}
        startIcon={<TranslationIcon />}
        variant="contained"
        size="small"
      >
        <b>Translate</b>
      </Button>
      <ToggleTextButton
        onClick={() => props.onClear()}
        startIcon={<BroomIcon />}
        variant="text"
        size="small"
      >
        <b>Clear Fields</b>
      </ToggleTextButton>
      <ToggleTextButton
        onClick={() => props.onInvert()}
        startIcon={<RepeatIcon />}
        variant="text"
        size="small"
      >
        <b>Invert</b>
      </ToggleTextButton>
      <ToggleTextButton
        onClick={() => props.onDicionary()}
        startIcon={<BookIcon />}
        variant="text"
        size="small"
      >
        <b>Dictionary</b>
      </ToggleTextButton>
      <ToggleTextButton
        onClick={() => props.onSpeak()}
        startIcon={<VoiceIcon />}
        variant="text"
        size="small"
      >
        <b>Speak</b>
      </ToggleTextButton>
    </Box>
  );
}