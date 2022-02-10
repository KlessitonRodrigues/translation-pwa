import { useReducer } from "react";
import Box from "@material-ui/core/Box";
import Slide from "@material-ui/core/Slide";

import Buttons from "./templates/buttons";
import TranslationField from "./templates/translationField";
import Actions from "./store/actions";
import { reducer, initialState } from "./store/reducer";

export default function Translation() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <Slide in direction="left">
      <Box width="80%" display="flex" flexDirection="column" margin="auto">
        <Box display="flex" justifyContent="center">
          <TranslationField
            lang={state.language.from.name}
            value={state.form.fromText}
            onChange={(v) => dispatch(Actions.setFromInput(v))}
          />
          <TranslationField
            lang={state.language.to.name}
            value={state.form.toText}
            onChange={(v) => dispatch(Actions.setToInput(v))}
            disabled
          />
        </Box>
        <Buttons
          onTranslate={async () => dispatch(await Actions.translate(state))}
          onClear={() => dispatch(Actions.clearInputs())}
          onInvert={() => dispatch(Actions.invertInputs())}
          onDicionary={() => {}}
          onSpeak={() => {}}
        />
      </Box>
    </Slide>
  );
}
