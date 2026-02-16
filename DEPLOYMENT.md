# Render Deployment Guide for Smart Video Learning Platform

## Prerequisites
- GitHub account
- Render account (sign up at https://render.com)
- MongoDB Atlas account with database setup
- OpenAI API key
- YouTube API key (optional, or use mock mode)

## Step 1: Prepare Your Repository
1. Push your code to GitHub
2. Make sure all files are committed

## Step 2: Set Up MongoDB Atlas
1. Go to https://cloud.mongodb.com/
2. Create a cluster if you haven't already
3. Go to **Database Access** → Create a database user
4. Go to **Network Access** → Add IP: `0.0.0.0/0` (allow from anywhere)
5. Get your connection string from **Database** → **Connect** → **Connect your application**

## Step 3: Deploy Backend on Render

### Create Web Service
1. Go to https://dashboard.render.com/
2. Click **New** → **Web Service**
3. Connect your GitHub repository
4. Configure:
   - **Name**: `smart-video-learning-backend`
   - **Region**: Choose closest to you
   - **Branch**: `main`
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: Free

### Add Environment Variables
Click **Advanced** → **Add Environment Variable** and add:

```
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://your-username:your-password@cluster.mongodb.net/smart-video-learning?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_jwt_key_minimum_32_characters_long
OPENAI_API_KEY=sk-proj-your_openai_api_key_here
YOUTUBE_API_KEY=your_youtube_api_key_here
CLIENT_URL=https://your-frontend-url.onrender.com
USE_MOCK_AI=false
```

**Important**: Replace:
- MongoDB credentials with your actual values
- Generate a secure JWT_SECRET (32+ characters)
- Add your actual API keys
- Update CLIENT_URL after deploying frontend (step 4)

5. Click **Create Web Service**
6. Wait for deployment to complete
7. Copy your backend URL (e.g., `https://smart-video-learning-backend.onrender.com`)

## Step 4: Deploy Frontend on Render

### Create Static Site
1. Click **New** → **Static Site**
2. Connect your GitHub repository
3. Configure:
   - **Name**: `smart-video-learning-frontend`
   - **Branch**: `main`
   - **Root Directory**: `frontend`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `build`

### Add Environment Variables
Add this environment variable:

```
REACT_APP_API_URL=https://your-backend-url.onrender.com/api
```

Replace with your actual backend URL from step 3.

4. Click **Create Static Site**
5. Wait for deployment to complete
6. Copy your frontend URL

## Step 5: Update Backend Environment Variables
1. Go back to your backend service in Render
2. Go to **Environment** tab
3. Update `CLIENT_URL` with your frontend URL
4. Click **Save Changes** (this will redeploy)

## Step 6: Test Your Deployment
1. Open your frontend URL in a browser
2. Register a new account
3. Try processing a YouTube video
4. Verify all features work

## Troubleshooting

### Backend Issues
- Check logs in Render dashboard
- Verify MongoDB connection string is correct
- Ensure all environment variables are set
- Check that IP whitelist in MongoDB Atlas includes `0.0.0.0/0`

### Frontend Issues
- Verify `REACT_APP_API_URL` points to correct backend
- Check browser console for CORS errors
- Ensure backend `CLIENT_URL` matches frontend URL

### Free Tier Limitations
- Render free tier services spin down after inactivity
- First request after inactivity may take 30-60 seconds
- Consider upgrading for production use

## Alternative: Deploy with render.yaml
You can also use the included `render.yaml` file:
1. Push to GitHub
2. In Render dashboard, click **New** → **Blueprint**
3. Connect your repository
4. Render will auto-detect `render.yaml`
5. Add all environment variables in the Render dashboard
6. Deploy!

## Post-Deployment
- Monitor your application in Render dashboard
- Set up custom domain (optional)
- Enable auto-deploy from GitHub (recommended)
- Set up alerts and notifications

## Environment Variables Summary

### Backend (.env)
```
NODE_ENV=production
PORT=5000
MONGODB_URI=<your-mongodb-atlas-uri>
JWT_SECRET=<minimum-32-characters>
OPENAI_API_KEY=<your-key>
YOUTUBE_API_KEY=<your-key>
CLIENT_URL=<frontend-url>
USE_MOCK_AI=false
```

### Frontend (.env)
```
REACT_APP_API_URL=<backend-url>/api
```

## Support
If you encounter issues, check:
- Render service logs
- MongoDB Atlas connection
- Environment variables are correctly set
- CORS is properly configured
