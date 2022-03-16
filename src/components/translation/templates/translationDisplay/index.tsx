import Box from "@material-ui/core/Box";

import { TranslationDisplayProps as Props } from "../../types";
import * as s from "./styles";

const TranslationDisplay = ({ value, mode = "translation" }: Props) => {
  return (
    <Box width="80%" m={1}>
      <s.Display p={2} border="1px solid" borderColor="secondary.300" borderRadius={5}>
        {mode === "translation" && <Box minHeight={400}>{value}</Box>}
        {mode === "dictionary" && <Box minHeight={400}>{value}</Box>}
        {mode === "speak" && <Box minHeight={400}>{value}</Box>}
      </s.Display>
    </Box>
  );
};

export default TranslationDisplay;
