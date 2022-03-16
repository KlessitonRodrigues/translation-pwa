import { useReducer } from "react";
import Box from "@material-ui/core/Box";
import Slide from "@material-ui/core/Slide";

import Buttons from "./templates/buttons";
import TranslationField from "./templates/translationField";
import TranslationDisplay from "./templates/translationDisplay";
import Actions from "./store/actions";
import { reducer, initialState } from "./store/reducer";
import LangSelection from "./templates/langSelect";
import TranslationHeader from "./templates/header";
import { TranslationProps as Props } from "./types";

export default function Translation(props: Props) {
  const [state, dispatch] = useReducer(reducer, { ...initialState, langs: props.langs });

  return (
    <Slide in direction="left">
      <Box width="100%" display="flex" flexDirection="column" margin="auto">
        <TranslationHeader
          formLangClick={() => dispatch(Actions.toggleFromLangsModal())}
          toLangClick={() => dispatch(Actions.toggleToLangsModal())}
          language={state.language}
        />
        <LangSelection
          langs={state.langs}
          isOpen={!!state.toggle.langModal}
          toggleOpen={() => dispatch(Actions.toggleLangsModal())}
        />
        <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column">
          <TranslationField
            value={state.form.fromText}
            onChange={(v) => dispatch(Actions.setFromInput(v))}
          />
          <Buttons
            onTranslate={async () => dispatch(await Actions.translate(state))}
            onClear={() => dispatch(Actions.clearInputs())}
            onInvert={() => dispatch(Actions.invertInputs())}
            onDicionary={() => {}}
            onSpeak={() => {}}
          />
          <TranslationDisplay value={state.form.toText} />
        </Box>
      </Box>
    </Slide>
  );
}
