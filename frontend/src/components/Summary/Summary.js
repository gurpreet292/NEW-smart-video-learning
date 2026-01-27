import React from 'react';
import { FiFileText, FiCheckCircle } from 'react-icons/fi';
import './Summary.css';

const Summary = ({ summary, keyPoints }) => {
  return (
    <div className="summary-container">
      <div className="summary-section">
        <div className="section-header">
          <FiFileText className="section-icon" />
          <h3>Video Summary</h3>
        </div>
        <div className="summary-content">
          <p>{summary}</p>
        </div>
      </div>

      {keyPoints && keyPoints.length > 0 && (
        <div className="key-points-section">
          <div className="section-header">
            <FiCheckCircle className="section-icon" />
            <h3>Key Learning Points</h3>
          </div>
          <div className="key-points-grid">
            {keyPoints.map((item, index) => (
              <div key={index} className="key-point-card">
                <div className="point-number">{index + 1}</div>
                <p className="point-text">{item.point}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Summary;
