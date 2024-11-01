import React, { useState, useEffect } from 'react';
import { Maximize2, Minimize2 } from 'lucide-react';

const FullscreenImage = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Listen for fullscreen change events
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);
    document.addEventListener('MSFullscreenChange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
      document.removeEventListener('MSFullscreenChange', handleFullscreenChange);
    };
  }, []);

  const toggleFullscreen = async () => {
    try {
      if (!isFullscreen) {
        const elem = document.documentElement;
        if (elem.requestFullscreen) {
          await elem.requestFullscreen();
        } else if (elem.webkitRequestFullscreen) {
          await elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) {
          await elem.msRequestFullscreen();
        }
      } else {
        if (document.exitFullscreen) {
          await document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
          await document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
          await document.msExitFullscreen();
        }
      }
    } catch (error) {
      console.error('Error toggling fullscreen:', error);
    }
  };

  // Handle Escape key
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === 'Escape' && isFullscreen) {
        toggleFullscreen();
      }
    };

    window.addEventListener('keydown', handleEscKey);
    return () => window.removeEventListener('keydown', handleEscKey);
  }, [isFullscreen]);

  return (
    <div className="relative max-w-2xl mx-auto p-4">
      <div className="relative group">
        <img
          src="./first final design.jpg"
          alt="Example"
          className={`w-full rounded-lg shadow-lg transition-all duration-300 ${
            isFullscreen ? 'fixed inset-0 w-screen h-screen object-contain bg-black z-50' : ''
          }`}
        />
        <button
          onClick={toggleFullscreen}
          className={`absolute p-2 rounded-full bg-black/50 hover:bg-black/70 text-white transition-all duration-300 ${
            isFullscreen 
              ? 'top-4 right-4 z-50 opacity-100'
              : 'top-2 right-2 opacity-0 group-hover:opacity-100'
          }`}
          title={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
        >
          {isFullscreen ? (
            <Minimize2 className="w-5 h-5" />
          ) : (
            <Maximize2 className="w-5 h-5" />
          )}
        </button>
      </div>
    </div>
  );
};

export default FullscreenImage;