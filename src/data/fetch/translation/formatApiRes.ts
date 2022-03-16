import * as t from "./types";
import { ResponseType } from "../../constants/response";

export default function formatRequests(path: string, res: any): ResponseType {
  if (!res.ok) {
    return {
      success: false,
      msg: res.error,
    };
  }

  if (path === "/getLanguages") {
    const codes = res.codes as t.LangsData["codes"];
    const codeKeys = Object.keys(codes);
    res.data = codeKeys.map((key) => [key, codes[key]]);
  }
  console.log(path);

  if (path === "/translate") {
    res.data = { text: res.translated_text, from: res.from_lang };
  }

  return {
    success: res.ok,
    msg: res.error,
    data: res.data,
  };
}
