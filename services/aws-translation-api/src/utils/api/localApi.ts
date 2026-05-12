import { AWS } from '@packages/common-types';
import { Request, Response } from 'express';

export const createLambdaEvent = (lambda: AWS.APIGatewayHandler) => {
  return async (req: Request, res: Response) => {
    const lambdaResponse = await lambda({
      resource: req.path,
      path: req.path,
      httpMethod: req.method,
      queryStringParameters: req.query,
      multiValueQueryStringParameters: req.query,
      pathParameters: req.params,
      headers: {
        Authorization: req.headers.authorization,
        ...req.headers,
      },
      stageVariables: {},
      body: JSON.stringify(req.body),
      isBase64Encoded: false,
    });

    lambdaResponse;
    res
      .status(lambdaResponse.statusCode)
      .set(lambdaResponse.headers || {})
      .send(lambdaResponse.body);
  };
};
