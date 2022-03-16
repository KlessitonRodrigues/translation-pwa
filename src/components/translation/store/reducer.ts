import { State, ActionTypes } from "../types";

export const initialState: State = {
  language: {
    from: {
      name: "portugues",
      id: "pt",
    },
    to: {
      name: "english",
      id: "en",
    },
  },
  form: {
    fromText: "",
    toText: "",
  },
  langs: [["", ""]],
  toggle: {
    langModal: "",
  },
};

export function reducer(state: State, action: ActionsTypes): State {
  const { form, toggle } = state;

  switch (action.type) {
    case "SET_FROM_INPUT":
      return { ...state, form: { toText: form.toText, fromText: action.payload } };

    case "SET_TO_INPUT":
      return { ...state, form: { fromText: form.fromText, toText: action.payload } };

    case "ERROR":
      return state;

    case "INVERT_INPUTS":
      return {
        ...state,
        form: { fromText: form.toText, toText: form.fromText },
      };

    case "CLEAR_INPUTS":
      return { ...state, form: initialState.form };

    case "CLOSE_LANGS_MODEL":
      toggle.langModal = "";
      return { ...state, toggle };

    case "TOGGLE_FROM_LANGS_MODEL":
      toggle.langModal = "from";
      return { ...state, toggle };

    case "TOGGLE_TO_LANGS_MODEL":
      toggle.langModal = "from";
      return { ...state, toggle };

    default:
      return state;
  }
}
