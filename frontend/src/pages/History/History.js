import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/common/Navbar';
import { videoService } from '../../services/api';
import { toast } from 'react-toastify';
import { formatDate } from '../../utils/helpers';
import { FiVideo, FiTrash2, FiClock } from 'react-icons/fi';
import './History.css';

const History = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState(null);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    fetchHistory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const fetchHistory = async () => {
    try {
      const response = await videoService.getLearningHistory(page, 10);
      setVideos(response.data.videos);
      setPagination(response.data.pagination);
    } catch (error) {
      toast.error('Failed to load history');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (videoId, e) => {
    e.stopPropagation();
    
    if (!window.confirm('Are you sure you want to delete this video?')) {
      return;
    }

    try {
      await videoService.deleteVideo(videoId);
      toast.success('Video deleted successfully');
      fetchHistory();
    } catch (error) {
      toast.error('Failed to delete video');
    }
  };

  if (loading) {
    return (
      <div className="history-page">
        <Navbar />
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading history...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="history-page">
      <Navbar />
      
      <div className="history-container">
        <div className="history-header">
          <h1>Learning History</h1>
          <p>Review your previously processed videos</p>
        </div>

        {videos.length === 0 ? (
          <div className="empty-state">
            <FiVideo className="empty-icon" />
            <h3>No videos yet</h3>
            <p>Start by processing a YouTube video on the dashboard</p>
            <button onClick={() => navigate('/dashboard')} className="cta-btn">
              Go to Dashboard
            </button>
          </div>
        ) : (
          <>
            <div className="history-grid">
              {videos.map((video) => (
                <div
                  key={video._id}
                  className="history-card"
                  onClick={() => navigate(`/video/${video._id}`)}
                >
                  <div className="history-card-header">
                    <div className="video-info">
                      <FiVideo className="video-icon" />
                      <div>
                        <div className="video-meta">
                          <FiClock className="meta-icon" />
                          <span>{formatDate(video.createdAt)}</span>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={(e) => handleDelete(video._id, e)}
                      className="delete-btn"
                      aria-label="Delete video"
                    >
                      <FiTrash2 />
                    </button>
                  </div>

                  <div className="history-card-content">
                    <p className="video-summary">
                      {video.aiContent.summary.substring(0, 200)}...
                    </p>

                    <div className="video-stats">
                      <span className="stat-item">
                        {video.aiContent.keyPoints.length} Key Points
                      </span>
                      {video.quiz && (
                        <span className="stat-item">
                          {video.quiz.totalQuestions} Questions
                        </span>
                      )}
                      {video.quiz?.attempts?.length > 0 && (
                        <span className="stat-item">
                          {video.quiz.attempts.length} Attempts
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {pagination && pagination.totalPages > 1 && (
              <div className="pagination">
                <button
                  onClick={() => setPage(page - 1)}
                  disabled={page === 1}
                  className="pagination-btn"
                >
                  Previous
                </button>
                <span className="pagination-info">
                  Page {pagination.currentPage} of {pagination.totalPages}
                </span>
                <button
                  onClick={() => setPage(page + 1)}
                  disabled={!pagination.hasMore}
                  className="pagination-btn"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default History;
