import { z } from 'zod';

import { dictionary } from '../../../constants/constants.dictionary';
import { createZodDto } from '../../../utils/utils.zod';

export const translateSchema = {
  text: z
    .string(dictionary.REQUIRED)
    .trim()
    .min(1, dictionary.REQUIRED)
    .max(500, dictionary.MAXIMUM_LENGTH_EXCEEDED),
  targetLanguageCode: z.string(dictionary.REQUIRED).trim().min(2, dictionary.REQUIRED),
  sourceLanguageCode: z.string(dictionary.REQUIRED).trim().min(2, dictionary.REQUIRED).optional(),
};

export class TranslateRequestDto extends createZodDto(
  z.object({
    text: translateSchema.text,
    targetLanguageCode: translateSchema.targetLanguageCode,
    sourceLanguageCode: translateSchema.sourceLanguageCode,
  }),
) {}
