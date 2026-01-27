# Smart Video Learning Frontend

React.js frontend application for AI-powered video learning platform.

## Installation

```bash
npm install
```

## Configuration

Copy `.env.example` to `.env`:

```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_NAME=Smart Video Learning
```

## Running

Development:
```bash
npm start
```

Build for production:
```bash
npm run build
```

## Features

- Modern, responsive UI/UX
- Light/Dark mode support
- YouTube video processing
- AI-generated summaries and quizzes
- Learning history tracking
- Progress analytics

## Technology Stack

- React 18.2
- React Router DOM
- Axios
- React Toastify
- React Icons
- Context API for state management

## Project Structure

```
src/
├── components/      # Reusable components
├── context/         # Context providers
├── pages/          # Page components
├── services/       # API services
└── utils/          # Helper functions
```
