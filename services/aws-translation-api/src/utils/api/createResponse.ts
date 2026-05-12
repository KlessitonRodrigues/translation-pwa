import { AWS } from '@packages/common-types';

export const createResponse: AWS.CreateResponseOptions = (code, data, headers) => {
  return {
    statusCode: code,
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Allow-Headers': 'Content-Type,Authorization,lang',
      'Access-Control-Allow-Methods': 'OPTIONS,GET,POST,PUT,PATCH,DELETE',
      ...headers,
    },
  };
};

export const createResponseWithOrigin: AWS.CreateResponseWithCookiesOptions = (
  origin,
  code,
  data,
  headers,
) => {
  return {
    statusCode: code,
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': origin,
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Allow-Headers': 'Content-Type,Authorization,lang',
      'Access-Control-Allow-Methods': 'OPTIONS,GET,POST,PUT,PATCH,DELETE',
      ...headers,
    },
  };
};
