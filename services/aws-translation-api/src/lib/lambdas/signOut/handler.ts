import { AWS, COMMON, dictionaries } from '@packages/common-types';

import { clearTokenCookie } from '../../../utils/api/cookies';
import { createResponse, createResponseWithOrigin } from '../../../utils/api/createResponse';

export const handler: AWS.APIGatewayHandler = async event => {
  const lang = (event.headers?.lang || 'en') as COMMON.Language;
  const dictionary = dictionaries[lang];

  try {
    const origin = event.headers.origin || '';
    const emptyCookie = clearTokenCookie();

    return createResponseWithOrigin(
      origin,
      200,
      { message: dictionary.SIGNED_OUT_SUCCESSFULLY },
      { 'Set-Cookie': emptyCookie },
    );
  } catch (err: any) {
    console.error(err);
    return createResponse(500, {
      error: dictionary.INTERNAL_SERVER_ERROR,
      details: err?.message || err,
    });
  }
};
