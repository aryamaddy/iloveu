import React, { useState, useEffect, useRef } from 'react';
import './AskHerOut.css';

const AskHerOut = () => {
  const [stage, setStage] = useState(0);
  const [hoverHello, setHoverHello] = useState(false);
  const [hoverNo, setHoverNo] = useState(false);
  const [yesPosition, setYesPosition] = useState({ top: 'auto', left: 'auto', position: 'relative' as any });
  const [circles, setCircles] = useState<{id: number, left: number, width: number, duration: number}[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Generate magic circles periodically
    const interval = setInterval(() => {
      if (stage === 1 || stage === 2) {
        setCircles(prev => {
          const newCircle = {
            id: Date.now(),
            left: Math.random() * 100, // percentage based
            width: Math.random() * 12 * 2 + 10,
            duration: Math.random() * 3 + 2
          };
          return [...prev.slice(-15), newCircle]; // keep max 15
        });
      }
    }, 400);
    return () => clearInterval(interval);
  }, [stage]);

  const handleYesHover = () => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    
    // Bounds check
    const maxX = container.clientWidth - 150;
    const maxY = container.clientHeight - 80;
    
    const randomX = Math.max(0, Math.floor(Math.random() * maxX));
    const randomY = Math.max(0, Math.floor(Math.random() * maxY));

    setYesPosition({
      position: 'absolute',
      left: `${randomX}px`,
      top: `${randomY}px`
    });
  };

  const getStageClass = () => {
    switch (stage) {
      case 0: return `ask-bg-stage-0 ${hoverHello ? 'hovered' : ''}`;
      case 1: return 'ask-bg-stage-1';
      case 2: return `ask-bg-stage-2 ${hoverNo ? 'hovered' : ''}`;
      case 3: return 'ask-bg-stage-3';
      default: return '';
    }
  };

  const renderStage = () => {
    switch (stage) {
      case 0:
        return (
          <>
            <img 
              src={hoverHello ? "/ask-assets/hi.gif" : "/ask-assets/sad.gif"} 
              alt="Reaction" 
              className="w-80 h-auto object-cover rounded-xl mb-12 shadow-2xl transition-all duration-300 pointer-events-none"
            />
            <button 
              className="px-8 py-4 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-2xl font-bold shadow-lg transition-all duration-300 btn-hover-reveal"
              onMouseEnter={() => setHoverHello(true)}
              onMouseLeave={() => setHoverHello(false)}
              onClick={() => setStage(1)}
            >
              <span className="ask-btn-text">Hello 😔</span>
              <span className="ask-btn-hover-text">Hiiiii Cutieee 💖</span>
            </button>
          </>
        );
      
      case 1:
        return (
          <>
            <h2 className="text-4xl text-white font-bold mb-4 z-10 text-center">
              Omigod! Omigod! You are... <br/>
              <span className="text-xl text-red-400 block mt-2">(Do not click on the button!!!)</span>
            </h2>
            <div className="z-10 mt-8 mb-16 text-center space-y-6">
              <div className="chori-text"><span className="beauti">BEAUTIFUL!!!!!!</span></div>
              <div className="chori-text" style={{animationDelay: "1s"}}><span className="gorg">GORGEOUS!!!!!!</span></div>
              <div className="chori-text" style={{animationDelay: "2s"}}><span className="wow">WOWWWW!!!!!!</span></div>
            </div>
            <button 
              className="px-8 py-4 bg-yellow-500 hover:bg-yellow-600 text-black border-2 border-red-500 rounded-lg text-xl font-bold shadow-lg z-10 transition-transform hover:scale-105"
              onClick={() => { setStage(2); setYesPosition({ top: 'auto', left: 'auto', position: 'relative' }); }}
            >
              Click at Your Own Risk
            </button>
          </>
        );

      case 2:
        return (
          <>
            <h1 className="text-3xl font-bold text-white mb-8 drop-shadow-md z-10">
              Click on <span className="text-red-500 text-4xl mx-2 font-serif">YES,</span> if you really don't <span className="text-red-500 text-4xl mx-2 font-serif">LOVE</span> me.
            </h1>
            
            <img 
              src={hoverNo ? "/ask-assets/attitude.gif" : "/ask-assets/angry.gif"} 
              alt="Reaction" 
              className="h-80 w-auto object-cover rounded-2xl mb-12 shadow-2xl transition-all duration-300 border-2 border-white/10 z-10 pointer-events-none"
            />
            
            <div className="flex gap-16 items-center justify-center w-full relative h-[100px] z-20">
              <button 
                className="px-8 py-4 btn-yes"
                style={{ ...yesPosition }}
                onMouseEnter={handleYesHover}
                onClick={handleYesHover}
              >
                Yes 💔
              </button>
              
              <button 
                className="px-10 py-4 btn-no btn-hover-reveal"
                onMouseEnter={() => setHoverNo(true)}
                onMouseLeave={() => setHoverNo(false)}
                onClick={() => setStage(3)}
              >
                <span className="ask-btn-text">No 😔</span>
                <span className="ask-btn-hover-text">Uff, You Girls 💖~`</span>
              </button>
            </div>
          </>
        );

      case 3:
        return (
          <>
            <h1 className="text-6xl font-bold text-pink-500 mb-8 drop-shadow-lg font-serif z-10 animate-bounce text-center leading-tight">
              I love youuuuu <br/> tooooooo!
            </h1>
            <img 
              src="/ask-assets/kiss.gif" 
              alt="Love" 
              className="w-80 h-80 object-cover rounded-full shadow-[0_0_50px_rgba(236,72,153,0.6)] border-4 border-pink-300 z-10"
            />
          </>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto my-12" id="ask-her-out-section">
      <div 
        ref={containerRef}
        className={`ask-her-out-container ${getStageClass()}`}
      >
        {circles.map(circle => (
          <div 
            key={circle.id} 
            className="magic-circle" 
            style={{ 
              left: `${circle.left}%`, 
              width: `${circle.width}px`, 
              animationDuration: `${circle.duration}s` 
            }} 
          />
        ))}
        {renderStage()}
      </div>
    </div>
  );
};

export default AskHerOut;
