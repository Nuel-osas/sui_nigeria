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
  const [hasMarkedAttendance, setHasMarkedAttendance] = useState(false);

  // Set the event date to 10:00 AM
  const eventDate = new Date('2024-11-16T10:00:00').getTime();

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
        // Event has started
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
  }, []);

  const handleAttendanceClick = () => {
    setShowCareerPath(true);
    setHasMarkedAttendance(true);
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
    <div className="attendance-container">
      {/* Navbar stays at top */}
      <nav className="attendance-nav">
        <div className="nav-left">
          <h1>Sui Nigeria</h1>
        </div>
        <div className="nav-right">
          <button className="theme-toggle" onClick={toggleTheme}>
            {isDarkMode ? '☀️' : '🌙'}
          </button>
        </div>
      </nav>

      {/* Main content in ordered boxes */}
      <div className="attendance-content">
        {/* Welcome Box */}
        <div className="welcome-box">
          <h2>Welcome, {userName}</h2>
          <button className="sign-out-btn" onClick={handleSignOut}>
            <span>Sign Out</span>
          </button>
        </div>

        {/* Countdown Box */}
        <div className="countdown-box">
          <h2>Next Session Starts In</h2>
          <div className="countdown">
            <div className="countdown-item">
              <div className="countdown-value">{timeLeft.days}</div>
              <div className="countdown-label">Days</div>
            </div>
            <div className="countdown-item">
              <div className="countdown-value">{timeLeft.hours}</div>
              <div className="countdown-label">Hours</div>
            </div>
            <div className="countdown-item">
              <div className="countdown-value">{timeLeft.minutes}</div>
              <div className="countdown-label">Minutes</div>
            </div>
            <div className="countdown-item">
              <div className="countdown-value">{timeLeft.seconds}</div>
              <div className="countdown-label">Seconds</div>
            </div>
          </div>
        </div>

        {/* Attendance Box */}
        <div className="attendance-box">
          <h2>Mark Your Attendance</h2>
          <button 
            className={`attendance-button ${hasMarkedAttendance ? 'success' : ''}`}
            onClick={handleAttendanceClick}
            disabled={hasMarkedAttendance}
          >
            {hasMarkedAttendance ? 'Attendance Marked ✓' : 'Mark Attendance'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Attendance; a
