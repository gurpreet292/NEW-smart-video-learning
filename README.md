# 🎓 Smart Video Learning - AI-Powered Educational Platform

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-v18+-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18.2-blue.svg)](https://reactjs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-6.0+-green.svg)](https://www.mongodb.com/)

Transform YouTube educational videos into comprehensive learning experiences with AI-powered summaries, key points, and interactive quizzes.

## ℹ️ YouTube Transcript Limitation

**YouTube's Captions API requires OAuth2 authentication** (not simple API keys), making automated transcript extraction complex.

### ✅ **NEW: Manual Transcript Input Feature**

**The app now has TWO modes:**

#### 📺 YouTube URL Mode
- Try automated extraction (may work for some videos)
- Quick if it works
- Subject to YouTube restrictions

#### ✍️ Manual Transcript Mode (Recommended)
**How to use:**

1. **Open your video on YouTube**
2. **Click "..." → "Show transcript"**  
3. **Copy the transcript text** (Ctrl+A, Ctrl+C)
4. **Switch to "Manual Transcript" mode in the app**
5. **Paste transcript + Enter video title**
6. **Get AI summary, key points, and quiz!**

**Benefits:**
- ✅ Works 100% of the time
- ✅ No API restrictions
- ✅ Works with any video (private, age-restricted, etc.)
- ✅ Takes only 30 seconds

📖 **See [MANUAL_TRANSCRIPT_FEATURE.md](MANUAL_TRANSCRIPT_FEATURE.md) for detailed guide**  
📖 **See [YOUTUBE_API_SETUP.md](YOUTUBE_API_SETUP.md) for technical details**

---

## 🔑 Required API Keys

**To use this app, you need TWO API keys:**

1. **OpenAI API Key** (Required for AI features)
   - Get from: https://platform.openai.com/api-keys
   - Free $5 credits for new accounts
   - See [OPENAI_API_SETUP.md](OPENAI_API_SETUP.md) for setup

2. **YouTube Data API Key** (Optional, for automated extraction)
   - Get from: https://console.cloud.google.com/
   - Currently has limitations (see above)
   - See [YOUTUBE_API_SETUP.md](YOUTUBE_API_SETUP.md)

**Without OpenAI key, video processing will fail with a 500 error.**

---

## ✨ Features

### 🎯 Core Functionality
- **YouTube Video Processing**: Extract transcripts from any YouTube video
- **AI-Powered Summaries**: Generate concise, exam-ready summaries
- **Key Learning Points**: Extract 5-8 essential takeaways
- **Interactive Quizzes**: 10 AI-generated questions per video
- **Learning History**: Track all processed videos
- **Progress Analytics**: View statistics and learning patterns

### 🎨 UI/UX Features
- **Modern, Professional Design**: Clean, minimal interface
- **Light/Dark Mode**: Full theme support
- **Responsive Layout**: Mobile, tablet, and desktop optimized
- **Smooth Animations**: Professional micro-interactions
- **Loading States**: Skeleton loaders and spinners
- **Toast Notifications**: Clear success/error feedback
- **Accessibility**: WCAG compliant design

### 🔒 User Management
- **Authentication**: Secure JWT-based auth
- **User Profiles**: Personalized preferences
- **Learning Dashboard**: Statistics and recent videos
- **Quiz Attempts**: Track and review quiz history

## 🏗️ Tech Stack

### Backend
- **Runtime**: Node.js (v18+)
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **AI Integration**: OpenAI GPT-4
- **Transcript Extraction**: youtube-transcript
- **Authentication**: JWT (jsonwebtoken)
- **Validation**: express-validator
- **Security**: bcryptjs for password hashing

### Frontend
- **Library**: React 18.2
- **Routing**: React Router DOM v6
- **HTTP Client**: Axios
- **Icons**: React Icons
- **Notifications**: React Toastify
- **Loading States**: React Loading Skeleton

## 📁 Project Structure

```
smart-video-learning/
├── backend/
│   ├── config/
│   │   ├── database.js          # MongoDB connection
│   │   └── openai.js            # OpenAI configuration
│   ├── controllers/
│   │   ├── authController.js    # Authentication logic
│   │   ├── videoController.js   # Video processing logic
│   │   ├── quizController.js    # Quiz management
│   │   └── userController.js    # User management
│   ├── middleware/
│   │   ├── authMiddleware.js    # JWT authentication
│   │   ├── errorHandler.js      # Error handling
│   │   └── validation.js        # Input validation
│   ├── models/
│   │   ├── User.js              # User schema
│   │   ├── Video.js             # Video schema
│   │   └── Quiz.js              # Quiz schema
│   ├── routes/
│   │   ├── authRoutes.js        # Auth endpoints
│   │   ├── videoRoutes.js       # Video endpoints
│   │   ├── quizRoutes.js        # Quiz endpoints
│   │   └── userRoutes.js        # User endpoints
│   ├── services/
│   │   ├── transcriptService.js # Transcript extraction
│   │   └── aiService.js         # AI content generation
│   ├── .env.example             # Environment template
│   ├── server.js                # Express app entry
│   └── package.json
│
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/
│   │   │   │   ├── Navbar.js
│   │   │   │   └── PrivateRoute.js
│   │   │   ├── VideoInput/
│   │   │   │   └── VideoInput.js
│   │   │   ├── Summary/
│   │   │   │   └── Summary.js
│   │   │   └── Quiz/
│   │   │       └── Quiz.js
│   │   ├── context/
│   │   │   ├── AuthContext.js   # Authentication state
│   │   │   └── ThemeContext.js  # Theme state
│   │   ├── pages/
│   │   │   ├── Auth/
│   │   │   │   ├── Login.js
│   │   │   │   └── Register.js
│   │   │   ├── Dashboard/
│   │   │   │   └── Dashboard.js
│   │   │   ├── Video/
│   │   │   │   └── VideoDetail.js
│   │   │   └── History/
│   │   │       └── History.js
│   │   ├── services/
│   │   │   └── api.js           # API integration
│   │   ├── utils/
│   │   │   └── helpers.js       # Utility functions
│   │   ├── App.js
│   │   ├── index.js
│   │   └── index.css
│   ├── .env.example
│   └── package.json
│
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- **Node.js**: v18 or higher
- **MongoDB**: v6.0 or higher (local or MongoDB Atlas)
- **OpenAI API Key**: Get from [OpenAI Platform](https://platform.openai.com/)
- **npm** or **yarn**: Package manager

### Installation

#### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/smart-video-learning.git
cd smart-video-learning
```

#### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env with your configuration
nano .env
```

**Backend .env Configuration:**

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/smart_video_learning

# JWT Secret (change in production)
JWT_SECRET=your_super_secret_jwt_key_change_in_production

# OpenAI API Configuration
OPENAI_API_KEY=sk-your-openai-api-key-here

# Frontend URL (for CORS)
CLIENT_URL=http://localhost:3000
```

#### 3. Frontend Setup

```bash
# Navigate to frontend directory (from project root)
cd frontend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env with your configuration
nano .env
```

**Frontend .env Configuration:**

```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_NAME=Smart Video Learning
```

#### 4. Database Setup

**Option A: Local MongoDB**

```bash
# Start MongoDB service
sudo systemctl start mongod

# Or using MongoDB Community Edition
mongod --dbpath /path/to/your/data/directory
```

**Option B: MongoDB Atlas (Cloud)**

1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Get connection string
4. Update `MONGODB_URI` in backend `.env`

### Running the Application

#### Development Mode

**Terminal 1 - Backend:**

```bash
cd backend
npm run dev
```

Backend will run on `http://localhost:5000`

**Terminal 2 - Frontend:**

```bash
cd frontend
npm start
```

Frontend will run on `http://localhost:3000`

#### Production Mode

**Backend:**

```bash
cd backend
npm start
```

**Frontend:**

```bash
cd frontend
npm run build
# Serve the build folder using a static server
```

## 📖 API Documentation

### Authentication Endpoints

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "password123"
}
```

#### Login User
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

#### Get Profile
```http
GET /api/auth/profile
Authorization: Bearer <token>
```

### Video Endpoints

#### Process Video
```http
POST /api/videos/process
Authorization: Bearer <token>
Content-Type: application/json

{
  "videoUrl": "https://www.youtube.com/watch?v=VIDEO_ID"
}
```

#### Get Video Details
```http
GET /api/videos/:videoId
Authorization: Bearer <token>
```

#### Get Learning History
```http
GET /api/videos?page=1&limit=10
Authorization: Bearer <token>
```

#### Delete Video
```http
DELETE /api/videos/:videoId
Authorization: Bearer <token>
```

### Quiz Endpoints

#### Get Quiz
```http
GET /api/quiz/video/:videoId
Authorization: Bearer <token>
```

#### Submit Quiz
```http
POST /api/quiz/:quizId/submit
Authorization: Bearer <token>
Content-Type: application/json

{
  "answers": [
    {
      "questionIndex": 0,
      "selectedAnswer": 2
    }
  ],
  "timeTaken": 120
}
```

### User Endpoints

#### Get Dashboard Statistics
```http
GET /api/user/dashboard
Authorization: Bearer <token>
```

#### Get Learning Progress
```http
GET /api/user/progress?period=7d
Authorization: Bearer <token>
```

## 🎨 UI/UX Features

### Theme System
- **Light Mode**: Default professional theme
- **Dark Mode**: Eye-friendly dark theme
- **Persistent**: Theme preference saved in localStorage
- **Smooth Transitions**: CSS transitions for theme switching

### Responsive Design
- **Mobile First**: Optimized for mobile devices
- **Breakpoints**:
  - Mobile: < 640px
  - Tablet: 640px - 1024px
  - Desktop: > 1024px

### Accessibility
- **Keyboard Navigation**: Full keyboard support
- **ARIA Labels**: Proper ARIA attributes
- **Color Contrast**: WCAG AA compliant
- **Focus States**: Clear focus indicators
- **Screen Reader**: Compatible with screen readers

## 🔧 Configuration

### OpenAI Settings

The application uses GPT-4 for content generation. You can modify the AI parameters in `backend/services/aiService.js`:

```javascript
{
  model: 'gpt-4',
  temperature: 0.3,  // Lower = more focused, Higher = more creative
  max_tokens: 1000   // Adjust based on needs
}
```

### Transcript Processing

Customize transcript cleaning in `backend/services/transcriptService.js`:

```javascript
// Add/remove filler words
const fillers = ['um', 'uh', 'like', 'you know'];
```

## 🧪 Testing

### Backend Testing

```bash
cd backend
npm test
```

### Frontend Testing

```bash
cd frontend
npm test
```

## 🐛 Troubleshooting

### Common Issues

**1. MongoDB Connection Error**
```
Error: MongoDB Connection Error
```
**Solution**: 
- Check if MongoDB is running
- Verify `MONGODB_URI` in `.env`
- Check network connectivity for MongoDB Atlas

**2. OpenAI API Error**
```
Error: Failed to generate summary
```
**Solution**:
- Verify `OPENAI_API_KEY` in `.env`
- Check OpenAI account has credits
- Ensure internet connectivity

**3. Transcript Extraction Fails**
```
Error: No transcript available
```
**Solution**:
- Video must have captions/subtitles
- Try a different video
- Check if video is publicly accessible

**4. CORS Errors**
```
Access-Control-Allow-Origin error
```
**Solution**:
- Verify `CLIENT_URL` in backend `.env`
- Check if both servers are running
- Clear browser cache

## 📊 Performance Optimization

### Backend
- **Caching**: Implement Redis for transcript caching
- **Pagination**: Efficient query pagination
- **Indexing**: MongoDB indexes on frequently queried fields
- **Async Processing**: Background jobs for long-running tasks

### Frontend
- **Code Splitting**: Lazy loading for routes
- **Image Optimization**: Compressed assets
- **Memoization**: React.memo for expensive components
- **Bundle Size**: Minimize dependencies

## 🔐 Security Best Practices

- **Environment Variables**: Never commit `.env` files
- **JWT Secrets**: Use strong, random secrets in production
- **HTTPS**: Use HTTPS in production
- **Input Validation**: All inputs validated on backend
- **Rate Limiting**: Implement rate limiting for APIs
- **CORS**: Configure proper CORS origins
- **Password Hashing**: bcrypt with salt rounds

## 📦 Deployment

### Backend Deployment (Heroku)

```bash
# Login to Heroku
heroku login

# Create app
heroku create smart-video-learning-api

# Set environment variables
heroku config:set MONGODB_URI=your_mongodb_uri
heroku config:set JWT_SECRET=your_jwt_secret
heroku config:set OPENAI_API_KEY=your_openai_key

# Deploy
git push heroku main
```

### Frontend Deployment (Vercel)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
cd frontend
vercel --prod

# Set environment variables in Vercel dashboard
```

### Database Deployment (MongoDB Atlas)

1. Create cluster on MongoDB Atlas
2. Configure network access
3. Create database user
4. Get connection string
5. Update `MONGODB_URI` in backend

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- Email: your.email@example.com

## 🙏 Acknowledgments

- OpenAI for GPT-4 API
- YouTube for transcript availability
- React community for amazing tools
- MongoDB for flexible database solution

## 📞 Support

For support, email support@smartvideolearning.com or open an issue on GitHub.

## 🗺️ Roadmap

- [ ] Add support for multiple languages
- [ ] Implement video bookmarking
- [ ] Add collaborative learning features
- [ ] Export summaries as PDF
- [ ] Mobile app (React Native)
- [ ] Real-time collaboration
- [ ] Advanced analytics dashboard
- [ ] Integration with learning management systems

---

**Made with ❤️ for education**
