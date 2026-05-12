import * as cdk from 'aws-cdk-lib';
import * as gateway from 'aws-cdk-lib/aws-apigateway';

import { apiOrigins } from '../../contants/resources';

export const addPreflight = (resource: cdk.aws_apigateway.Resource) => {
  resource.addCorsPreflight({
    allowOrigins: apiOrigins,
    allowMethods: gateway.Cors.ALL_METHODS,
    allowHeaders: [...gateway.Cors.DEFAULT_HEADERS, 'Cookie'],
    allowCredentials: true,
  });
};

export const addCorsPreflight = (resource: cdk.aws_apigateway.Resource) => {
  resource.addCorsPreflight({
    allowOrigins: gateway.Cors.ALL_ORIGINS,
    allowMethods: gateway.Cors.ALL_METHODS,
    allowHeaders: [...gateway.Cors.DEFAULT_HEADERS, 'lang'],
    allowCredentials: true,
  });
};
