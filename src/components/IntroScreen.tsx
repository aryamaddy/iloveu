import React, { useState, useEffect } from 'react';

interface IntroScreenProps {
  onEnter: () => void;
}

const IntroScreen: React.FC<IntroScreenProps> = ({ onEnter }) => {
  const [balloons, setBalloons] = useState<Array<{ id: number; delay: number; left: number }>>([]);

  useEffect(() => {
    // Create heart with random positions and delays
    const balloonsData = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      delay: Math.random() * 3,
      left: Math.random() * 90 + 5
    }));
    setBalloons(balloonsData);
  }, []);

  return (
    <div className="intro-screen">
      {/* Flying heart */}
      <div className="balloons-container">
        {balloons.map((balloon) => (
          <div
            key={balloon.id}
            className="balloon"
            style={{
              left: `${balloon.left}%`,
              animationDelay: `${balloon.delay}s`
            }}
          >
            💖
          </div>
        ))}
      </div>

      {/* Intro Content */}
      <div className="intro-content">
        <h1 className="intro-title">
          Hello Cutie
          <br />
          <span className="intro-subtitle">There is something special for you</span>
        </h1>
        
        <button 
          onClick={onEnter}
          className="enter-button"
        >
          <span className="button-text">Click to Begin</span>
          <div className="button-glow-pulse"></div>
        </button>
      </div>

      {/* Magical Sparkles */}
      <div className="intro-sparkles">
        {[...Array(8)].map((_, i) => (
          <div key={i} className={`intro-sparkle sparkle-${i + 1}`}>✨</div>
        ))}
      </div>
    </div>
  );
};

export default IntroScreen;