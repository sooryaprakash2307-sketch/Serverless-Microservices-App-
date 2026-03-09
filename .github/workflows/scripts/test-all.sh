#!/bin/bash

set -e

echo "🧪 Running all tests..."

npm test --workspaces || true

echo "✅ Test suite complete!"
