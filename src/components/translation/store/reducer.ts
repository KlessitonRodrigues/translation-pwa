import { State, ActionTypes } from "../types";

export const initialState: State = {
  translate: {
    fromLang: { code: "pt", name: "Portugues", text: "" },
    targetLang: { code: "en", name: "English", text: "", dictionary: [] },
  },
  toggle: {
    selectLangModal: "",
  },
  ssr: {
    langs: [],
  },
};

export function reducer(state: State, action: ActionTypes): State {
  const { translate, toggle } = state;

  switch (action.type) {
    case "SET_FROM_LANG":
      return { ...state, translate: { ...translate, fromLang: action.payload } };

    case "SET_TARGET_LANG":
      return { ...state, translate: { ...translate, targetLang: action.payload } };

    case "ERROR":
      return state;

    case "INVERT_LANGS":
      return {
        ...state,
        translate: {
          fromLang: {
            code: translate.targetLang.code,
            name: translate.targetLang.name,
            text: translate.targetLang.text,
          },
          targetLang: {
            code: translate.fromLang.code,
            name: translate.fromLang.name,
            text: translate.fromLang.text,
            dictionary: [],
          },
        },
      };

    case "CLEAR_INPUTS":
      return {
        ...state,
        translate: {
          fromLang: {
            ...translate.fromLang,
            text: "",
          },
          targetLang: {
            ...translate.targetLang,
            text: "",
          },
        },
      };

    case "SET_LANGS_MODEL":
      return { ...state, toggle: { ...toggle, selectLangModal: action.payload } };

    default:
      return state;
  }
}
