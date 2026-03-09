import { APIGatewayProxyHandler } from 'aws-lambda';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, GetCommand } from '@aws-sdk/lib-dynamodb';
import { logger } from '../utils/logger';
import { errorResponse, successResponse } from '../utils/response';

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

export const handler: APIGatewayProxyHandler = async (event) => {
  try {
    logger.info('GetUser handler invoked', { event });

    const userId = event.pathParameters?.id;

    if (!userId) {
      logger.warn('User ID not provided');
      return errorResponse(400, 'User ID is required');
    }

    const command = new GetCommand({
      TableName: process.env.USERS_TABLE!,
      Key: { id: userId },
    });

    const result = await docClient.send(command);

    if (!result.Item) {
      logger.warn('User not found', { userId });
      return errorResponse(404, 'User not found');
    }

    logger.info('User retrieved successfully', { userId });
    return successResponse(result.Item);
  } catch (error) {
    logger.error('Error fetching user', error);
    return errorResponse(500, 'Internal server error');
  }
};
