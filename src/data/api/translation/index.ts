import fetchData from "../../fetch/translation";
import { Responses } from "./types";

export default class TranslationAPI {
  static langsCache = { success: false, data: [{ code: "", name: "" }] };

  static async getSuportedLangs() {
    if (this.langsCache?.success) return { success: true, msg: "", data: this.langsCache.data };
    const res = await fetchData<Responses["LangsRes"]>("/getLanguages");
    if (res.success) this.langsCache = res;
    return res;
  }

  static async translateTo(text: string, to: string, from = "") {
    const res = await fetchData<Responses["TransRes"]>("/translate", {
      body: new URLSearchParams({ text, from, to }),
    });
    return res;
  }

  static async dictionaryOf(text: string, to: string, from: string) {
    const res = await fetchData<Responses["DictionaryRes"]>("/dictionary", {
      body: new URLSearchParams({ text, from, to }),
    });
    return res;
  }

  static async spenchText(text: string, from = "") {
    const res = await fetchData<Responses["DictionaryRes"]>("/tts", {
      body: new URLSearchParams({ text, from }),
    });
    return res;
  }
}
