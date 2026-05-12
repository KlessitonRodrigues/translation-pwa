import {
  PutCommand,
  PutCommandInput,
  QueryCommand,
  QueryCommandInput,
} from '@aws-sdk/lib-dynamodb';
import * as bcrypt from 'bcrypt';

import { Auth } from '../../../../node_modules/@packages/common-types';
import { docClient } from '../../../config/dynamoDb';
import { resourceNames } from '../../../contants/resources';

export const getAuthUserByEmail = async (email: string) => {
  const params: QueryCommandInput = {
    TableName: resourceNames.authTable,
    IndexName: 'emailIndex',
    KeyConditionExpression: 'email = :email',
    ExpressionAttributeValues: {
      ':email': email,
    },
  };
  const result = await docClient.send(new QueryCommand(params));
  return result.Items?.[0] as Auth.AuthUser | undefined;
};

export const createAuthUser = async (authUser: Auth.AuthUser) => {
  if (!authUser.email || !authUser.password || !authUser.userName) {
    throw new Error('Missing required fields');
  }

  await getAuthUserByEmail(authUser.email).then(existingUser => {
    if (existingUser) throw new Error('Email already exists');
  });

  const newUser = {
    userId: crypto.randomUUID(),
    email: authUser.email,
    userName: authUser.userName,
    password: await bcrypt.hash(authUser.password, 12),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const params: PutCommandInput = {
    TableName: resourceNames.authTable,
    Item: newUser,
    ConditionExpression: 'attribute_not_exists(email)',
  };

  await docClient.send(new PutCommand(params));
  return newUser;
};

export const updateAuthUser = async (userId: string, updates: Partial<Auth.AuthUser>) => {
  const existingUserParams: QueryCommandInput = {
    TableName: resourceNames.authTable,
    KeyConditionExpression: 'userId = :userId',
    ExpressionAttributeValues: {
      ':userId': userId,
    },
  };

  const existingUserResult = await docClient.send(new QueryCommand(existingUserParams));
  const existingUser = existingUserResult.Items?.[0];

  if (!existingUser) {
    throw new Error('User not found');
  }

  const updatedUser = {
    ...existingUser,
    ...updates,
    updatedAt: new Date().toISOString(),
  };

  if (updates.password) {
    updatedUser.password = await bcrypt.hash(updates.password, 12);
  }

  const putParams: PutCommandInput = {
    TableName: resourceNames.authTable,
    Item: updatedUser,
  };

  await docClient.send(new PutCommand(putParams));
  return updatedUser;
};
