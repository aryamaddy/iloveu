import React, { useState, useEffect, useRef } from 'react';

const AskHerOut = () => {
  const [stage, setStage] = useState(0);
  const [hoverHello, setHoverHello] = useState(false);
  const [hoverNo, setHoverNo] = useState(false);
  const [yesPosition, setYesPosition] = useState({ top: 'auto', left: 'auto', position: 'relative' as any });
  
  const containerRef = useRef<HTMLDivElement>(null);

  // Stage 0: Index (Hello)
  // Stage 1: Omigod
  // Stage 2: Click on YES if you really don't love me
  // Stage 3: Success!

  const handleYesHover = () => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    
    // Calculate random position within the container bounds
    const maxX = container.clientWidth - 150; // button width roughly 150px
    const maxY = container.clientHeight - 80; // button height roughly 80px
    
    const randomX = Math.max(0, Math.floor(Math.random() * maxX));
    const randomY = Math.max(0, Math.floor(Math.random() * maxY));

    setYesPosition({
      position: 'absolute',
      left: `${randomX}px`,
      top: `${randomY}px`
    });
  };

  const renderStage = () => {
    switch (stage) {
      case 0:
        return (
          <div className="flex flex-col items-center justify-center p-8 text-center min-h-[400px]">
            <img 
              src={hoverHello ? "/ask-assets/hi.gif" : "/ask-assets/sad.gif"} 
              alt="Reaction" 
              className="w-64 h-64 object-cover rounded-2xl mb-8 shadow-xl transition-all duration-300"
            />
            <button 
              className={`px-8 py-4 rounded-full text-2xl font-bold transition-all duration-300 ${hoverHello ? 'bg-pink-500 text-white scale-110' : 'bg-rose-400 text-white'}`}
              onMouseEnter={() => setHoverHello(true)}
              onMouseLeave={() => setHoverHello(false)}
              onClick={() => setStage(1)}
            >
              Hello {hoverHello ? '🥺' : '😔'}
            </button>
          </div>
        );
      
      case 1:
        return (
          <div className="flex flex-col items-center justify-center p-8 text-center min-h-[400px]">
            <h2 className="text-3xl font-bold text-pink-600 mb-4 font-serif">
              Omigod! Omigod! You are...
            </h2>
            <div className="space-y-4 my-8 relative">
              <h3 className="text-2xl text-rose-500 animate-pulse">You're so BEAUTIFUL!!!!!!</h3>
              <h3 className="text-2xl text-rose-600 animate-pulse delay-75">You're so GORGEOUS!!!!!!</h3>
              <h3 className="text-2xl text-rose-700 animate-pulse delay-150">Just looking like a WOWWWW!!!!!!</h3>
            </div>
            <button 
              className="px-8 py-4 bg-yellow-400 hover:bg-yellow-500 text-yellow-900 rounded-full text-xl font-bold transition-all duration-300 shadow-lg mt-8 animate-bounce"
              onClick={() => { setStage(2); setYesPosition({ top: 'auto', left: 'auto', position: 'relative' }); }}
            >
              Click at Your Own Risk ⚠️
            </button>
          </div>
        );

      case 2:
        return (
          <div 
            ref={containerRef}
            className={`flex flex-col items-center justify-center p-8 text-center min-h-[500px] relative transition-colors duration-500 ${hoverNo ? 'bg-rose-900/40 rounded-3xl' : ''}`}
          >
            <h1 className="text-3xl font-bold text-white mb-8 drop-shadow-md">
              Click on <span className="text-red-500 text-4xl">YES</span> if you really don't <span className="text-red-500 text-4xl">LOVE</span> me.
            </h1>
            
            <img 
              src={hoverNo ? "/ask-assets/attitude.gif" : "/ask-assets/angry.gif"} 
              alt="Reaction" 
              className="w-64 h-64 object-cover rounded-2xl mb-12 shadow-2xl transition-all duration-300 border-4 border-white/20"
            />
            
            <div className="flex gap-8 items-center justify-center w-full relative h-[100px]">
              <button 
                className="px-8 py-3 bg-red-500 hover:bg-red-600 text-white rounded-full text-2xl font-bold shadow-xl z-20"
                style={{ ...yesPosition, transition: 'all 0.2s ease-out' }}
                onMouseEnter={handleYesHover}
                onClick={handleYesHover}
              >
                Yes 💔
              </button>
              
              <button 
                className={`px-8 py-3 rounded-full text-2xl font-bold shadow-xl z-10 transition-all duration-300 ${hoverNo ? 'bg-pink-500 text-white scale-110' : 'bg-rose-400 text-white'}`}
                onMouseEnter={() => setHoverNo(true)}
                onMouseLeave={() => setHoverNo(false)}
                onClick={() => setStage(3)}
              >
                No 🥺
              </button>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="flex flex-col items-center justify-center p-8 text-center min-h-[400px] animate-fade-in">
            <h1 className="text-5xl font-bold text-pink-500 mb-8 drop-shadow-lg font-serif">
              I love youuuuu <br/> tooooooo! 💕
            </h1>
            <img 
              src="/ask-assets/kiss.gif" 
              alt="Love" 
              className="w-80 h-80 object-cover rounded-3xl shadow-2xl border-4 border-pink-300"
            />
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto my-12" id="ask-her-out-section">
      <div style={{
        background: 'rgba(255,255,255,0.1)',
        backdropFilter: 'blur(10px)',
        borderRadius: '24px',
        padding: '30px',
        boxShadow: '0 8px 32px rgba(219, 112, 147, 0.3)',
        border: '1px solid rgba(255,255,255,0.2)',
        overflow: 'hidden'
      }}>
        {renderStage()}
      </div>
    </div>
  );
};

export default AskHerOut;
