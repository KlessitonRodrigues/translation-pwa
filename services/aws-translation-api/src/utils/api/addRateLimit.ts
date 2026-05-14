import * as cdk from 'aws-cdk-lib';
import * as gateway from 'aws-cdk-lib/aws-apigateway';

import dotenv from '../../contants/dotenv';
import { resourceNames } from '../../contants/resources';

// API quota: maximum X requests per day.
export const setGatewayRateLimiting = (stack: cdk.Stack, api: gateway.RestApi, perDay: number) => {
  const apiKey = new gateway.ApiKey(stack, resourceNames.gatewayKey, {
    apiKeyName: resourceNames.gatewayKey,
    enabled: true,
  });

  const usagePlan = new gateway.UsagePlan(stack, resourceNames.gatewayUsagePlan, {
    name: resourceNames.gatewayUsagePlan,
    quota: {
      limit: perDay,
      period: gateway.Period.DAY,
    },
  });

  usagePlan.addApiStage({ stage: api.deploymentStage });
  usagePlan.addApiKey(apiKey);
};
