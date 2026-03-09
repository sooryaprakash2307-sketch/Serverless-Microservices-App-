import { APIGatewayProxyHandler } from 'aws-lambda';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb';
import { logger } from '../utils/logger';
import { errorResponse, successResponse } from '../utils/response';
import { validateUser } from '../utils/validators';

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

export const handler: APIGatewayProxyHandler = async (event) => {
  try {
    logger.info('CreateUser handler invoked');

    const body = JSON.parse(event.body || '{}');
    
    const validation = validateUser(body);
    if (!validation.isValid) {
      logger.warn('User validation failed', { errors: validation.errors });
      return errorResponse(400, 'Validation failed', validation.errors);
    }

    const userId = `user-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    const command = new PutCommand({
      TableName: process.env.USERS_TABLE!,
      Item: {
        id: userId,
        ...body,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    });

    await docClient.send(command);

    logger.info('User created successfully', { userId });
    return successResponse(
      { id: userId, ...body, createdAt: new Date().toISOString() },
      201
    );
  } catch (error) {
    logger.error('Error creating user', error);
    return errorResponse(500, 'Failed to create user');
  }
};
