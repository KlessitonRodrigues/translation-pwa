import * as jwt from 'jsonwebtoken';

import {
  AWS,
  COMMON,
  createAuthSchemas,
  dictionaries,
  zodErrorStringify,
} from '../../../../node_modules/@packages/common-types';
import dotenv from '../../../contants/dotenv';
import { createResponse } from '../../../utils/api/createResponse';
import { getAuthUserByEmail } from '../../dynamoDb/authTable/operations';

export const handler: AWS.APIGatewayHandler = async event => {
  const lang = (event.headers?.lang || 'en') as COMMON.Language;
  const dictionary = dictionaries[lang];

  try {
    const jsonBody = JSON.parse(event.body || '{}');

    const { verifyRecoveryCodeSchema } = createAuthSchemas({ lang });
    const result = verifyRecoveryCodeSchema.safeParse(jsonBody);

    if (!result.success) {
      const details = zodErrorStringify(result);
      return createResponse(400, { error: dictionary.INVALID_REQUEST_BODY, details });
    }

    const { email, code } = result.data;

    if (!email || !code) {
      return createResponse(400, { error: dictionary.MISSING_EMAIL_OR_CODE });
    }

    const user = await getAuthUserByEmail(email);
    if (!user) {
      return createResponse(404, { error: dictionary.USER_NOT_FOUND });
    }

    if (user.recoveryCode !== code || !user.recoveryCodeExpiry) {
      return createResponse(401, { error: dictionary.INVALID_RECOVERY_CODE });
    }

    if (new Date() > new Date(user.recoveryCodeExpiry)) {
      return createResponse(401, { error: dictionary.EXPIRED_RECOVERY_CODE });
    }

    const newToken = jwt.sign(
      { userId: user.userId, email: user.email },
      dotenv.SECRET_KEY as string,
      { expiresIn: '15m' },
    );

    return createResponse(200, { token: newToken });
  } catch (err: any) {
    console.error(err);
    return createResponse(500, {
      error: dictionary.INTERNAL_SERVER_ERROR,
      details: err?.message || err,
    });
  }
};
