import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FiMail, FiLock, FiUser } from 'react-icons/fi';
import './Auth.css';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    setLoading(true);
    const result = await register(formData.username, formData.email, formData.password);
    setLoading(false);

    if (result.success) {
      navigate('/dashboard');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1>Create Account</h1>
          <p>Start your learning journey with AI-powered tools</p>
        </div>

        <div style={{ 
          background: '#e3f2fd', 
          padding: '12px 16px', 
          borderRadius: '8px', 
          marginBottom: '20px',
          fontSize: '14px',
          color: '#1565c0',
          border: '1px solid #90caf9'
        }}>
          <strong>Requirements:</strong>
          <ul style={{ margin: '8px 0 0 0', paddingLeft: '20px' }}>
            <li>Username: 3-50 characters (letters, numbers, underscores only)</li>
            <li>Password: At least 6 characters with at least one number</li>
          </ul>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="input-group">
            <FiUser className="input-icon" />
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Username (letters, numbers, underscores only)"
              required
              minLength={3}
              maxLength={50}
              pattern="[a-zA-Z0-9_]+"
              title="Username can only contain letters, numbers, and underscores (3-50 characters)"
            />
          </div>

          <div className="input-group">
            <FiMail className="input-icon" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              required
            />
          </div>

          <div className="input-group">
            <FiLock className="input-icon" />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password (min 6 chars, must include a number)"
              required
              minLength={6}
              pattern=".*\d.*"
              title="Password must be at least 6 characters and contain at least one number"
            />
          </div>

          <div className="input-group">
            <FiLock className="input-icon" />
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
              required
              minLength={6}
            />
          </div>

          <button type="submit" className="auth-btn" disabled={loading}>
            {loading ? 'Creating Account...' : 'Register'}
          </button>
        </form>

        <div className="auth-footer">
          Already have an account?{' '}
          <a href="/login" className="auth-link">
            Login here
          </a>
        </div>
      </div>
    </div>
  );
};

export default Register;
