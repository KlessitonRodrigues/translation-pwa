import dotenv from './dotenv';

export const resourceNames = {
  authTable: dotenv.STACK_NAME + '-auth-table',
  authAPIGateway: dotenv.STACK_NAME + '-auth-api-gateway',
  translateApiGateway: dotenv.STACK_NAME + '-translate-api-gateway',
  logGroup: dotenv.STACK_NAME + '-log-group',
  signUpLambda: dotenv.STACK_NAME + '-sign-up-lambda',
  signInLambda: dotenv.STACK_NAME + '-sign-in-lambda',
  googleSignInLambda: dotenv.STACK_NAME + '-google-sign-in-lambda',
  githubSignInLambda: dotenv.STACK_NAME + '-github-sign-in-lambda',
  refreshTokenLambda: dotenv.STACK_NAME + '-refresh-token-lambda',
  signOutLambda: dotenv.STACK_NAME + '-sign-out-lambda',
  sendRecoveryCodeLambda: dotenv.STACK_NAME + '-send-recovery-code-lambda',
  verifyRecoveryCodeLambda: dotenv.STACK_NAME + '-verify-recovery-code-lambda',
  resetPasswordLambda: dotenv.STACK_NAME + '-reset-password-lambda',
  translateTextLambda: dotenv.STACK_NAME + '-translate-text-lambda',
};

export const lambdaPackages = ['zod'];

export const apiOrigins = [
  dotenv.AUTH_APP_URL,
  dotenv.DASHBOARD_APP_URL,
  'http://localhost:3000',
  'http://localhost:3001',
];
