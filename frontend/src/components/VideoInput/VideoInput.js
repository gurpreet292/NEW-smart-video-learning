import React, { useState } from 'react';
import { FiLink, FiLoader } from 'react-icons/fi';
import { isValidYouTubeUrl } from '../../utils/helpers';
import './VideoInput.css';

const VideoInput = ({ onSubmit, loading }) => {
  const [videoUrl, setVideoUrl] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!videoUrl.trim()) {
      setError('Please enter a YouTube URL');
      return;
    }

    if (!isValidYouTubeUrl(videoUrl)) {
      setError('Please enter a valid YouTube URL');
      return;
    }

    onSubmit(videoUrl);
  };

  return (
    <div className="video-input-container">
      <div className="video-input-header">
        <h2>Transform YouTube Videos into Learning</h2>
        <p>Enter a YouTube URL to generate AI-powered summaries, key points, and quizzes</p>
        
        <div style={{ 
          background: '#fff3e0', 
          padding: '16px 20px', 
          borderRadius: '8px', 
          marginTop: '12px',
          fontSize: '14px',
          color: '#e65100',
          border: '1px solid #ff9800',
          lineHeight: '1.7'
        }}>
          <strong>⚠️ Important:</strong> Automated transcript extraction has limitations
          <div style={{marginTop: '10px', fontSize: '13px'}}>
            • Try entering a YouTube URL below<br/>
            • Some videos may work, but many won't due to YouTube restrictions<br/>
            • Best results with educational videos that have official captions
          </div>
          <div style={{marginTop: '8px', fontSize: '12px', color: '#ef6c00'}}>
            💡 <em>Tip: Works best with videos from educational channels like Khan Academy, TED, Crash Course</em>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="video-input-form">
        <div className="input-group">
          <FiLink className="input-icon" />
          <input
            type="text"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            placeholder="https://www.youtube.com/watch?v=..."
            className={`video-input ${error ? 'error' : ''}`}
            disabled={loading}
          />
        </div>

        {error && <p className="error-message">{error}</p>}

        <button
          type="submit"
          className="submit-btn"
          disabled={loading}
        >
          {loading ? (
            <>
              <FiLoader className="spin" />
              <span>Processing Video...</span>
            </>
          ) : (
            <span>Generate Learning Content</span>
          )}
        </button>
      </form>

      <div className="video-input-info">
        <div className="info-item">
          <div className="info-icon">✨</div>
          <div className="info-text">
            <h4>AI Summary</h4>
            <p>Concise, exam-ready summary</p>
          </div>
        </div>

        <div className="info-item">
          <div className="info-icon">📝</div>
          <div className="info-text">
            <h4>Key Points</h4>
            <p>Essential learning takeaways</p>
          </div>
        </div>

        <div className="info-item">
          <div className="info-icon">🎯</div>
          <div className="info-text">
            <h4>Quiz</h4>
            <p>10 questions to test knowledge</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoInput;
