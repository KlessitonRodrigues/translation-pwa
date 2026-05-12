import {
  AWS,
  COMMON,
  createAuthSchemas,
  dictionaries,
  zodErrorStringify,
} from '@packages/common-types';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

import dotenv from '../../../contants/dotenv';
import { createResponse } from '../../../utils/api/createResponse';
import { getAuthUserByEmail } from '../../dynamoDb/authTable/operations';

export const handler: AWS.APIGatewayHandler = async event => {
  const lang = (event.headers?.lang || 'en') as COMMON.Language;
  const dictionary = dictionaries[lang];

  try {
    const jsonBody = JSON.parse(event.body || '{}');

    const { signInSchema } = createAuthSchemas({ lang });
    const result = signInSchema.safeParse(jsonBody);

    if (!result.success) {
      const details = zodErrorStringify(result);
      return createResponse(400, { error: dictionary.INVALID_REQUEST_BODY, details });
    }

    const { email, password } = result.data;
    const user = await getAuthUserByEmail(email);

    if (!user) {
      return createResponse(401, { error: dictionary.INVALID_EMAIL_OR_PASSWORD });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password || '');
    if (!isPasswordValid) {
      return createResponse(401, { error: dictionary.INVALID_EMAIL_OR_PASSWORD });
    }

    const jwtData = { userId: user.userId, email: user.email, userName: user.userName };
    const jwtToken = jwt.sign(jwtData, dotenv.SECRET_KEY, { expiresIn: '1h' });

    return createResponse(200, {
      token: jwtToken,
      userId: user.userId,
      email: user.email,
      userName: user.userName,
    });
  } catch (err: any) {
    console.error(err);
    return createResponse(500, {
      error: dictionary.INTERNAL_SERVER_ERROR,
      details: err?.message || err,
    });
  }
};
