import { useState } from 'react';
import { FaMoon, FaSun, FaCalendarAlt, FaClock, FaMapMarkerAlt, FaBars, FaTimes } from 'react-icons/fa';
import Register from '../Auth/Register';
import Login from '../Auth/Login';
import Carousel from '../Carousel/Carousel';
import { useTheme } from '../../context/ThemeContext';
import joshuaSpeaking from '../../asset/joshua-speaking.jpg';
import suiOnCampus from '../../asset/sui-on-campus.jpg';
import nigeriaLogo from '../../asset/nigeria-logo.png';
import './Home.css';

function Home() {
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme();

  const carouselImages = [
    joshuaSpeaking,
    suiOnCampus
  ];

  const handleAuthSuccess = () => {
    setIsRegisterOpen(false);
    setIsLoginOpen(false);
  };

  const switchToLogin = () => {
    setIsRegisterOpen(false);
    setIsLoginOpen(true);
  };

  const switchToRegister = () => {
    setIsLoginOpen(false);
    setIsRegisterOpen(true);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="home-container">
      <nav className="navbar">
        <div className="logo">
          <img src={nigeriaLogo} alt="Nigeria Logo" className="nigeria-logo" />
          <span className="logo-text">Sui Nigeria</span>
        </div>
        
        <button className="mobile-menu-button" onClick={toggleMobileMenu}>
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>

        <div className={`nav-links ${isMobileMenuOpen ? 'active' : ''}`}>
          <a href="#about" onClick={() => setIsMobileMenuOpen(false)}>About</a>
          <a href="#speakers" onClick={() => setIsMobileMenuOpen(false)}>Speakers</a>
          <button className="theme-toggle" onClick={toggleTheme}>
            {isDarkMode ? <FaSun /> : <FaMoon />}
          </button>
          <button 
            className="rsvp-button" 
            onClick={() => {
              setIsRegisterOpen(true);
              setIsMobileMenuOpen(false);
            }}
          >
            RSVP Now
          </button>
        </div>
      </nav>

      <div className="hero-section">
        <div className="hero-content">
          <h1>
            <span className="highlight">Sui Nigeria</span>
            <br />
            Meetup 2024
          </h1>
          <p className="subtitle">
            Join us for an exciting journey into the future of blockchain
            technology with Sui Network
          </p>
          
          <div className="cta-buttons">
            <button 
              className="register-button" 
              onClick={() => setIsRegisterOpen(true)}
            >
              Register Now
            </button>
          </div>

          <div className="event-details">
            <div className="detail-card">
              <FaCalendarAlt className="detail-card-icon" />
              <span className="label">Date</span>
              <span className="value">November 16, 2024</span>
            </div>
            
            <div className="detail-card">
              <FaClock className="detail-card-icon" />
              <span className="label">Time</span>
              <span className="value">10:00 AM WAT</span>
            </div>
            
            <div className="detail-card">
              <FaMapMarkerAlt className="detail-card-icon" />
              <span className="label">Location</span>
              <span className="value">Doctor's house, Benin city, Nigeria</span>
            </div>
          </div>
        </div>

        <div className="hero-image">
          <Carousel images={carouselImages} />
        </div>
      </div>

      {/* Register Popup */}
      {isRegisterOpen && (
        <div className="popup-overlay" onClick={() => setIsRegisterOpen(false)}>
          <div className="popup-content" onClick={e => e.stopPropagation()}>
            <button 
              className="close-btn" 
              onClick={() => setIsRegisterOpen(false)}
            >
              ×
            </button>
            <Register 
              onRegisterSuccess={handleAuthSuccess} 
              switchToLogin={switchToLogin}
            />
          </div>
        </div>
      )}

      {/* Login Popup */}
      {isLoginOpen && (
        <div className="popup-overlay" onClick={() => setIsLoginOpen(false)}>
          <div className="popup-content" onClick={e => e.stopPropagation()}>
            <button 
              className="close-btn" 
              onClick={() => setIsLoginOpen(false)}
            >
              ×
            </button>
            <Login 
              onLoginSuccess={handleAuthSuccess}
              switchToRegister={switchToRegister}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Home; 