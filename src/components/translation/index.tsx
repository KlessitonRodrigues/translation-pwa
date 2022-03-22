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
  const [state, dispatch] = useReducer(reducer, { ...initialState, ssr: props.ssr });

  return (
    <Slide in direction="up">
      <Box width="100%" display="flex" flexDirection="column" margin="auto">
        <TranslationHeader
          state={state}
          actions={{
            formLangClick: (v) => dispatch(Actions.setLangsModal(v)),
            targetLangClick: (v) => dispatch(Actions.setLangsModal(v)),
          }}
        />
        <LangSelection
          state={state}
          actions={{
            setModel: (v) => dispatch(Actions.setLangsModal(v)),
          }}
        />
        <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column">
          <TranslationField
            state={state}
            actions={{
              onChange: (v) => dispatch(Actions.setFromLang(v)),
            }}
          />
          <Buttons
            actions={{
              onTranslate: async () => dispatch(await Actions.translate(state)),
              onClear: () => dispatch(Actions.clearInputs()),
              onInvert: () => dispatch(Actions.invertInputs()),
              onDicionary: () => {},
              onSpeak: () => {},
            }}
          />
          <TranslationDisplay state={state} />
        </Box>
      </Box>
    </Slide>
  );
}
