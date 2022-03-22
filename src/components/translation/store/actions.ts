import TranslationAPI from "../../../data/api/translation";
import { ActionTypes, State, Toggle, Translate } from "../types";

export default class Actions {
  static setFromLang(fromLang: Translate["fromLang"]): ActionTypes {
    return { type: "SET_FROM_LANG", payload: fromLang };
  }

  static setTargetLang(targetLang: Translate["targetLang"]): ActionTypes {
    return { type: "SET_FROM_LANG", payload: targetLang };
  }

  static clearInputs(): ActionTypes {
    return { type: "CLEAR_INPUTS" };
  }

  static invertInputs(): ActionTypes {
    return { type: "INVERT_LANGS" };
  }

  static async translate({ translate: { fromLang, targetLang } }: State): Promise<ActionTypes> {
    const res = await TranslationAPI.translateTo(fromLang.text, fromLang.code);
    if (res.success && res.data) {
      return {
        type: "SET_TARGET_LANG",
        payload: { ...targetLang, text: res.data.text },
      };
    }
    return { type: "ERROR", payload: "" };
  }

  static setLangsModal(mode: Toggle["selectLangModal"]): ActionTypes {
    return { type: "SET_LANGS_MODEL", payload: mode };
  }
}
