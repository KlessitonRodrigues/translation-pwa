import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";

import { TranslationInputProps as Props } from "../../types";

const TranslationInput = ({ value, onChange, disabled = false }: Props) => {
  return (
    <Box width="50%" m={1}>
      <TextField
        value={value}
        onChange={(ev) => onChange && onChange(ev.target.value)}
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
