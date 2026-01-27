# Quick Setup Guide

## Prerequisites Checklist
- [ ] Node.js v18+ installed
- [ ] MongoDB installed (or MongoDB Atlas account)
- [ ] OpenAI API key obtained
- [ ] Git installed

## Setup Steps

### 1. Install Dependencies

**Backend:**
```bash
cd backend
npm install
```

**Frontend:**
```bash
cd frontend
npm install
```

### 2. Configure Environment Variables

**Backend** (`backend/.env`):
```bash
cp backend/.env.example backend/.env
```

Edit `backend/.env`:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/smart_video_learning
JWT_SECRET=your_super_secret_jwt_key_here
OPENAI_API_KEY=sk-your-openai-api-key-here
CLIENT_URL=http://localhost:3000
```

**Frontend** (`frontend/.env`):
```bash
cp frontend/.env.example frontend/.env
```

Edit `frontend/.env`:
```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_NAME=Smart Video Learning
```

### 3. Start MongoDB

**Option A: Local MongoDB**
```bash
# Linux
sudo systemctl start mongod

# macOS
brew services start mongodb-community

# Windows
net start MongoDB
```

**Option B: MongoDB Atlas**
1. Create account at https://www.mongodb.com/cloud/atlas
2. Create a free cluster
3. Get connection string
4. Update `MONGODB_URI` in backend/.env

### 4. Run the Application

Open two terminal windows:

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```
✅ Backend running at http://localhost:5000

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```
✅ Frontend running at http://localhost:3000

### 5. Test the Application

1. Open browser: http://localhost:3000
2. Register a new account
3. Login with your credentials
4. Submit a YouTube video URL
5. Wait for AI processing (30-60 seconds)
6. View summary, key points, and quiz!

## Common Issues & Solutions

### MongoDB Connection Error
**Error:** `MongooseServerSelectionError`

**Solution:**
- Check if MongoDB is running: `sudo systemctl status mongod`
- Verify connection string in `.env`
- For Atlas: Check network access & credentials

### OpenAI API Error
**Error:** `Failed to generate summary`

**Solution:**
- Verify API key in `backend/.env`
- Check OpenAI account has credits
- Test with: https://platform.openai.com/playground

### Transcript Not Found
**Error:** `No transcript available`

**Solution:**
- Ensure video has captions/subtitles
- Try a different educational video
- Video must be publicly accessible

### CORS Error
**Error:** `Access-Control-Allow-Origin`

**Solution:**
- Verify `CLIENT_URL` in `backend/.env` matches frontend URL
- Restart both servers
- Clear browser cache

## Quick Test URLs

Try these educational videos:
- https://www.youtube.com/watch?v=RBSGKlAvoiM (Crash Course)
- https://www.youtube.com/watch?v=kCc8FmEb1nY (TED-Ed)
- https://www.youtube.com/watch?v=UuGrBhK2c7U (Khan Academy)

## Need Help?

Check the main README.md for:
- Detailed API documentation
- Architecture explanation
- Deployment guides
- Troubleshooting section

Happy Learning! 🎓
