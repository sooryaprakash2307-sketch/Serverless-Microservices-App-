service: user-service

frameworkVersion: '3'
useDotenv: true

provider:
  name: aws
  runtime: nodejs18.x
  region: ${env:AWS_REGION, 'us-east-1'}
  stage: ${opt:stage, 'dev'}
  memorySize: 256
  timeout: 30
  environment:
    USERS_TABLE: ${self:service}-${self:provider.stage}
    LOG_LEVEL: ${env:LOG_LEVEL, 'info'}
  iam:
    role:
      statements:
        - Effect: Allow
          Action:
            - dynamodb:GetItem
            - dynamodb:PutItem
            - dynamodb:UpdateItem
            - dynamodb:DeleteItem
            - dynamodb:Query
            - dynamodb:Scan
          Resource: arn:aws:dynamodb:${self:provider.region}:*:table/${self:provider.environment.USERS_TABLE}
        - Effect: Allow
          Action:
            - logs:CreateLogGroup
            - logs:CreateLogStream
            - logs:PutLogEvents
          Resource: arn:aws:logs:${self:provider.region}:*:*

functions:
  getUser:
    handler: src/handlers/getUser.handler
    description: Get user by ID
    events:
      - http:
          path: users/{id}
          method: get
          cors: true
          authorizer:
            type: aws_iam

  createUser:
    handler: src/handlers/createUser.handler
    description: Create new user
    events:
      - http:
          path: users
          method: post
          cors: true
          authorizer:
            type: aws_iam

  listUsers:
    handler: src/handlers/listUsers.handler
    description: List all users
    events:
      - http:
          path: users
          method: get
          cors: true

resources:
  Resources:
    UsersTable:
      Type: AWS::DynamoDB::Table
      Properties:
        TableName: ${self:provider.environment.USERS_TABLE}
        AttributeDefinitions:
          - AttributeName: id
            AttributeType: S
        KeySchema:
          - AttributeName: id
            KeyType: HASH
        BillingMode: PAY_PER_REQUEST

plugins:
  - serverless-plugin-typescript
  - serverless-offline
  - serverless-dynamodb-local
