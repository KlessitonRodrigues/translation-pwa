---
description: "Use when creating or updating AWS service interactions and infrastructure management"
name: "AWS Services Patterns"
applyTo: "**/*.ts, **/*.js"
---

# AWS Services Patterns

- Use AWS SDK for JavaScript v3 for interacting with AWS services.
- Follow AWS best practices for security, such as using IAM roles and policies.
- Use environment variables to store sensitive information like AWS credentials.
- Implement error handling for AWS service interactions to ensure robustness.
- Use AWS CloudFormation or AWS CDK for infrastructure as code to manage AWS resources.

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
