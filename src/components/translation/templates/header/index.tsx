import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import { TranslationHeaderProps as Props } from "../../types";
import RightArrowIcon from "../../../../assets/fluencyIcons/RightArrow.svg";
import GlobeIcon from "../../../../assets/fluencyIcons/Globe.svg";

const TranslationHeader = ({ state: { translate }, actions }: Props) => {
  const LangLabel = (props: { text: string; onClick?: () => any }) => (
    <Button variant="text" onClick={() => props.onClick && props.onClick()}>
      <GlobeIcon style={{ margin: "0 8px" }} />
      <Typography variant="subtitle2" color="primary">
        {props.text}
      </Typography>
    </Button>
  );

  return (
    <Box display="flex" justifyContent="center" alignItems="center" mt={2}>
      <LangLabel
        text={translate.fromLang.name}
        onClick={() => actions.formLangClick("setFromLang")}
      />
      <RightArrowIcon style={{ margin: "0 8px" }} />
      <LangLabel
        text={translate.targetLang.name}
        onClick={() => actions.targetLangClick("setTargetLang")}
      />
    </Box>
  );
};

export default TranslationHeader;
