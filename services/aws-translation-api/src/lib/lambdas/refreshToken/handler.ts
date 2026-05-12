import { AWS, COMMON, dictionaries } from '@packages/common-types';
import * as jwt from 'jsonwebtoken';

import dotenv from '../../../contants/dotenv';
import { cookieToObject, createTokenCookie } from '../../../utils/api/cookies';
import { createResponseWithOrigin } from '../../../utils/api/createResponse';

export const handler: AWS.APIGatewayHandler = async event => {
  const lang = (event.headers?.lang || 'en') as COMMON.Language;
  const origin = event.headers.origin || '';
  const dictionary = dictionaries[lang];

  try {
    const jsonBody = JSON.parse(event.body || '{}');
    const bodytoken = jsonBody?.token;
    const cookie = String(event.headers.Cookie || event.headers.cookie);
    const token = bodytoken || cookieToObject(cookie)?.token;

    if (!token) {
      return createResponseWithOrigin(origin, 400, { error: dictionary.MISSING_TOKEN });
    }

    let decodedToken: any;
    try {
      decodedToken = jwt.verify(token, dotenv.SECRET_KEY as string);
    } catch (err) {
      return createResponseWithOrigin(origin, 401, { error: 'Invalid or expired token' });
    }

    const jwtData = {
      userId: decodedToken.userId,
      email: decodedToken.email,
      userName: decodedToken.userName,
    };
    const jwtToken = jwt.sign(jwtData, dotenv.SECRET_KEY, { expiresIn: '1h' });

    const newCookie = createTokenCookie(jwtToken, 3600);
    return createResponseWithOrigin(origin, 200, { user: jwtData }, { 'Set-Cookie': newCookie });
  } catch (err: any) {
    console.error(err);
    return createResponseWithOrigin(origin, 500, {
      error: dictionary.INTERNAL_SERVER_ERROR,
      details: err?.message || err,
    });
  }
};
