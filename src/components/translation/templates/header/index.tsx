import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import { TranslationHeaderProps as Props } from "../../types";
import RightArrowIcon from "../../../../assets/fluencyIcons/Arrow.svg";
import TranslationIcon from "../../../../assets/icons/Translation.svg";

const TranslationHeader = ({ state: { translate }, actions }: Props) => {
  const LangLabel = (props: { text: string; onClick?: () => any }) => (
    <Button variant="text" onClick={() => props.onClick && props.onClick()}>
      <TranslationIcon style={{ marginRight: "8px" }} />
      <Typography variant="subtitle1">{props.text}</Typography>
    </Button>
  );

  return (
    <Box display="flex" justifyContent="center" alignItems="center" mt={2}>
      <LangLabel
        text={translate.fromLang.name.toUpperCase()}
        onClick={() => actions.formLangClick("setFromLang")}
      />
      <RightArrowIcon style={{ margin: "0 8px" }} />
      <LangLabel
        text={translate.targetLang.name.toUpperCase()}
        onClick={() => actions.targetLangClick("setTargetLang")}
      />
    </Box>
  );
};

export default TranslationHeader;
