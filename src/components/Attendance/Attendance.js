import { useState, useEffect } from 'react';
import { auth, db } from '../../firebase/config';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { FaMoon, FaSun, FaSignOutAlt, FaMapMarkerAlt } from 'react-icons/fa';
import './Attendance.css';

function Attendance() {
  const navigate = useNavigate();
  const { isDarkMode, toggleTheme } = useTheme();
  const [userName, setUserName] = useState('');
  const [timeLeft, setTimeLeft] = useState({});
  const [showCareerPath, setShowCareerPath] = useState(false);

  // Event date - set this to your actual event date
  const eventDate = new Date('2024-11-16T01:00:00').getTime();

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      setUserName(user.displayName || user.email);
    }

    // Countdown Timer
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = eventDate - now;

      if (distance < 0) {
        // Countdown is finished
        clearInterval(timer);
        setTimeLeft({
          days: '00',
          hours: '00',
          minutes: '00',
          seconds: '00'
        });
        return;
      }

      // Calculate time units
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft({
        days: days.toString().padStart(2, '0'),
        hours: hours.toString().padStart(2, '0'),
        minutes: minutes.toString().padStart(2, '0'),
        seconds: seconds.toString().padStart(2, '0')
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [eventDate]);

  const handleAttendanceClick = () => {
    setShowCareerPath(true);
  };

  // Add career path options
  const careerPaths = [
    {
      id: 1,
      title: 'Software Development',
      description: 'Build applications and software solutions',
      icon: '💻'
    },
    {
      id: 2,
      title: 'UI/UX Design',
      description: 'Create beautiful and functional user interfaces',
      icon: '🎨'
    },
    {
      id: 3,
      title: 'Data Science',
      description: 'Analyze and interpret complex data sets',
      icon: '📊'
    },
    {
      id: 4,
      title: 'Cybersecurity',
      description: 'Protect systems and networks from threats',
      icon: '🔒'
    }
  ];

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div className={`attendance-container ${isDarkMode ? 'dark' : 'light'}`}>
      <nav className="attendance-nav">
        <div className="nav-left">
          <h1>Sui Nigeria Attendance</h1>
        </div>
        <div className="nav-right">
          <span className="user-name">Welcome, {userName}</span>
          <button className="theme-toggle" onClick={toggleTheme}>
            {isDarkMode ? <FaSun /> : <FaMoon />}
          </button>
          <button className="sign-out-btn" onClick={handleSignOut}>
            <FaSignOutAlt /> Sign Out
          </button>
        </div>
      </nav>

      <main className="attendance-content">
        <div className="attendance-card">
          <h2>Event Countdown</h2>
          <div className="countdown">
            {eventDate - new Date().getTime() < 0 ? (
              <div className="countdown-finished">Event has started!</div>
            ) : (
              <>
                <div className="countdown-item">
                  <div className="countdown-value">{timeLeft.days}</div>
                  <div className="countdown-label">Days</div>
                </div>
                <div className="countdown-separator">:</div>
                <div className="countdown-item">
                  <div className="countdown-value">{timeLeft.hours}</div>
                  <div className="countdown-label">Hours</div>
                </div>
                <div className="countdown-separator">:</div>
                <div className="countdown-item">
                  <div className="countdown-value">{timeLeft.minutes}</div>
                  <div className="countdown-label">Minutes</div>
                </div>
                <div className="countdown-separator">:</div>
                <div className="countdown-item">
                  <div className="countdown-value">{timeLeft.seconds}</div>
                  <div className="countdown-label">Seconds</div>
                </div>
              </>
            )}
          </div>

          <div className="status-info">
            <p>Event: Sui Nigeria Meetup 2024</p>
            <p>Date: November 16, 2024 1:00 AM</p>
            <p>Status: Registered</p>
          </div>

          <button 
            className="attendance-button" 
            onClick={handleAttendanceClick}
          >
            Mark Attendance
          </button>

          {showCareerPath && (
            <div className="career-path-overlay">
              <div className="career-path-modal">
                <h2>Select Your Career Path</h2>
                <div className="career-grid">
                  {careerPaths.map(path => (
                    <div key={path.id} className="career-card">
                      <div className="career-icon">{path.icon}</div>
                      <h3>{path.title}</h3>
                      <p>{path.description}</p>
                    </div>
                  ))}
                </div>
                <button 
                  className="close-button"
                  onClick={() => setShowCareerPath(false)}
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default Attendance; 