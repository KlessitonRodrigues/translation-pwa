export type Translate = {
  fromLang: { code: string; name: string; text: string };
  targetLang: { code: string; name: string; text: string; dictionary: [] };
};

export type Toggle = {
  selectLangModal: "" | "setFromLang" | "setTargetLang";
};

export type ServerSideRender = {
  langs: { code: string; name: string }[];
};

export type State = {
  translate: Translate;
  toggle: Toggle;
  ssr: ServerSideRender;
};

export type ActionTypes =
  | { type: "ERROR"; payload: string }
  | { type: "SET_FROM_LANG"; payload: Translate["fromLang"] }
  | { type: "SET_TARGET_LANG"; payload: Translate["targetLang"] }
  | { type: "CLEAR_INPUTS" }
  | { type: "INVERT_LANGS" }
  | { type: "TOGGLE_LOADING" }
  | { type: "SET_LANGS_MODEL"; payload: Toggle["selectLangModal"] };

export type TranslationProps = {
  ssr: ServerSideRender;
};

export type TranslationHeaderProps = {
  state: State;
  actions: {
    formLangClick: (v: Toggle["selectLangModal"]) => any;
    targetLangClick: (v: Toggle["selectLangModal"]) => any;
  };
};

export type TranslationDisplayProps = {
  state: State;
};

export type TranslationButtonsProps = {
  actions: {
    onTranslate: () => any;
    onClear: () => any;
    onInvert: () => any;
    onDicionary: () => any;
    onSpeak: () => any;
  };
};

export type LangSelectionProps = {
  state: State;
  actions: {
    setModel?: (v: Toggle["selectLangModal"]) => any;
    onClick?: (code: string) => any;
  };
};

export type RenderLangsItem = {
  code: string;
  name: string;
  show: boolean;
  onClick: (v: string) => any;
};

export type TranslationInputProps = {
  state: State;
  actions: {
    onChange?: (v: Translate["fromLang"]) => any;
  };
  disabled?: boolean;
};

export type RenderLangsSelectionsProps = {
  langs: ServerSideRender["langs"];
  search: string;
  onClick: (lang: ServerSideRender["langs"][0]) => any;
};

export type LangItemProps = {
  show: boolean;
  lang: ServerSideRender["langs"][0];
  onClick: (lang: ServerSideRender["langs"][0]) => any;
};
