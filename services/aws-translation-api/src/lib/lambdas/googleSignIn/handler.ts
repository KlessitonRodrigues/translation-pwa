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
import { createAuthUser, getAuthUserByEmail } from '../../dynamoDb/authTable/operations';

const userInfoUrl = 'https://www.googleapis.com/oauth2/v2/userinfo';

export const handler: AWS.APIGatewayHandler = async event => {
  const lang = (event.headers?.lang || 'en') as COMMON.Language;
  const dictionary = dictionaries[lang];

  try {
    const jsonBody = JSON.parse(event.body || '{}');

    const { signUpWithGoogleSchema } = createAuthSchemas({ lang });
    const result = signUpWithGoogleSchema.safeParse(jsonBody);

    if (!result.success) {
      const details = zodErrorStringify(result);
      return createResponse(400, { error: dictionary.INVALID_REQUEST_BODY, details });
    }

    const { token } = result.data;

    const userInfoResponse = await fetch(userInfoUrl, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (userInfoResponse.status !== 200) {
      throw new Error(dictionary.FAILED_TO_FETCH_USER_INFO);
    }

    const userData = await userInfoResponse.json();

    if (!userData?.verified_email) {
      return createResponse(401, { error: dictionary.NO_VERIFIED_EMAIL });
    }

    let dbUser: any = {};
    dbUser = await getAuthUserByEmail(userData.email);

    if (!dbUser) {
      dbUser = await createAuthUser({
        email: userData.email,
        password: crypto.randomUUID(), // Random password since Google handles auth
        userName: userData.name,
      });
    }

    if (!dbUser) {
      return createResponse(500, { error: dictionary.USER_NOT_FOUND });
    }

    const jwtData = { userId: dbUser.userId, email: dbUser.email, userName: dbUser.userName };
    const jwtToken = jwt.sign(jwtData, dotenv.SECRET_KEY, { expiresIn: '1h' });

    return createResponse(200, {
      token: jwtToken,
      userId: dbUser.userId,
      email: dbUser.email,
      userName: dbUser.userName,
    });
  } catch (err: any) {
    console.error(err);
    return createResponse(500, {
      error: dictionary.INTERNAL_SERVER_ERROR,
      details: err?.message || err,
    });
  }
};
