# Serverless Microservices Web App

Production-ready serverless microservices architecture with automatic scaling and CI/CD pipeline.

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────────────────┐
│                   CloudFront (CDN)                   │
└────────────────────┬────────────────────────────────┘
                     │
        ┌────────────┴────────────┐
        │                         │
   ┌────▼────┐          ┌────────▼──────┐
   │    S3   │          │  API Gateway   │
   │(Static) │          │    (REST)      │
   └─────────┘          └────────┬───────┘
                                 │
                    ┌────────────┼────────────┐
                    │            │            │
              ┌─────▼───┐  ┌─────▼───┐  ┌─────▼───┐
              │ Lambda  │  │ Lambda  │  │ Lambda  │
              │ User    │  │ Order   │  │ Product │
              │ Service │  │ Service │  │ Service │
              └─────┬───┘  └─────┬───┘  └─────┬───┘
                    │            │            │
                    └────────────┼────────────┘
                                 │
                            ┌────▼────┐
                            │DynamoDB │
                            │(Tables) │
                            └─────────┘
```

## 🚀 Features

- ✅ **Serverless Architecture** - AWS Lambda with automatic scaling
- ✅ **Microservices** - Independent, deployable services
- ✅ **Infrastructure as Code** - AWS CDK for reproducible infrastructure
- ✅ **CI/CD Pipeline** - GitHub Actions with automated testing & deployment
- ✅ **Security** - IAM, encryption, vulnerability scanning
- ✅ **Monitoring** - CloudWatch logs and metrics
- ✅ **Type Safety** - Full TypeScript support
- ✅ **Monorepo** - npm workspaces for code organization

## 📋 Prerequisites

- Node.js 18+
- AWS Account
- Git
- Docker (for local DynamoDB)

## 🛠️ Setup

### 1. Clone Repository

```bash
git clone https://github.com/yourusername/serverless-microservices-app.git
cd serverless-microservices-app
```

### 2. Install Dependencies

```bash
npm install --workspaces
```

### 3. Configure Environment

```bash
cp .env.example .env
# Edit .env with your AWS configuration
```

### 4. Set AWS Credentials

```bash
aws configure
```

## 🏃 Development

### Start Local Development

```bash
# Start DynamoDB Local
docker run -d -p 8000:8000 amazon/dynamodb-local

# Run services locally
npm run dev
```

### Run Tests

```bash
npm test
npm run test:watch
```

### Linting & Formatting

```bash
npm run lint
npm run format
```

## 📦 Deployment

### Deploy to Development

```bash
bash scripts/deploy.sh dev
```

### Deploy to Production

```bash
bash scripts/deploy.sh prod
```

## 📁 Project Structure

```
serverless-microservices-app/
├── services/
│   ├── user-service/
│   ├── order-service/
│   └── product-service/
├── frontend/
├── infrastructure/
├── .github/workflows/
├── scripts/
└── README.md
```

## 🔐 Security

- **IAM Roles** - Least privilege access
- **Environment Variables** - Secrets management
- **DynamoDB Encryption** - At rest and in transit
- **API Authorization** - AWS IAM + JWT
- **CORS** - Restricted origins
- **Vulnerability Scanning** - Snyk in CI/CD

## 📊 Monitoring

- **CloudWatch Logs** - Centralized logging
- **CloudWatch Metrics** - Performance monitoring
- **X-Ray Tracing** - Distributed tracing
- **Custom Alarms** - Alert on failures

## 🛠️ Tech Stack

| Component | Technology |
|-----------|------------|
| Runtime | Node.js 18 |
| Language | TypeScript |
| Serverless | AWS Lambda |
| Database | DynamoDB |
| API | API Gateway |
| Infrastructure | AWS CDK |
| CI/CD | GitHub Actions |
| Testing | Jest |
| Linting | ESLint |

## 📝 API Endpoints

### User Service

- `GET /users` - List all users
- `GET /users/{id}` - Get user by ID
- `POST /users` - Create new user
- `PUT /users/{id}` - Update user

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit changes
4. Push to branch
5. Open a Pull Request

## 📄 License

MIT License

## 👥 Support

For issues and questions, please create a GitHub issue.

---

Made with ❤️ by the Development Team
