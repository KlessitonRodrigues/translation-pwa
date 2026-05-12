import {
  AWS,
  COMMON,
  createAuthSchemas,
  dictionaries,
  zodErrorStringify,
} from '@packages/common-types';
import * as jwt from 'jsonwebtoken';

import dotenv from '../../../contants/dotenv';
import { createResponse } from '../../../utils/api/createResponse';
import { updateAuthUser } from '../../dynamoDb/authTable/operations';

export const handler: AWS.APIGatewayHandler = async event => {
  const lang = (event.headers?.lang || 'en') as COMMON.Language;
  const dictionary = dictionaries[lang];

  try {
    const jsonBody = JSON.parse(event.body || '{}');

    const { resetPasswordSchema } = createAuthSchemas({ lang });
    const result = resetPasswordSchema.safeParse(jsonBody);

    if (!result.success) {
      const details = zodErrorStringify(result);
      return createResponse(400, { error: dictionary.INVALID_REQUEST_BODY, details });
    }

    const { token, newPassword } = result.data;

    if (!token || !newPassword) {
      return createResponse(400, { error: dictionary.MISSING_TOKEN });
    }

    const decodedToken = jwt.verify(token, dotenv.SECRET_KEY) as { email: string; userId: string };

    const newUser = await updateAuthUser(decodedToken.userId, {
      password: newPassword,
      recoveryCode: '',
      recoveryCodeExpiry: '',
    });

    return createResponse(200, { code: { newUser } });
  } catch (err: any) {
    console.error(err);
    return createResponse(500, {
      error: dictionary.INTERNAL_SERVER_ERROR,
      details: err?.message || err,
    });
  }
};
