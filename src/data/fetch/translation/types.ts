export type LangsData = { codes: Record<string, string> };
export type TranslateData = { translated_text: string; from_lang: string };
export type DictionaryData = {
  examples: {
    source: string[];
    target: string[];
  };
  translations: {
    translation: string;
    reverse: string[];
  }[];
};
