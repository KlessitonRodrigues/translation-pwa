import './config/config.dotenv'; // sort-imports-ignore
import { TranslateLambda } from './lib/lambdas/translate/translate.lambda';

import * as cdk from 'aws-cdk-lib';
import * as gateway from 'aws-cdk-lib/aws-apigateway';
import * as iam from 'aws-cdk-lib/aws-iam';
import dotenv from './constants/constants.dotenv';
import { resourceNames } from './constants/constants.resources';
import { TranslateAPIGateway } from './lib/gateway/gateway.translation';
import { setGatewayRateLimiting } from './utils/utils.gateway';
import { addCorsPreflight } from './utils/utils.lambda';

export class NodeTemplateStack extends cdk.Stack {
  constructor(scope: cdk.App, props?: cdk.StackProps) {
    super(scope, dotenv.STACK_NAME, props);

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
    };

    const translateTextLambda = new TranslateLambda(this, lambdaEnv, logGroup);

    // API Gateway
    const translateApi = new TranslateAPIGateway(this);
    setGatewayRateLimiting(this, translateApi, 1000);

    // API Routes
    // /translate/text
    const translateRoute = translateApi.root.addResource('translate');
    const translateTextRoute = translateRoute.addResource('text');

    translateTextRoute.addMethod('POST', new gateway.LambdaIntegration(translateTextLambda), {
      apiKeyRequired: true,
    });

    translateTextLambda.addToRolePolicy(
      new iam.PolicyStatement({
        actions: ['translate:TranslateText', 'comprehend:DetectDominantLanguage'],
        resources: ['*'],
      }),
    );

    // API Preflight
    addCorsPreflight(translateTextRoute);
  }
}

const app = new cdk.App();

new NodeTemplateStack(app);
