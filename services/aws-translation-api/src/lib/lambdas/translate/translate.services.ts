import { TranslateTextCommand } from '@aws-sdk/client-translate';

import translateClient from '../../../config/config.translation';
import {
  APIGatewayHandler,
  badRequest,
  createResponse,
  internalError,
} from '../../../utils/utils.lambda';
import { zodErrorStringify } from '../../../utils/utils.zod';
import { TranslateRequestDto } from './translate.dto';

export const translationService: APIGatewayHandler = async event => {
  try {
    const body = JSON.parse(event.body || '{}');
    const dtoResult = TranslateRequestDto.schema.safeParse(body);
    if (!dtoResult.success) return badRequest(zodErrorStringify(dtoResult));

    const translation = await translateClient.send(
      new TranslateTextCommand({
        Text: dtoResult.data.text,
        SourceLanguageCode: dtoResult.data.sourceLanguageCode || 'auto',
        TargetLanguageCode: dtoResult.data.targetLanguageCode,
      }),
    );

    return createResponse(200, {
      translatedText: translation.TranslatedText,
      sourceLanguageCode: translation.SourceLanguageCode,
      targetLanguageCode: translation.TargetLanguageCode,
    });
  } catch (err: any) {
    return internalError(err);
  }
};
