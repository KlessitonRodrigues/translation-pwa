import { State } from "./reducer";
import TranslationAPI from "../../../data/api/translationAPI";

export type ActionsTypes =
  | { type: "ERROR"; payload: string }
  | { type: "SET_FROM_INPUT"; payload: string }
  | { type: "SET_TO_INPUT"; payload: string }
  | { type: "CLEAR_INPUTS" }
  | { type: "INVERT_INPUTS" }
  | { type: "TOGGLE_LOADING" };

const url = "api/translation";

export default class Actions {
  static langsCache = ["pt", "en", "sp", "cn"];

  static setFromInput(str: string): ActionsTypes {
    return { type: "SET_FROM_INPUT", payload: str };
  }

  static setToInput(str: string): ActionsTypes {
    return { type: "SET_TO_INPUT", payload: str };
  }

  static clearInputs(): ActionsTypes {
    return { type: "CLEAR_INPUTS" };
  }

  static invertInputs(): ActionsTypes {
    return { type: "INVERT_INPUTS" };
  }

  static async translate({ form, language }: State): Promise<ActionsTypes> {
    const res = await TranslationAPI.translateTo(form.fromText, language.to.id);
    console.log(res, form.fromText, language.to.id);
    return { type: "SET_TO_INPUT", payload: res.data.translated_text || "" };
  }
}
