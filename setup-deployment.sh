#!/bin/bash

# 🚀 Quick Deployment Helper Script
# This script helps you configure your environment variables

echo "🚀 Smart Video Learning - Deployment Configuration Helper"
echo "=========================================================="
echo ""

# Get URLs
echo "📋 First, let's get your deployment URLs:"
echo ""
read -p "Enter your Render backend URL (e.g., https://my-app.onrender.com): " BACKEND_URL
read -p "Enter your Vercel frontend URL (e.g., https://my-app.vercel.app): " FRONTEND_URL

# Remove trailing slashes
BACKEND_URL=${BACKEND_URL%/}
FRONTEND_URL=${FRONTEND_URL%/}

echo ""
echo "✅ Configuration generated!"
echo ""
echo "=========================================================="
echo "📦 VERCEL (Frontend) Environment Variables"
echo "=========================================================="
echo ""
echo "Add these in Vercel Dashboard → Your Project → Settings → Environment Variables:"
echo ""
echo "REACT_APP_API_URL=${BACKEND_URL}/api"
echo "REACT_APP_NAME=Smart Video Learning"
echo ""
echo "=========================================================="
echo "🔧 RENDER (Backend) Environment Variables"
echo "=========================================================="
echo ""
echo "Add these in Render Dashboard → Your Service → Environment:"
echo ""
echo "PORT=10000"
echo "NODE_ENV=production"
echo "MONGODB_URI=<your-mongodb-atlas-connection-string>"
echo "JWT_SECRET=<run: openssl rand -base64 32>"
echo "OPENAI_API_KEY=<your-openai-api-key>"
echo "YOUTUBE_API_KEY=<your-youtube-api-key>"
echo "CLIENT_URL=${FRONTEND_URL}"
echo "USE_MOCK_AI=false"
echo ""
echo "=========================================================="
echo "📝 Next Steps:"
echo "=========================================================="
echo ""
echo "1. Copy the Vercel environment variables above"
echo "2. Paste them in Vercel Dashboard"
echo "3. Copy the Render environment variables above"
echo "4. Paste them in Render Dashboard (fill in the <placeholders>)"
echo "5. Redeploy both services"
echo "6. Test at: ${FRONTEND_URL}"
echo ""
echo "🧪 Test your backend:"
echo "   curl ${BACKEND_URL}/api/health"
echo ""
echo "✨ All done! Check DEPLOYMENT_CONFIG.md for detailed instructions."
