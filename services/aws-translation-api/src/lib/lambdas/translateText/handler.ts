import { TranslateClient, TranslateTextCommand } from '@aws-sdk/client-translate';
import { AWS, COMMON, dictionaries, zodErrorStringify } from '@packages/common-types';
import { z } from 'zod';

import { createResponse } from '../../../utils/api/createResponse';

const translateClient = new TranslateClient({});

const translateSchema = z.object({
  text: z.string().trim().min(1),
  targetLanguageCode: z.string().trim().min(2),
  sourceLanguageCode: z.string().trim().min(2).optional(),
});

export const handler: AWS.APIGatewayHandler = async event => {
  const lang = (event.headers?.lang || 'en') as COMMON.Language;
  const dictionary = dictionaries[lang];

  try {
    const jsonBody = JSON.parse(event.body || '{}');
    const result = translateSchema.safeParse(jsonBody);

    if (!result.success) {
      const details = zodErrorStringify(result);
      return createResponse(400, { error: dictionary.INVALID_REQUEST_BODY, details });
    }

    const translation = await translateClient.send(
      new TranslateTextCommand({
        Text: result.data.text,
        SourceLanguageCode: result.data.sourceLanguageCode || 'auto',
        TargetLanguageCode: result.data.targetLanguageCode,
      }),
    );

    return createResponse(200, {
      translatedText: translation.TranslatedText,
      sourceLanguageCode: translation.SourceLanguageCode,
      targetLanguageCode: translation.TargetLanguageCode,
    });
  } catch (err: any) {
    console.error(err);
    return createResponse(500, {
      error: dictionary.INTERNAL_SERVER_ERROR,
      details: err?.message || err,
    });
  }
};
