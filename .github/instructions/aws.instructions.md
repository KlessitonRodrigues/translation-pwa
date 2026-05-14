---
description: "Use when creating or updating AWS service interactions and infrastructure management"
name: "AWS Services Patterns"
applyTo: "**/*.ts, **/*.js"
---

# AWS Services Patterns

- Must use AWS SDK for JavaScript v3 for interacting with AWS services.
- Must use environment variables to store sensitive information like AWS credentials.
- Must implement error handling for AWS service interactions.
- Must use AWS CloudFormation or AWS CDK for infrastructure as code to manage AWS resources.
- Must use Node.js version 20.X

## Example AWS Stack Creation with AWS CDK

```ts
import "./config/dotenv"; // sort-imports-ignore

import * as cdk from "aws-cdk-lib";
import * as gateway from "aws-cdk-lib/aws-apigateway";
import * as iam from "aws-cdk-lib/aws-iam";

import { AuthTable } from "./lib/dynamoDb/authTable/table";
import { AuthAPIGateway } from "./lib/gateway/authAPI";
import { SignInLambda } from "./lib/lambdas/signIn/lambda";
import { RefreshTokenLambda } from "./lib/lambdas/refreshToken/lambda";
import { resourceNames } from "./contants/resources";
import dotenv from "./contants/dotenv";

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
    };

    const signInLambda = new SignInLambda(this, lambdaEnv, logGroup);
    const refreshTokenLambda = new RefreshTokenLambda(
      this,
      lambdaEnv,
      logGroup,
    );

    // API Gateway
    const authApi = new AuthAPIGateway(this);

    // API Routes
    // /auth
    const authRoute = authApi.root.addResource("auth");
    // /auth/signin
    const signinRoute = authRoute.addResource("signin");
    signinRoute.addMethod("POST", new gateway.LambdaIntegration(signInLambda));
    // /auth/refresh-token
    const refreshTokenRoute = authRoute.addResource("refresh-token");
    refreshTokenRoute.addMethod(
      "POST",
      new gateway.LambdaIntegration(refreshTokenLambda),
    );

    // Permissions
    authTable.table.grantReadWriteData(signInLambda);
    authTable.table.grantReadWriteData(refreshTokenLambda);

    // API Preflight
    addPreflight(refreshTokenRoute);
    addCorsPreflight(signinRoute);
  }
}

const app = new cdk.App();

new NodeTemplateStack(app);
```

## Example Lambda Handler with AWS SDK v3

```ts
// lambda.ts
import { AWS } from "@packages/common-types";
import * as cdk from "aws-cdk-lib";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as nodeLambda from "aws-cdk-lib/aws-lambda-nodejs";

import { lambdaPackages, resourceNames } from "../../../contants/resources";

export class TranslateTextLambda extends nodeLambda.NodejsFunction {
  constructor(
    scope: cdk.Stack,
    lambdaEnv: AWS.LambdasProps,
    logGroup?: cdk.aws_logs.LogGroup,
  ) {
    const params: nodeLambda.NodejsFunctionProps = {
      runtime: lambda.Runtime.NODEJS_20_X,
      timeout: cdk.Duration.seconds(10),
      handler: "handler",
      functionName: resourceNames.translateTextLambda,
      entry: __dirname + "/handler.ts",
      environment: lambdaEnv,
      bundling: {
        environment: lambdaEnv,
        nodeModules: lambdaPackages,
      },
      logGroup,
    };

    super(scope, resourceNames.translateTextLambda, params);
  }
}

// handler.ts
import { TranslateTextCommand } from "@aws-sdk/client-translate";
import {
  AWS,
  COMMON,
  createTranslateSchemas,
  dictionaries,
  zodErrorStringify,
} from "@packages/common-types";

import translateClient from "../../../config/translateClient";
import { createResponse } from "../../../utils/api/createResponse";

export const handler: AWS.APIGatewayHandler = async (event) => {
  const lang = (event.headers?.lang || "en") as COMMON.Language;
  const dictionary = dictionaries[lang];

  try {
    const jsonBody = JSON.parse(event.body || "{}");
    const { translateTextSchema } = createTranslateSchemas({ lang });
    const result = translateTextSchema.safeParse(jsonBody);

    if (!result.success) {
      const details = zodErrorStringify(result);
      return createResponse(400, {
        error: dictionary.INVALID_REQUEST_BODY,
        details,
      });
    }

    const translation = await translateClient.send(
      new TranslateTextCommand({
        Text: result.data.text,
        SourceLanguageCode: result.data.sourceLanguageCode || "auto",
        TargetLanguageCode: result.data.targetLanguageCode,
      }),
    );

    return createResponse(200, {
      translatedText: translation.TranslatedText,
      sourceLanguageCode: translation.SourceLanguageCode,
      targetLanguageCode: translation.TargetLanguageCode,
    });
  } catch (err: any) {
    console.error(err);
    return createResponse(500, {
      error: dictionary.INTERNAL_SERVER_ERROR,
      details: err?.message || err,
    });
  }
};
```
