import {
  AWS,
  COMMON,
  createAuthSchemas,
  dictionaries,
  zodErrorStringify,
} from '@packages/common-types';

import { createResponse } from '../../../utils/api/createResponse';
import { createAuthUser } from '../../dynamoDb/authTable/operations';

export const handler: AWS.APIGatewayHandler = async event => {
  const lang = (event.headers?.lang || 'en') as COMMON.Language;
  const dictionary = dictionaries[lang];

  try {
    const jsonBody = JSON.parse(event.body || '{}');

    const { signUpSchema } = createAuthSchemas({ lang });
    const result = signUpSchema.safeParse(jsonBody);

    if (!result.success) {
      const details = zodErrorStringify(result);
      return createResponse(400, { error: dictionary.INVALID_REQUEST_BODY, details });
    }

    const { email, password, userName } = result.data;

    try {
      await createAuthUser({ email, password, userName });
    } catch (err: any) {
      return createResponse(400, {
        error: dictionary.ERROR_CREATING_USER,
        details: err?.message || err,
      });
    }

    return createResponse(201, { message: dictionary.USER_REGISTERED_SUCCESSFULLY });
  } catch (err: any) {
    console.error(err);
    return createResponse(500, {
      error: dictionary.INTERNAL_SERVER_ERROR,
      details: err?.message || err,
    });
  }
};
