import React, { useState } from 'react';
import { FiLink, FiLoader, FiFileText } from 'react-icons/fi';
import { isValidYouTubeUrl } from '../../utils/helpers';
import './VideoInput.css';

const VideoInput = ({ onSubmit, loading }) => {
  const [inputMode, setInputMode] = useState('url'); // 'url' or 'manual'
  const [videoUrl, setVideoUrl] = useState('');
  const [title, setTitle] = useState('');
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (inputMode === 'url') {
      if (!videoUrl.trim()) {
        setError('Please enter a YouTube URL');
        return;
      }

      if (!isValidYouTubeUrl(videoUrl)) {
        setError('Please enter a valid YouTube URL');
        return;
      }

      onSubmit({ mode: 'url', videoUrl });
    } else {
      if (!title.trim()) {
        setError('Please enter a video title');
        return;
      }

      if (!transcript.trim()) {
        setError('Please paste the transcript');
        return;
      }

      if (transcript.length < 50) {
        setError('Transcript is too short (minimum 50 characters)');
        return;
      }

      onSubmit({ mode: 'manual', title, transcript, videoUrl: videoUrl.trim() });
    }
  };

  return (
    <div className="video-input-container">
      <div className="video-input-header">
        <h2>Transform YouTube Videos into Learning</h2>
        <p>Generate AI-powered summaries, key points, and quizzes</p>
        
        {/* Input Mode Toggle */}
        <div className="input-mode-toggle">
          <button
            type="button"
            className={`toggle-btn ${inputMode === 'url' ? 'active' : ''}`}
            onClick={() => setInputMode('url')}
            disabled={loading}
          >
            <FiLink style={{ marginRight: '8px' }} />
            YouTube URL
          </button>
          <button
            type="button"
            className={`toggle-btn ${inputMode === 'manual' ? 'active' : ''}`}
            onClick={() => setInputMode('manual')}
            disabled={loading}
          >
            <FiFileText style={{ marginRight: '8px' }} />
            Manual Transcript
          </button>
        </div>

        {/* Warnings/Info Banners */}
        {inputMode === 'url' ? (
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
              💡 <em>If URL doesn't work, try <strong>Manual Transcript</strong> mode above!</em>
            </div>
          </div>
        ) : (
          <div style={{ 
            background: '#e8f4fd', 
            padding: '16px 20px', 
            borderRadius: '8px', 
            marginTop: '12px',
            fontSize: '14px',
            color: '#1565c0',
            border: '1px solid #2196f3',
            lineHeight: '1.7'
          }}>
            <strong>💡 How to use Manual Transcript:</strong>
            <div style={{marginTop: '10px', fontSize: '13px', color: '#424242'}}>
              1. Go to YouTube and open the video<br/>
              2. Click the "..." menu → "Show transcript"<br/>
              3. Copy the transcript text<br/>
              4. Paste it below along with the video title
            </div>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="video-input-form">
        {inputMode === 'url' ? (
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
        ) : (
          <>
            <div className="input-group">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Video Title (e.g., Introduction to Machine Learning)"
                className={`video-input ${error ? 'error' : ''}`}
                disabled={loading}
              />
            </div>

            <div className="input-group">
              <input
                type="text"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                placeholder="YouTube URL (optional)"
                className="video-input"
                disabled={loading}
              />
            </div>

            <div className="input-group">
              <textarea
                value={transcript}
                onChange={(e) => setTranscript(e.target.value)}
                placeholder="Paste the video transcript here... (minimum 50 characters)"
                className={`transcript-input ${error ? 'error' : ''}`}
                disabled={loading}
                rows="10"
              />
              <div style={{ 
                textAlign: 'right', 
                fontSize: '12px', 
                color: transcript.length >= 50 ? '#4caf50' : '#666',
                marginTop: '4px'
              }}>
                {transcript.length} characters {transcript.length >= 50 ? '✓' : '(min 50)'}
              </div>
            </div>
          </>
        )}

        {error && <p className="error-message">{error}</p>}

        <button
          type="submit"
          className="submit-btn"
          disabled={loading}
        >
          {loading ? (
            <>
              <FiLoader className="spin" />
              <span>Processing...</span>
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
