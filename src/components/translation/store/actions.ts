import TranslationAPI from "../../../data/api/translation";
import { ActionTypes, State } from "../types";

const url = "api/translation";

export default class Actions {
  static langsCache = ["pt", "en", "sp", "cn"];

  static setStaticlang(langs: {}) {
    return;
  }

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
    return { type: "SET_TO_INPUT", payload: res.data || "" };
  }

  static toggleLangsModal(): ActionsTypes {
    return { type: "CLOSE_LANGS_MODEL" };
  }

  static toggleFromLangsModal(): ActionsTypes {
    return { type: "TOGGLE_FROM_LANGS_MODEL" };
  }

  static toggleToLangsModal(): ActionsTypes {
    return { type: "TOGGLE_TO_LANGS_MODEL" };
  }
}
