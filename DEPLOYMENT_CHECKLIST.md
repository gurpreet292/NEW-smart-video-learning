# Quick Deployment Checklist

## ✅ Pre-Deployment Verification
- [x] Backend running on port 5000
- [x] Frontend running on port 3000
- [x] MongoDB connected successfully
- [x] All environment variables documented
- [x] Deployment configurations created

## 🚀 Ready to Deploy on Render

Your project is now fully configured for Render deployment!

### What's Been Prepared:

1. **Deployment Configuration** (`render.yaml`)
   - Backend web service configuration
   - Frontend static site configuration
   - Environment variable templates

2. **Environment Examples**
   - `backend/.env.example` - Backend environment variables template
   - `frontend/.env.example` - Frontend environment variables template

3. **Documentation**
   - `DEPLOYMENT.md` - Complete step-by-step deployment guide

4. **Local Development**
   - Backend: http://localhost:5000
   - Frontend: http://localhost:3000
   - MongoDB: Running on port 27018

### Next Steps to Deploy:

1. **Get MongoDB Atlas Credentials**
   - Sign up at https://cloud.mongodb.com
   - Create a cluster
   - Get your connection string
   - Whitelist IP: 0.0.0.0/0

2. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Prepare for Render deployment"
   git push origin main
   ```

3. **Deploy Backend on Render**
   - Go to https://dashboard.render.com
   - New → Web Service
   - Connect GitHub repo
   - Root Directory: `backend`
   - Build: `npm install`
   - Start: `npm start`
   - Add environment variables (see DEPLOYMENT.md)

4. **Deploy Frontend on Render**
   - New → Static Site
   - Root Directory: `frontend`
   - Build: `npm install && npm run build`
   - Publish: `build`
   - Add REACT_APP_API_URL

5. **Update CORS**
   - Update backend CLIENT_URL with frontend URL
   - Update frontend REACT_APP_API_URL with backend URL

### Important Notes:

⚠️ **Before deploying, update:**
- MongoDB Atlas connection string in backend env vars
- Your actual OpenAI API key (or keep USE_MOCK_AI=true)
- Your YouTube API key (or use mock mode)
- Generate a secure JWT_SECRET (32+ characters)

📖 **Read DEPLOYMENT.md for detailed instructions**

### Current Configuration:

**Backend (.env - Local Development)**
```
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27018/smart-video-learning
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production_12345
OPENAI_API_KEY=sk-proj-...
YOUTUBE_API_KEY=AIzaSy...
CLIENT_URL=http://localhost:3000
USE_MOCK_AI=true
```

**Frontend (.env - Local Development)**
```
REACT_APP_API_URL=http://localhost:5000/api
```

### Testing Locally:
✅ Both servers are running
✅ Visit http://localhost:3000 to test the application
✅ Try registering and processing a video

### Deployment Options:

**Option 1: Render Blueprint (Recommended)**
- Push code to GitHub
- In Render: New → Blueprint
- Select your repository
- Render auto-detects `render.yaml`
- Add environment variables in dashboard

**Option 2: Manual Deployment**
- Follow step-by-step guide in DEPLOYMENT.md
- Deploy backend first, then frontend
- Update CORS settings after both are deployed

Good luck with your deployment! 🎉

---

## 🔗 Connecting Vercel Frontend to Render Backend

### Quick Setup Guide:

#### 1️⃣ **Deploy Backend to Render**
   - Root Directory: `backend`
   - Build Command: `npm install`
   - Start Command: `npm start`
   
   **Add these Environment Variables in Render:**
   ```
   PORT=10000
   NODE_ENV=production
   MONGODB_URI=<your-atlas-uri>
   JWT_SECRET=<generate-with-openssl>
   CLIENT_URL=https://your-app.vercel.app
   ```
   
   **Copy your Render URL**: `https://your-backend.onrender.com`

#### 2️⃣ **Deploy Frontend to Vercel**
   - Root Directory: `frontend`
   - Framework: Create React App
   - Build Command: `npm run build`
   
   **Add these Environment Variables in Vercel:**
   ```
   REACT_APP_API_URL=https://your-backend.onrender.com/api
   ```

#### 3️⃣ **Update Backend with Frontend URL**
   - Go back to Render
   - Update `CLIENT_URL` to your Vercel URL
   - Redeploy backend

### 🧪 Test Connection:
```bash
# Test backend
curl https://your-backend.onrender.com/api/health

# Visit frontend
https://your-app.vercel.app
```

---

## 📋 Common Issues:

### CORS Error
✅ Make sure `CLIENT_URL` in Render exactly matches your Vercel URL

### 404 on API
✅ Verify `REACT_APP_API_URL` ends with `/api`

### MongoDB Connection Failed
✅ Check MongoDB Atlas allows connections from `0.0.0.0/0`

---

For detailed instructions, see: [DEPLOYMENT_CONFIG.md](DEPLOYMENT_CONFIG.md)
