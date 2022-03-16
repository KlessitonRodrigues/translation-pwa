export type TranslationProps = {
  langs: string[][];
};

export type TranslationHeaderProps = {
  language: State["language"];
  formLangClick: () => any;
  toLangClick: () => any;
};

export type TranslationDisplayProps = {
  value?: string;
  mode?: "translation" | "dictionary" | "speak";
};

export type TranslationButtonsProps = {
  onTranslate: () => void;
  onClear: () => void;
  onInvert: () => void;
  onDicionary: () => void;
  onSpeak: () => void;
};

export type ActionTypes =
  | { type: "ERROR"; payload: string }
  | { type: "SET_FROM_INPUT"; payload: string }
  | { type: "SET_TO_INPUT"; payload: string }
  | { type: "CLEAR_INPUTS" }
  | { type: "INVERT_INPUTS" }
  | { type: "TOGGLE_LOADING" }
  | { type: "TOGGLE_FROM_LANGS_MODEL" }
  | { type: "TOGGLE_TO_LANGS_MODEL" }
  | { type: "CLOSE_LANGS_MODEL" };

export type State = {
  language: {
    from: {
      name: string;
      id: string;
    };
    to: {
      name: string;
      id: string;
    };
  };
  form: {
    fromText: string;
    toText: string;
  };
  langs: string[][];
  toggle: {
    langModal: string;
  };
};
