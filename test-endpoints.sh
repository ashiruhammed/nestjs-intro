#!/bin/bash

# Test script for NestJS API endpoints
BASE_URL="http://localhost:3000"

echo "🚀 Testing NestJS API Endpoints"
echo "================================"

# Test health check
echo "1. Testing App Controller..."
curl -X GET $BASE_URL/ -w "\nStatus: %{http_code}\n\n"

# Test users endpoints
echo "2. Testing Users - GET all..."
curl -X GET $BASE_URL/users -w "\nStatus: %{http_code}\n\n"

echo "3. Testing Users - GET with query..."
curl -X GET "$BASE_URL/users?name=John" -w "\nStatus: %{http_code}\n\n"

echo "4. Testing Users - POST create..."
curl -X POST $BASE_URL/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "phoneNumber": "+1234567890"
  }' -w "\nStatus: %{http_code}\n\n"

# Test posts endpoints
echo "5. Testing Posts..."
curl -X GET $BASE_URL/posts -w "\nStatus: %{http_code}\n\n"

# Test auth endpoints
echo "6. Testing Auth..."
curl -X GET $BASE_URL/auth -w "\nStatus: %{http_code}\n\n"

echo "✅ All tests completed!"
