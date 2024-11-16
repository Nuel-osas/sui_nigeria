import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../../firebase/config';
import { doc, setDoc } from 'firebase/firestore';
import backgroundImage from '../../asset/joshua-speaking.jpg';
import './CareerPath.css';

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

function CareerPath() {
  const navigate = useNavigate();
  const [selectedPath, setSelectedPath] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePathSelection = async (pathId) => {
    setSelectedPath(pathId);
  };

  const handleSubmit = async () => {
    if (!selectedPath) return;

    setIsSubmitting(true);
    try {
      const userId = auth.currentUser.uid;
      await setDoc(doc(db, 'careerChoices', userId), {
        userId,
        careerPathId: selectedPath,
        careerPathName: careerPaths.find(path => path.id === selectedPath).title,
        selectedAt: new Date().toISOString()
      });

      alert('Career path selection saved successfully!');
      // Navigate to a success page or dashboard
      // navigate('/success');
    } catch (error) {
      alert('Error saving career choice: ' + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="career-container" style={{
      background: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),
                  url(${backgroundImage}) center/cover no-repeat`
    }}>
      <div className="career-content">
        <h1>Choose Your Career Path</h1>
        <p className="subtitle">Select the path that best aligns with your interests and goals</p>
        
        <div className="career-grid">
          {careerPaths.map((path) => (
            <div
              key={path.id}
              className={`career-card ${selectedPath === path.id ? 'selected' : ''}`}
              onClick={() => handlePathSelection(path.id)}
            >
              <div className="career-icon">{path.icon}</div>
              <h3>{path.title}</h3>
              <p>{path.description}</p>
            </div>
          ))}
        </div>

        <button
          className="submit-button"
          onClick={handleSubmit}
          disabled={!selectedPath || isSubmitting}
        >
          {isSubmitting ? 'Saving...' : 'Confirm Selection'}
        </button>
      </div>
    </div>
  );
}

export default CareerPath; 