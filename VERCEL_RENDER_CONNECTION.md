# 🚀 Quick Connection Guide: Vercel ↔️ Render

## 📊 Architecture Overview

```
┌─────────────────┐         ┌─────────────────┐         ┌──────────────────┐
│                 │         │                 │         │                  │
│  Vercel         │ ──────► │  Render         │ ──────► │  MongoDB Atlas   │
│  (Frontend)     │  HTTPS  │  (Backend API)  │  Auth   │  (Database)      │
│                 │ ◄────── │                 │         │                  │
└─────────────────┘   JSON  └─────────────────┘         └──────────────────┘
  React.js App              Node.js + Express             Cloud Database
```

---

## 🎯 Step-by-Step Connection

### **STEP 1: Get Your URLs**

After deploying both:
- ✅ **Vercel URL**: `https://your-app.vercel.app`
- ✅ **Render URL**: `https://your-backend.onrender.com`

---

### **STEP 2: Configure Render (Backend)**

Go to: **Render Dashboard → Your Service → Environment**

Add/Update these variables:

| Variable | Value | Example |
|----------|-------|---------|
| `CLIENT_URL` | Your Vercel URL | `https://your-app.vercel.app` |
| `PORT` | 10000 | `10000` |
| `NODE_ENV` | production | `production` |
| `MONGODB_URI` | Your Atlas URI | `mongodb+srv://user:pass@cluster.net/dbname` |
| `JWT_SECRET` | Random string | Run: `openssl rand -base64 32` |

**Important**: 
- ❌ NO trailing slash in `CLIENT_URL`
- ✅ Correct: `https://your-app.vercel.app`
- ❌ Wrong: `https://your-app.vercel.app/`

---

### **STEP 3: Configure Vercel (Frontend)**

Go to: **Vercel Dashboard → Your Project → Settings → Environment Variables**

Add these variables:

| Variable | Value | Example |
|----------|-------|---------|
| `REACT_APP_API_URL` | Your Render URL + `/api` | `https://your-backend.onrender.com/api` |
| `REACT_APP_NAME` | App name | `Smart Video Learning` |

**Important**:
- ✅ Must end with `/api`
- ✅ Correct: `https://your-backend.onrender.com/api`
- ❌ Wrong: `https://your-backend.onrender.com`

---

### **STEP 4: Redeploy Both**

1. **Render**: After updating env vars → Auto redeploys
2. **Vercel**: Go to Deployments → Click "Redeploy" → Use existing build cache

---

## 🧪 Testing the Connection

### Test 1: Backend Health Check
```bash
curl https://your-backend.onrender.com/api/health
```

**Expected Response:**
```json
{
  "status": "success",
  "message": "Server is running",
  "timestamp": "2026-02-18T..."
}
```

### Test 2: CORS Preflight
```bash
curl -X OPTIONS https://your-backend.onrender.com/api/auth/register \
  -H "Origin: https://your-app.vercel.app" \
  -H "Access-Control-Request-Method: POST" \
  -i
```

**Expected Response Headers:**
```
Access-Control-Allow-Origin: https://your-app.vercel.app
Access-Control-Allow-Credentials: true
Access-Control-Allow-Methods: GET,POST,PUT,DELETE,OPTIONS
```

### Test 3: Frontend Connection
1. Open browser: `https://your-app.vercel.app`
2. Open DevTools (F12) → Console tab
3. Go to Registration page
4. Fill form and submit
5. Check Console for errors

**Good**: User registered successfully ✅
**Bad**: CORS error or 404 ❌

---

## 🐛 Troubleshooting

### Issue: "CORS policy: No 'Access-Control-Allow-Origin' header"

**Cause**: `CLIENT_URL` doesn't match your Vercel URL

**Fix**:
1. Go to Render → Environment
2. Check `CLIENT_URL` exactly matches Vercel URL
3. Remove any trailing slashes
4. Save and wait for redeploy

---

### Issue: "Failed to fetch" or "Network Error"

**Cause**: Wrong `REACT_APP_API_URL` or backend not running

**Fix**:
1. Check Render service is running (not crashed)
2. Verify `REACT_APP_API_URL` in Vercel settings
3. Must end with `/api`
4. Test health endpoint: `curl https://backend.onrender.com/api/health`

---

### Issue: "404 Not Found" on API calls

**Cause**: `REACT_APP_API_URL` missing `/api`

**Fix**:
1. Go to Vercel → Settings → Environment Variables
2. Find `REACT_APP_API_URL`
3. Make sure it ends with `/api`
4. Example: `https://backend.onrender.com/api` ✅
5. Redeploy frontend

---

### Issue: Backend crashes after deploy

**Cause**: Missing environment variables or MongoDB connection failed

**Fix**:
1. Check Render logs: Dashboard → Your Service → Logs
2. Look for error messages
3. Common issues:
   - MongoDB connection string wrong
   - Missing environment variables
   - Network access not configured in MongoDB Atlas

---

### Issue: Environment variables not updating

**Cause**: Frontend cached old values

**Fix**:
1. Vercel: Redeploy from dashboard (don't use cache)
2. Browser: Hard refresh (Ctrl+Shift+R)
3. Clear browser cache
4. Try incognito mode

---

## 📋 Configuration Checklist

### Render (Backend)
- [ ] `CLIENT_URL` set to Vercel URL (no trailing slash)
- [ ] `PORT` set to 10000
- [ ] `NODE_ENV` set to production
- [ ] `MONGODB_URI` set to Atlas connection string
- [ ] `JWT_SECRET` set to random string
- [ ] Service is running (green status)

### Vercel (Frontend)
- [ ] `REACT_APP_API_URL` set to Render URL + `/api`
- [ ] `REACT_APP_NAME` set
- [ ] Latest deployment successful
- [ ] Site loads without errors

### MongoDB Atlas
- [ ] Network access allows `0.0.0.0/0`
- [ ] Database user created
- [ ] Connection string correct
- [ ] Database name added to URI

---

## 🎉 Success Indicators

✅ Backend health endpoint returns 200
✅ Frontend loads without console errors
✅ Can register new user
✅ Can login successfully
✅ Can process YouTube videos
✅ Dashboard shows stats

---

## 📞 Need Help?

Check these resources:
- [DEPLOYMENT_CONFIG.md](DEPLOYMENT_CONFIG.md) - Detailed guide
- [DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md) - Step-by-step checklist
- Render Logs: Dashboard → Service → Logs
- Vercel Logs: Dashboard → Project → Deployments → Function Logs
- Browser Console: F12 → Console

---

## 🔗 Quick Reference

**Your URLs** (update these):
- Frontend: `https://_____.vercel.app`
- Backend: `https://_____.onrender.com`
- API: `https://_____.onrender.com/api`
- Health: `https://_____.onrender.com/api/health`

**Dashboards**:
- Vercel: https://vercel.com/dashboard
- Render: https://dashboard.render.com
- MongoDB: https://cloud.mongodb.com

---

**Last Updated**: February 18, 2026
