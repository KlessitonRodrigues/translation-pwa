import { z } from 'zod';

import { dictionary } from '../constants/constants.dictionary';

export const translationSchema = {
  text: z
    .string(dictionary.REQUIRED)
    .trim()
    .min(1, dictionary.REQUIRED)
    .max(500, dictionary.MAXIMUM_LENGTH_EXCEEDED),
  targetLanguageCode: z.string(dictionary.REQUIRED).trim().min(2, dictionary.REQUIRED),
  sourceLanguageCode: z.string(dictionary.REQUIRED).trim().min(2, dictionary.REQUIRED).optional(),
};

export const translateTextSchema = z.object({
  text: translationSchema.text,
  targetLanguageCode: translationSchema.targetLanguageCode,
  sourceLanguageCode: translationSchema.sourceLanguageCode,
});
