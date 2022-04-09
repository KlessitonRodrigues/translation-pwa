import TranslationAPI from "../../../data/api/translation";
import * as t from "../types";

export default class Actions {
  static setFromLang(fromLang: t.Translate["fromLang"]): t.ActionTypes {
    return { type: "SET_FROM_LANG", payload: fromLang };
  }

  static setTargetLang(targetLang: t.Translate["targetLang"]): t.ActionTypes {
    return { type: "SET_TARGET_LANG", payload: targetLang };
  }

  static clearInputs(): t.ActionTypes {
    return { type: "CLEAR_INPUTS" };
  }

  static invertInputs(): t.ActionTypes {
    return { type: "INVERT_LANGS" };
  }

  static async translate({ translate: { fromLang, targetLang } }: t.State): Promise<t.ActionTypes> {
    const res = await TranslationAPI.translateTo(fromLang.text, targetLang.code);

    if (res.success && res.data) {
      return {
        type: "SET_TARGET_LANG",
        payload: { ...targetLang, text: res.data.text },
      };
    }
    return { type: "ERROR", payload: "" };
  }

  static setLangsModal(mode: t.Toggle["selectLangModal"]): t.ActionTypes {
    return { type: "SET_LANGS_MODEL", payload: mode };
  }

  static handleSelectLangModal(state: t.State, lang: t.ServerSideRender["langs"][0]) {
    const selectLangModal = state.toggle.selectLangModal;

    if (selectLangModal === "setFromLang")
      return this.setFromLang({ ...state.translate.fromLang, ...lang });
    return this.setTargetLang({ ...state.translate.targetLang, ...lang });
  }

  static async getDictionary({ translate }: t.State): Promise<t.ActionTypes> {
    const { fromLang, targetLang } = translate;
    const res = await TranslationAPI.dictionaryOf(fromLang.text, targetLang.code, fromLang.code);
    
    if (res.data)
      return { type: "SET_TARGET_LANG", payload: { ...targetLang, dictionary: res.data } };
    else return { type: "ERROR", payload: "Dictionary isn't available" };
  }
}
