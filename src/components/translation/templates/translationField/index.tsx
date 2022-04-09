import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";

import { TranslationInputProps as Props } from "../../types";

const TranslationInput = ({ state, actions, disabled = false }: Props) => {
  const {
    translate: { fromLang },
  } = state;
  return (
    <Box width="50%" m={1}>
      <TextField
        value={fromLang.text}
        onChange={(ev) =>
          actions.onChange && actions.onChange({ ...fromLang, text: ev.target.value })
        }
        variant="outlined"
        multiline
        fullWidth
        minRows={10}
        maxRows={10}
        disabled={disabled}
      />
    </Box>
  );
};

export default TranslationInput;
