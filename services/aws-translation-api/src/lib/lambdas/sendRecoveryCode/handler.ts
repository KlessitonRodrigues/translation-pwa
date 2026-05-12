import {
  AWS,
  COMMON,
  createAuthSchemas,
  dictionaries,
  zodErrorStringify,
} from '@packages/common-types';

import { createResponse } from '../../../utils/api/createResponse';
import { getAuthUserByEmail, updateAuthUser } from '../../dynamoDb/authTable/operations';

export const handler: AWS.APIGatewayHandler = async event => {
  const lang = (event.headers?.lang || 'en') as COMMON.Language;
  const dictionary = dictionaries[lang];

  try {
    const jsonBody = JSON.parse(event.body || '{}');

    const { sendRecoveryCodeSchema } = createAuthSchemas({ lang });
    const result = sendRecoveryCodeSchema.safeParse(jsonBody);

    if (!result.success) {
      const details = zodErrorStringify(result);
      return createResponse(400, { error: dictionary.INVALID_REQUEST_BODY, details });
    }

    const { email } = result.data;
    const user = await getAuthUserByEmail(email);
    if (!user || !user.userId) return createResponse(404, { error: dictionary.USER_NOT_FOUND });

    const recoveryCode = Math.floor(100000 + Math.random() * 900000).toString();

    await updateAuthUser(user.userId, {
      recoveryCode: recoveryCode,
      recoveryCodeExpiry: new Date(Date.now() + 15 * 60 * 1000).toISOString(),
    });

    return createResponse(200, { recoveryCode });
  } catch (err: any) {
    console.error(err);
    return createResponse(500, {
      error: dictionary.INTERNAL_SERVER_ERROR,
      details: err?.message || err,
    });
  }
};
