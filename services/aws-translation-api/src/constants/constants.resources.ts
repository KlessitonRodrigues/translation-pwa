import dotenv from './constants.dotenv';

export const resourceNames = {
  authTable: dotenv.STACK_NAME + '-auth-table',
  authAPIGateway: dotenv.STACK_NAME + '-auth-api-gateway',
  translateApiGateway: dotenv.STACK_NAME + '-translate-api-gateway',
  logGroup: dotenv.STACK_NAME + '-log-group',
  translateLambda: dotenv.STACK_NAME + '-translate-lambda',
  gatewayKey: dotenv.STACK_NAME + '-gateway-key',
  gatewayUsagePlan: dotenv.STACK_NAME + '-gateway-usage-plan',
};

export const lambdaPackages = ['zod'];

export const apiOrigins = [
  dotenv.AUTH_APP_URL,
  dotenv.DASHBOARD_APP_URL,
  'http://localhost:3000',
  'http://localhost:3001',
];
