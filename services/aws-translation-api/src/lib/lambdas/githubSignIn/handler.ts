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

const githubTokenUrl = 'https://github.com/login/oauth/access_token';
const githubEmailsUrl = 'https://api.github.com/user/emails';

export const handler: AWS.APIGatewayHandler = async event => {
  const lang = (event.headers?.lang || 'en') as COMMON.Language;
  const dictionary = dictionaries[lang];

  try {
    const jsonBody = JSON.parse(event.body || '{}');

    const { signUpWithGithubSchema } = createAuthSchemas({ lang });
    const result = signUpWithGithubSchema.safeParse(jsonBody);

    if (!result.success) {
      const details = zodErrorStringify(result);
      return createResponse(400, { error: dictionary.INVALID_REQUEST_BODY, details });
    }

    const { code } = result.data;

    const tokenRes = await fetch(githubTokenUrl, {
      method: 'POST',
      headers: {
        //Accept: 'application/json',
        //'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_id: dotenv.GITHUB_CLIENT_ID,
        client_secret: dotenv.GITHUB_CLIENT_SECRET,
        code,
      }),
    });

    if (tokenRes.status !== 200) {
      throw new Error(dictionary.FAILED_TO_FETCH_ACCESS_TOKEN);
    }

    const tokenData = await tokenRes.json();

    if (!tokenData.access_token) {
      return createResponse(400, { error: dictionary.NO_ACCESS_TOKEN, tokenData });
    }

    const accessToken = tokenData.access_token;

    const userResp = await fetch('https://api.github.com/user', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: 'application/vnd.github+json',
      },
    });

    const user = await userResp.json();

    let emails = [];
    const emailResp = await fetch(githubEmailsUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: 'application/vnd.github+json',
        'User-Agent': 'your-app-name',
      },
    });

    if (emailResp.status === 200) {
      emails = await emailResp.json();
    }

    const primaryEmail = emails.find((e: any) => e.primary && e.verified);

    if (!primaryEmail) {
      return createResponse(400, { error: dictionary.NO_VERIFIED_EMAIL });
    }

    let dbUser: any = await getAuthUserByEmail(primaryEmail.email);

    if (!dbUser) {
      dbUser = await createAuthUser({
        email: primaryEmail.email,
        password: crypto.randomUUID(), // GitHub handles auth
        userName: user.name || user.login,
      });
    }

    if (!dbUser) {
      return createResponse(500, { error: dictionary.USER_NOT_FOUND });
    }

    const jwtData = {
      userId: dbUser.userId,
      email: dbUser.email,
      userName: dbUser.userName,
    };

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
