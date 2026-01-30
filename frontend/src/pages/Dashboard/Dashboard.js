import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/common/Navbar';
import VideoInput from '../../components/VideoInput/VideoInput';
import { videoService, userService } from '../../services/api';
import { toast } from 'react-toastify';
import { FiVideo, FiAward, FiTrendingUp, FiClock } from 'react-icons/fi';
import { formatDate } from '../../utils/helpers';
import './Dashboard.css';

const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const response = await userService.getDashboardStats();
      setStats(response.data);
    } catch (error) {
      console.error('Failed to fetch dashboard stats:', error);
    }
  };

  const handleVideoSubmit = async (data) => {
    setLoading(true);
    try {
      let response;
      
      if (data.mode === 'url') {
        response = await videoService.processVideo(data.videoUrl);
      } else {
        response = await videoService.processManualTranscript(data.title, data.transcript, data.videoUrl);
      }
      
      toast.success('Content processed successfully!');
      
      // Navigate to video detail page
      setTimeout(() => {
        navigate(`/video/${response.data.video.id}`);
      }, 1000);
    } catch (error) {
      const errorData = error.response?.data;
      let message = errorData?.message || 'Failed to process content';
      
      // Special handling for transcript errors
      if (errorData?.type === 'TRANSCRIPT_ERROR' || message.includes('transcript') || message.includes('caption')) {
        toast.error(
          'Unable to extract transcript from this video. Try using Manual Transcript mode instead!',
          { duration: 6000 }
        );
      } else if (message.includes('OpenAI') || message.includes('API Key')) {
        toast.error('OpenAI API key not configured. Please add your API key to backend/.env file.', { duration: 5000 });
      } else {
        toast.error(message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-page">
      <Navbar />
      
      <div className="dashboard-container">
        <div className="dashboard-header">
          <h1>AI-Powered Video Learning</h1>
          <p>Transform any YouTube video into structured learning content</p>
        </div>

        {stats && (
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon" style={{ backgroundColor: '#4f46e5' }}>
                <FiVideo />
              </div>
              <div className="stat-content">
                <h3>{stats.statistics.totalVideosProcessed}</h3>
                <p>Videos Processed</p>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon" style={{ backgroundColor: '#10b981' }}>
                <FiAward />
              </div>
              <div className="stat-content">
                <h3>{stats.statistics.totalQuizAttempts}</h3>
                <p>Quiz Attempts</p>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon" style={{ backgroundColor: '#f59e0b' }}>
                <FiTrendingUp />
              </div>
              <div className="stat-content">
                <h3>{stats.statistics.averageQuizScore}%</h3>
                <p>Average Score</p>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon" style={{ backgroundColor: '#3b82f6' }}>
                <FiClock />
              </div>
              <div className="stat-content">
                <h3>{stats.statistics.highestQuizScore}%</h3>
                <p>Best Score</p>
              </div>
            </div>
          </div>
        )}

        <VideoInput onSubmit={handleVideoSubmit} loading={loading} />

        {stats?.recentVideos && stats.recentVideos.length > 0 && (
          <div className="recent-videos-section">
            <h2>Recent Learning Sessions</h2>
            <div className="videos-grid">
              {stats.recentVideos.map((video) => (
                <div
                  key={video._id}
                  className="video-card"
                  onClick={() => navigate(`/video/${video._id}`)}
                >
                  <div className="video-card-header">
                    <FiVideo className="video-card-icon" />
                    <span className="video-date">{formatDate(video.createdAt)}</span>
                  </div>
                  <p className="video-summary">
                    {video.aiContent.summary.substring(0, 150)}...
                  </p>
                  <div className="video-card-footer">
                    <span className="key-points-count">
                      {video.aiContent.keyPoints.length} Key Points
                    </span>
                    <button className="view-btn">View Details</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
