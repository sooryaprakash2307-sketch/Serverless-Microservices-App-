import { APIGatewayProxyHandler } from 'aws-lambda';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, ScanCommand } from '@aws-sdk/lib-dynamodb';
import { logger } from '../utils/logger';
import { errorResponse, successResponse } from '../utils/response';

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

export const handler: APIGatewayProxyHandler = async (event) => {
  try {
    logger.info('ListUsers handler invoked');

    const command = new ScanCommand({
      TableName: process.env.USERS_TABLE!,
      Limit: 100,
    });

    const result = await docClient.send(command);

    logger.info('Users retrieved successfully', { count: result.Items?.length });
    return successResponse(result.Items || []);
  } catch (error) {
    logger.error('Error listing users', error);
    return errorResponse(500, 'Failed to list users');
  }
};
