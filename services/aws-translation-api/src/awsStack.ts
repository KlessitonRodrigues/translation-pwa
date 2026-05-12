import './config/dotenv'; // sort-imports-ignore

import * as cdk from 'aws-cdk-lib';
import * as gateway from 'aws-cdk-lib/aws-apigateway';
import * as iam from 'aws-cdk-lib/aws-iam';

import { AuthTable } from './lib/dynamoDb/authTable/table';
import { AuthAPIGateway } from './lib/gateway/authAPI';
import { SignInLambda } from './lib/lambdas/signIn/lambda';
import { addCorsPreflight, addPreflight } from './utils/api/preflightResponse';
import { SignUpLambda } from './lib/lambdas/signUp/lambda';
import { GoogleSignInLambda } from './lib/lambdas/googleSignIn/lambda';
import { VerifyRecoveryCodeLambda } from './lib/lambdas/verifyRecoveryCode/lambda';
import { SendRecoveryCodeLambda } from './lib/lambdas/sendRecoveryCode/lambda';
import { RefreshTokenLambda } from './lib/lambdas/refreshToken/lambda';
import { ResetPasswordLambda } from './lib/lambdas/resetPassword/lambda';
import { SignOutLambda } from './lib/lambdas/signOut/lambda';
import { TranslateTextLambda } from './lib/lambdas/translateText/lambda';
import { resourceNames } from './contants/resources';
import dotenv from './contants/dotenv';

export class NodeTemplateStack extends cdk.Stack {
  constructor(scope: cdk.App, props?: cdk.StackProps) {
    super(scope, dotenv.STACK_NAME, props);

    // DynamoDB
    const authTable = new AuthTable(this);

    // Log Group
    const logGroup = new cdk.aws_logs.LogGroup(this, resourceNames.logGroup, {
      logGroupName: resourceNames.logGroup,
      retention: cdk.aws_logs.RetentionDays.ONE_WEEK,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    // Lambda Functions
    const lambdaEnv: Record<string, string> = {
      STACK_NAME: dotenv.STACK_NAME,
      SECRET_KEY: dotenv.SECRET_KEY,
      GOOGLE_CLIENT_ID: dotenv.GOOGLE_CLIENT_ID,
      AUTH_APP_URL: dotenv.AUTH_APP_URL,
      DASHBOARD_APP_URL: dotenv.DASHBOARD_APP_URL,
    };

    const signInLambda = new SignInLambda(this, lambdaEnv, logGroup);
    const signUpLambda = new SignUpLambda(this, lambdaEnv, logGroup);
    const googleSignInLambda = new GoogleSignInLambda(this, lambdaEnv, logGroup);
    const verifyRecoveryCodeLambda = new VerifyRecoveryCodeLambda(this, lambdaEnv, logGroup);
    const sendRecoveryCodeLambda = new SendRecoveryCodeLambda(this, lambdaEnv, logGroup);
    const refreshTokenLambda = new RefreshTokenLambda(this, lambdaEnv, logGroup);
    const resetPasswordLambda = new ResetPasswordLambda(this, lambdaEnv, logGroup);
    const signOutLambda = new SignOutLambda(this, lambdaEnv, logGroup);
    const translateTextLambda = new TranslateTextLambda(this, lambdaEnv, logGroup);

    // API Gateway
    const authApi = new AuthAPIGateway(this);

    // API Routes
    // /auth
    const authRoute = authApi.root.addResource('auth');
    // /auth/signin
    const signinRoute = authRoute.addResource('signin');
    signinRoute.addMethod('POST', new gateway.LambdaIntegration(signInLambda));
    // /auth/signup
    const signupRoute = authRoute.addResource('signup');
    signupRoute.addMethod('POST', new gateway.LambdaIntegration(signUpLambda));
    // /auth/google
    const googleRoute = authRoute.addResource('google');
    googleRoute.addMethod('POST', new gateway.LambdaIntegration(googleSignInLambda));
    // /auth/send-recovery-code
    const sendRecoveryCodeRoute = authRoute.addResource('send-recovery-code');
    sendRecoveryCodeRoute.addMethod('POST', new gateway.LambdaIntegration(sendRecoveryCodeLambda));
    // /auth/verify-recovery-code
    const verifyRecoveryCodeRoute = authRoute.addResource('verify-recovery-code');
    verifyRecoveryCodeRoute.addMethod(
      'POST',
      new gateway.LambdaIntegration(verifyRecoveryCodeLambda),
    );
    // /auth/refresh-token
    const refreshTokenRoute = authRoute.addResource('refresh-token');
    refreshTokenRoute.addMethod('POST', new gateway.LambdaIntegration(refreshTokenLambda));
    // /auth/reset-password
    const resetPasswordRoute = authRoute.addResource('reset-password');
    resetPasswordRoute.addMethod('POST', new gateway.LambdaIntegration(resetPasswordLambda));
    // /auth/signout
    const signOutRoute = authRoute.addResource('signout');
    signOutRoute.addMethod('POST', new gateway.LambdaIntegration(signOutLambda));

    // /translate/text
    const translateRoute = authApi.root.addResource('translate');
    const translateTextRoute = translateRoute.addResource('text');
    translateTextRoute.addMethod('POST', new gateway.LambdaIntegration(translateTextLambda));

    // Permissions
    authTable.table.grantReadWriteData(signInLambda);
    authTable.table.grantReadWriteData(signUpLambda);
    authTable.table.grantReadWriteData(googleSignInLambda);
    authTable.table.grantReadWriteData(verifyRecoveryCodeLambda);
    authTable.table.grantReadWriteData(sendRecoveryCodeLambda);
    authTable.table.grantReadWriteData(refreshTokenLambda);
    authTable.table.grantReadWriteData(resetPasswordLambda);

    translateTextLambda.addToRolePolicy(
      new iam.PolicyStatement({
        actions: ['translate:TranslateText'],
        resources: ['*'],
      }),
    );

    // API Preflight
    addPreflight(refreshTokenRoute);
    addPreflight(signOutRoute);

    addCorsPreflight(signinRoute);
    addCorsPreflight(signupRoute);
    addCorsPreflight(googleRoute);
    addCorsPreflight(sendRecoveryCodeRoute);
    addCorsPreflight(verifyRecoveryCodeRoute);
    addCorsPreflight(resetPasswordRoute);
    addCorsPreflight(translateTextRoute);
  }
}

const app = new cdk.App();

new NodeTemplateStack(app);
