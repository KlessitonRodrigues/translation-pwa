import { ActionsTypes } from "./actions";

export const initialState = {
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
};

export type State = typeof initialState;

export function reducer(state: State, action: ActionsTypes): State {
  const { form } = state;

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

    default:
      return state;
  }
}
