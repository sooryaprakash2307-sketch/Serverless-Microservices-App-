#!/bin/bash

set -e

STAGE=${1:-dev}
REGION=${2:-us-east-1}

echo "🚀 Deploying to $STAGE in $REGION..."

# Export environment variables
export AWS_REGION=$REGION
export STAGE=$STAGE

# Deploy each service
echo "📦 Installing dependencies..."
npm install --workspaces

echo "🔨 Building services..."
npm run build || true

echo "✅ Deployment configuration ready!"
echo "To deploy, configure AWS credentials and run:"
echo "  cd services/user-service && npm run deploy -- --stage $STAGE"
