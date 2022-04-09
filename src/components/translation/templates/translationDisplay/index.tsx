import { Typography, Box, Grow } from "@material-ui/core";
import { TranslationDisplayProps as Props } from "../../types";
import * as s from "./styles";

const RenderDictionary = ({ targetLang }: Props["state"]["translate"]) => {
  const { examples, translations } = targetLang.dictionary;
  const textAsHtml = (text: string) => <Box dangerouslySetInnerHTML={{ __html: text }} />;

  const Translations = () =>
    translations.map((t, i) => (
      <Box key={i}>
        <Box color="primary.700" fontWeight="bold">
          {textAsHtml(t.translation)}
        </Box>
        <Box>{t.reverse.join(" ")}</Box>
      </Box>
    ));

  const Examples = () =>
    examples[0].target.map((target, i) => (
      <Box key={i} marginBottom={2}>
        <Box color="primary.700" fontWeight="bold">
          {textAsHtml(target)}
        </Box>
        {textAsHtml(`(${examples[0].source[i]})`)}
      </Box>
    ));

  return (
    <Box>
      {translations && (
        <Box marginBottom={4}>
          <Typography variant="body2">Translations:</Typography>
          <Box marginLeft={4}>{Translations()}</Box>
        </Box>
      )}

      {examples && (
        <Box>
          <Typography variant="body2">Examples:</Typography>
          <Box marginLeft={4}>{Examples()}</Box>
        </Box>
      )}
    </Box>
  );
};

const TranslationDisplay = ({ state: { translate } }: Props) => {
  const { targetLang } = translate;
  return (
    <Box>
      <s.Display>
        <Grow in={!!targetLang.text} unmountOnExit>
          <s.Translation>
            <Typography variant="subtitle2">Translation</Typography>
            <s.Divisor />
            {targetLang.text}
          </s.Translation>
        </Grow>

        <Grow in={!!targetLang.dictionary} unmountOnExit>
          <s.Dictionary>
            <Typography variant="subtitle2">Dictionary</Typography>
            <s.Divisor />
            {RenderDictionary(translate)}
          </s.Dictionary>
        </Grow>
      </s.Display>
    </Box>
  );
};

export default TranslationDisplay;
