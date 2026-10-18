# 🚀 Deployment Configuration Guide

## Prerequisites
- ✅ Vercel account (frontend deployment)
- ✅ Render account (backend deployment)
- ✅ MongoDB Atlas account (cloud database)

---

## 📋 Step-by-Step Configuration

### 1️⃣ **Setup MongoDB Atlas (Database)**

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Click "Connect" → "Connect your application"
4. Copy the connection string (looks like):
   ```
   mongodb+srv://username:<password>@cluster.mongodb.net/
   ```
5. Replace `<password>` with your actual database password
6. Add `/smart-video-learning` after `.net/`

### 2️⃣ **Deploy Backend to Render**

1. Push your code to GitHub
2. Go to [Render Dashboard](https://dashboard.render.com/)
3. Click "New +" → "Web Service"
4. Connect your GitHub repository
5. Configure:
   - **Name**: `smart-video-learning-backend` (or your choice)
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free

6. **Add Environment Variables**:
   ```bash
   PORT=10000
   NODE_ENV=production
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/smart-video-learning
   JWT_SECRET=<generate with: openssl rand -base64 32>
   OPENAI_API_KEY=sk-proj-your-key-here
   YOUTUBE_API_KEY=your-youtube-key
   CLIENT_URL=https://your-app.vercel.app
   USE_MOCK_AI=false
   ```

7. Click "Create Web Service"
8. **Copy your backend URL** (e.g., `https://smart-video-learning-backend.onrender.com`)

### 3️⃣ **Deploy Frontend to Vercel**

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New" → "Project"
3. Import your GitHub repository
4. Configure:
   - **Framework Preset**: Create React App
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`

5. **Add Environment Variables**:
   ```bash
   REACT_APP_API_URL=https://your-backend.onrender.com/api
   REACT_APP_NAME=Smart Video Learning
   ```
   **⚠️ Important**: Replace `your-backend.onrender.com` with your actual Render URL

6. Click "Deploy"
7. **Copy your frontend URL** (e.g., `https://your-app.vercel.app`)

### 4️⃣ **Update Backend with Frontend URL**

1. Go back to Render Dashboard
2. Select your backend service
3. Go to "Environment" tab
4. Update `CLIENT_URL` with your actual Vercel URL
5. Click "Save Changes" (this will trigger a redeploy)

### 5️⃣ **Verify CORS Configuration**

Your backend should already have the CORS configuration in `server.js`. Make sure it includes:

```javascript
const allowedOrigins = [
  'http://localhost:3000',
  'https://video-learning-frontend.vercel.app',
  process.env.CLIENT_URL
].filter(Boolean);
```

---

## 🔒 Security Checklist

- [ ] Generate a strong JWT_SECRET (use: `openssl rand -base64 32`)
- [ ] Use MongoDB Atlas (not local MongoDB)
- [ ] Set `NODE_ENV=production` in backend
- [ ] Whitelist your Vercel URL in MongoDB Atlas network access
- [ ] Don't commit `.env` files to Git
- [ ] Keep API keys secure

---

## 🧪 Testing Your Deployment

1. **Test Backend Health**:
   ```bash
   curl https://your-backend.onrender.com/api/health
   ```
   Should return: `{"status":"success","message":"Server is running"}`

2. **Test Frontend**:
   - Open `https://your-app.vercel.app`
   - Try registering a new account
   - Check browser console for any CORS errors

3. **Test Registration from Frontend**:
   - Go to `/register` page
   - Fill in the form
   - Submit and check if it connects to backend

---

## 🐛 Common Issues & Fixes

### Issue: CORS Error
**Solution**: Make sure `CLIENT_URL` in Render matches your exact Vercel URL (no trailing slash)

### Issue: 404 on API calls
**Solution**: Verify `REACT_APP_API_URL` ends with `/api` (e.g., `https://backend.onrender.com/api`)

### Issue: MongoDB Connection Failed
**Solution**: 
- Check MongoDB Atlas network access allows connections from anywhere (0.0.0.0/0)
- Verify connection string is correct
- Ensure password doesn't contain special characters (or encode them)

### Issue: Frontend shows old data after deploy
**Solution**: Clear browser cache or force refresh (Ctrl+Shift+R)

---

## 📝 Quick Reference URLs

- **Frontend Local**: http://localhost:3000
- **Backend Local**: http://localhost:5001/api
- **Frontend Production**: https://your-app.vercel.app
- **Backend Production**: https://your-backend.onrender.com/api
- **MongoDB Atlas**: https://cloud.mongodb.com

---

## 🔄 Redeployment

**Frontend (Vercel)**:
- Push to GitHub → Automatic deployment
- Or: Vercel Dashboard → Deployments → Redeploy

**Backend (Render)**:
- Push to GitHub → Automatic deployment
- Or: Render Dashboard → Manual Deploy → Deploy latest commit

---

## 📞 Need Help?

If you get stuck, check:
1. Render logs: Dashboard → Your Service → Logs
2. Vercel logs: Dashboard → Your Project → Deployments → View Function Logs
3. Browser console: F12 → Console tab
