import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../../components/common/Navbar';
import Summary from '../../components/Summary/Summary';
import Quiz from '../../components/Quiz/Quiz';
import { videoService } from '../../services/api';
import { toast } from 'react-toastify';
import { FiArrowLeft, FiExternalLink } from 'react-icons/fi';
import './VideoDetail.css';

const VideoDetail = () => {
  const { videoId } = useParams();
  const navigate = useNavigate();
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('summary');

  useEffect(() => {
    fetchVideoDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoId]);

  const fetchVideoDetails = async () => {
    try {
      const response = await videoService.getVideoById(videoId);
      setVideo(response.data.video);
    } catch (error) {
      toast.error('Failed to load video details');
      navigate('/dashboard');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="video-detail-page">
        <Navbar />
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading video details...</p>
        </div>
      </div>
    );
  }

  if (!video) {
    return null;
  }

  return (
    <div className="video-detail-page">
      <Navbar />
      
      <div className="video-detail-container">
        <button onClick={() => navigate('/dashboard')} className="back-btn">
          <FiArrowLeft />
          <span>Back to Dashboard</span>
        </button>

        <div className="video-header">
          <h1>Learning Content</h1>
          <a
            href={video.videoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="video-link"
          >
            <FiExternalLink />
            <span>Watch on YouTube</span>
          </a>
        </div>

        <div className="tabs-container">
          <button
            className={`tab-btn ${activeTab === 'summary' ? 'active' : ''}`}
            onClick={() => setActiveTab('summary')}
          >
            Summary & Key Points
          </button>
          <button
            className={`tab-btn ${activeTab === 'quiz' ? 'active' : ''}`}
            onClick={() => setActiveTab('quiz')}
          >
            Knowledge Quiz
          </button>
        </div>

        <div className="tab-content">
          {activeTab === 'summary' && (
            <Summary
              summary={video.summary}
              keyPoints={video.keyPoints}
            />
          )}

          {activeTab === 'quiz' && video.quiz && (
            <Quiz videoId={videoId} />
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoDetail;
