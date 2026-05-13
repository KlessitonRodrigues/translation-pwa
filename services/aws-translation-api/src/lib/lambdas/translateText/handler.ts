import { TranslateTextCommand } from '@aws-sdk/client-translate';
import {
  AWS,
  COMMON,
  createTranslateSchemas,
  dictionaries,
  zodErrorStringify,
} from '@packages/common-types';

import translateClient from '../../../config/translateClient';
import { createResponse } from '../../../utils/api/createResponse';

export const handler: AWS.APIGatewayHandler = async event => {
  const lang = (event.headers?.lang || 'en') as COMMON.Language;
  const dictionary = dictionaries[lang];

  try {
    const jsonBody = JSON.parse(event.body || '{}');
    const { translateTextSchema } = createTranslateSchemas({ lang });
    const result = translateTextSchema.safeParse(jsonBody);

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
