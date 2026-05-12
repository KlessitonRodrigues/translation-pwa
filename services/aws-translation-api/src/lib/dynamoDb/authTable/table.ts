import * as cdk from 'aws-cdk-lib';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';

import { resourceNames } from '../../../contants/resources';

export class AuthTable {
  public table: dynamodb.Table;

  constructor(scope: cdk.Stack) {
    this.table = new dynamodb.Table(scope, resourceNames.authTable, {
      tableName: resourceNames.authTable,
      partitionKey: {
        name: 'userId',
        type: dynamodb.AttributeType.STRING,
      },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    // Add a GSI for email-based lookups
    this.table.addGlobalSecondaryIndex({
      indexName: 'emailIndex',
      partitionKey: {
        name: 'email',
        type: dynamodb.AttributeType.STRING,
      },
      projectionType: dynamodb.ProjectionType.ALL,
    });
  }
}
