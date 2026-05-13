import * as cdk from 'aws-cdk-lib';
import * as gateway from 'aws-cdk-lib/aws-apigateway';

import { resourceNames } from '../../contants/resources';

export class TranslateAPIGateway extends gateway.RestApi {
  constructor(scope: cdk.Stack) {
    const params: gateway.RestApiProps = {
      restApiName: resourceNames.translateApiGateway,
    };

    super(scope, resourceNames.translateApiGateway, params);
  }
}
