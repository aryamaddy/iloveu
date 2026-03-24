
import { useState, useEffect } from 'react';
import IntroScreen from '../components/IntroScreen';
import HeartAnimation from '../components/HeartAnimation';
import FloatingText from '../components/FloatingText';
import LoveLetter from '../components/LoveLetter';
import PhotoSlider from '../components/PhotoSlider';
import SurpriseButton from '../components/SurpriseButton';
import ParticleHeart from '../components/ParticleHeart';
import SurpriseModal from '../components/SurpriseModal';
import FlowerPetals from '../components/FlowerPetals';
import SweetQuotes from '../components/SweetQuotes';
import AnimatedImageGrid from '../components/AnimatedImageGrid';
import AskHerOut from '../components/AskHerOut';

const Index = () => {
  const [showIntro, setShowIntro] = useState(true);
  const [showSurprise, setShowSurprise] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [musicPlaying, setMusicPlaying] = useState(false);

  useEffect(() => {
    // Auto-play background music
    const audio = new Audio();
    audio.src = "https://www.soundjay.com/misc/sounds/romantic-music.mp3";
    audio.loop = true;
    audio.volume = 0.3;
    
    // Try to play music (modern browsers may block autoplay)
    const playMusic = async () => {
      try {
        await audio.play();
        setMusicPlaying(true);
      } catch (error) {
        console.log("Autoplay blocked, user interaction required");
      }
    };
    
    playMusic();

    return () => {
      audio.pause();
    };
  }, []);

  const handleMusicToggle = () => {
    const audio = document.querySelector('audio');
    if (audio) {
      if (musicPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
      setMusicPlaying(!musicPlaying);
    }
  };

  const handleEnterSite = () => {
    setShowIntro(false);
  };

  const handleSurpriseClick = () => {
    setShowSurprise(true);
    setShowModal(true);
  };

  if (showIntro) {
    return <IntroScreen onEnter={handleEnterSite} />;
  }

  return (
    <div className="min-h-screen relative overflow-hidden romantic-bg">
      {/* Flower Petals */}
      <FlowerPetals />
      
      {/* Animated Background Elements */}
      <div className="floating-hearts">
        {[...Array(15)].map((_, i) => (
          <div key={i} className={`heart heart-${i + 1}`}>💖</div>
        ))}
      </div>
      
      <div className="twinkling-stars">
        {[...Array(20)].map((_, i) => (
          <div key={i} className={`star star-${i + 1}`}>✨</div>
        ))}
      </div>

      {/* Sweet Quotes */}
      <SweetQuotes />

      {/* Music Control */}
      <button 
        onClick={handleMusicToggle}
        className="fixed top-4 right-4 z-50 bg-pink-500/20 backdrop-blur-sm rounded-full p-3 text-white hover:bg-pink-500/30 transition-all duration-300"
      >
        {musicPlaying ? '🎵' : '🔇'}
      </button>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 page-enter">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <HeartAnimation />
          <FloatingText />
        </div>

        {/* Love Letter Section */}
        <div className="w-full max-w-4xl mb-12">
          <LoveLetter />
        </div>

        {/* Photo Slider Section */}
        <div className="w-full max-w-4xl mb-12">
          <PhotoSlider />
        </div>

        {/* Animated Image Grid Section */}
        <div className="w-full max-w-6xl mb-12">
          <AnimatedImageGrid />
        </div>

        {/* Surprise Button */}
        <div className="mb-12">
          <SurpriseButton onReveal={handleSurpriseClick} />
        </div>

        {/* Surprise Animation */}
        {showSurprise && !showModal && <ParticleHeart />}
      </div>

      {/* Surprise Modal */}
      <SurpriseModal isOpen={showModal} onClose={() => setShowModal(false)} />

      {/* Ask Her Out Section */}
      <AskHerOut />

      {/* Audio element for background music */}
      <audio loop>
        <source src="https://www.soundjay.com/misc/sounds/romantic-music.mp3" type="audio/mpeg" />
      </audio>
    </div>
  );
};

export default Index;
