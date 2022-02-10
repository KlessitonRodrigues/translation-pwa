import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

type Props = {
  lang?: string;
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
};

export default function TranslationInput({ value, onChange, lang, disabled = false }: Props) {
  return (
    <Box width="50%" m={1}>
      <Typography variant="subtitle1">{lang}</Typography>
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
}
