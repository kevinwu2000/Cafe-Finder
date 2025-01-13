import React from 'react';
import '../css/IndicatorStyle.css'; // Import the CSS file

const Home = ({ navigate }) => {
  return (
    <div className="home-container">
      <div className="content">
        {/* Navigation */}
        <nav className="nav">
          <button onClick={() => navigate('/register')} className="btn signup-btn">
            Sign Up
          </button>
          <button onClick={() => navigate('/login')} className="btn login-btn">
            Log In
          </button>
        </nav>

        {/* Title Section */}
        <div className="title-section">
          <h1 className="main-title animate-title">Cafe Finder</h1>
          <p className="subtitle">Discover and share your favorite cafe experiences</p>
          <div className="underline"></div>
        </div>

        {/* Features Section */}
        <div className="features">
          <div
            className="feature-card animate-feature"
            onClick={() => navigate('/register')}
          >
            <div className="feature-icon">🏪</div>
            <h3 className="feature-title">Add New Cafes</h3>
            <p className="feature-description">
              Share your discoveries by adding new cafes to our growing community.
            </p>
          </div>
          <div
            className="feature-card animate-feature"
            onClick={() => navigate('/register')}
          >
            <div className="feature-icon">⭐</div>
            <h3 className="feature-title">Custom Ratings</h3>
            <p className="feature-description">
              Rate cafes across multiple categories for detailed insights.
            </p>
          </div>
          <div
            className="feature-card animate-feature"
            onClick={() => navigate('/register')}
          >
            <div className="feature-icon">💭</div>
            <h3 className="feature-title">Detailed Reviews</h3>
            <p className="feature-description">
              Share your experiences with detailed comments and insights.
            </p>
          </div>
          <div
            className="feature-card animate-feature"
            onClick={() => navigate('/register')}
          >
            <div className="feature-icon">📐</div>
            <h3 className="feature-title">Floor Plans</h3>
            <p className="feature-description">
              Create and view 2D layouts to understand cafe spaces better.
            </p>
          </div>
        </div>

        {/* Call-to-action */}
        <div className="cta">
          <button onClick={() => navigate('/register')} className="btn join-btn">
            Join Our Community
          </button>
          <p className="cta-description">
            Sign up to unlock all features and start sharing your cafe experiences
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
