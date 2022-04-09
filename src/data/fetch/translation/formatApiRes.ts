import * as t from "./types";
import { ResponseType } from "../../constants/response";

export default function formatRequests(path: string, res: any): ResponseType {
  /*
  if (!res.ok) {
    return {
      success: false,
      msg: res.error,
    };
  }
*/
  let data = {};

  if (path === "/getLanguages") {
    const codes = res.codes as t.LangsData["codes"];
    const codeKeys = Object.keys(codes);
    data = codeKeys.map((key) => ({ code: key, name: codes[key] }));
  }

  if (path === "/translate") {
    data = { text: res.translated_text, from: res.from_lang };
  }

  if (path === "/dictionary") {
    data = {
      // @ts-ignore
      examples: res?.examples.map((ex) => ({
        source: ex.source_examples,
        target: ex.target_examples,
      })),
      // @ts-ignore
      translations: res?.translations.map((tr) => ({
        translation: tr.translation,
        reverse: tr.reverse_translations,
      })),
    };
  }

  return {
    success: res.ok,
    msg: res.error,
    data: data,
  };
}

/*
{
  "ok": true,
  "error": "",
  "translations": [
      {
          "translation": "Hi!",
          "reverse_translations": [
              "Oi!",
              "Olá!"
          ]
      },
      {
          "translation": "Hello!",
          "reverse_translations": [
              "Olá!",
              "Oi!",
              "Alô!"
          ]
      }
  ],
  "examples": [
      {
          "source_examples": [
              "Apenas um pequeno visitante amigável dizendo \u003cem\u003eoi\u003c/em\u003e.",
              "Talvez tenha acenado ou dito \u003cem\u003eoi\u003c/em\u003e.",
              "Sabrina, diga \u003cem\u003eoi\u003c/em\u003e ao Harry.",
              "Drew ficaria desapontando se você não parasse no vestiário para dizer \u003cem\u003eoi\u003c/em\u003e.",
              "Talvez você pudesse passar por lá depois só pra dizer \u003cem\u003eoi\u003c/em\u003e.",
              "Estava pensando quando é que você viria aqui dizer um \u003cem\u003eoi\u003c/em\u003e.",
              "Beije-a, diga que o Georges mandou um \u003cem\u003eoi\u003c/em\u003e.",
              "Quero que você diga \u003cem\u003eoi\u003c/em\u003e para o Detetive Deckie.",
              "Diga \u003cem\u003eoi\u003c/em\u003e para a Condessa, querido.",
              "Bem, se veio pendurar o aviso, ele não entrou pra dar \u003cem\u003eoi\u003c/em\u003e."
          ],
          "target_examples": [
              "Just a little, friendly visitor just saying \u003cem\u003ehello\u003c/em\u003e.",
              "I might've waved and maybe said \u003cem\u003ehello\u003c/em\u003e.",
              "Sabrina, say \u003cem\u003ehello\u003c/em\u003e to Harry.",
              "Drew would be so disappointed if you didn't stop by the locker room to say \u003cem\u003ehello\u003c/em\u003e.",
              "Maybe you could stop by later just to say \u003cem\u003ehello\u003c/em\u003e.",
              "I was wondering when you'd find the time to come by, say \u003cem\u003ehello\u003c/em\u003e.",
              "Kiss her, say Georges says \u003cem\u003ehello\u003c/em\u003e.",
              "I want you to say \u003cem\u003ehello\u003c/em\u003e to Detective Deckle.",
              "Say \u003cem\u003ehello\u003c/em\u003e to the countess, darling.",
              "Well, if you came by to hang the sign, he didn't stop in to say \u003cem\u003ehello\u003c/em\u003e."
          ],
          "part_of_speech": ""
      }
  ]
}

*/
