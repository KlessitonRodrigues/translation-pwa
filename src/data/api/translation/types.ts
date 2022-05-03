export type Responses = {
  LangsRes: { code: string; name: string }[];
  TransRes: { text: string; from: string };
  DictionaryRes: {
    examples: {
      source: string[];
      target: string[];
    }[];
    translations: {
      translation: string;
      reverse: string[];
    }[];
  };
};
