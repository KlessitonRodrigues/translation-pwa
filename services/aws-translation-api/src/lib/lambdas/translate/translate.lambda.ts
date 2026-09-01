import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as nodeLambda from 'aws-cdk-lib/aws-lambda-nodejs';

import { lambdaPackages, resourceNames } from '../../../constants/constants.resources';
import { environment } from '../../../utils/utils.lambda';

const entry = __dirname + '/translate.service.ts';
const runtime = lambda.Runtime.NODEJS_20_X;
const timeout = cdk.Duration.seconds(10);

export class TranslateLambda extends nodeLambda.NodejsFunction {
  constructor(scope: cdk.Stack, environment: environment, logGroup?: cdk.aws_logs.LogGroup) {
    super(scope, resourceNames.translateLambda, {
      runtime,
      timeout,
      entry,
      environment,
      logGroup,
      handler: 'translateService',
      functionName: resourceNames.translateLambda,
      bundling: { environment, nodeModules: lambdaPackages },
    });
  }
}
