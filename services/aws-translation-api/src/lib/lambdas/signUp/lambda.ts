import { AWS } from '@packages/common-types';
import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as nodeLambda from 'aws-cdk-lib/aws-lambda-nodejs';

import { lambdaPackages, resourceNames } from '../../../contants/resources';

export class SignUpLambda extends nodeLambda.NodejsFunction {
  constructor(scope: cdk.Stack, lambdaEnv: AWS.LambdasProps, logGroup?: cdk.aws_logs.LogGroup) {
    const params: nodeLambda.NodejsFunctionProps = {
      runtime: lambda.Runtime.NODEJS_22_X,
      timeout: cdk.Duration.seconds(10),
      handler: 'handler',
      functionName: resourceNames.signUpLambda,
      entry: __dirname + '/handler.ts',
      environment: lambdaEnv,
      logGroup,
      bundling: {
        environment: lambdaEnv,
        nodeModules: lambdaPackages,
      },
    };

    super(scope, resourceNames.signUpLambda, params);
  }
}
