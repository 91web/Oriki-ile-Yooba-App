"use client"
import React, { useEffect, useRef } from 'react';
import OrikiAppBar from '../src/components/OrikiAppBar';
import OrikiFooter from '../src/components/OrikiFooter';

const OrikiHomePage = () => {
  const playerRef = useRef(null); // Create a ref to store the player instance

  useEffect(() => {
    // Load the YouTube IFrame API
    const loadYouTubeAPI = () => {
      const script = document.createElement('script');
      script.src = 'https://www.youtube.com/iframe_api';
      document.body.appendChild(script);
    };

    loadYouTubeAPI();

    // Define the onYouTubeIframeAPIReady function
    window.onYouTubeIframeAPIReady = () => {
      playerRef.current = new window.YT.Player('youtube-player', {
        height: '315',
        width: '860',
        videoId: 'KzL-gVU0iA0',
        playerVars: {
          autoplay: 1, // Start autoplay
          rel: 0, // Don't show related videos
          showinfo: 0, // Don't show video title and other info
          enablejsapi: 1, // Enable JS API
          mute: 1, // Mute the video to allow autoplay
        },
        events: {
          onReady: (event) => {
            event.target.playVideo(); // Play the video
            setTimeout(() => {
              event.target.stopVideo(); // Stop the video after 10 seconds
            }, 10002); // 10000 milliseconds = 10 seconds
          },
        },
      });
    };
    
    return () => {
      // Cleanup the player instance on component unmount
      if (playerRef.current) {
        playerRef.current.destroy();
        playerRef.current = null;
      }
    };
  }, []);

  return (
    <div>
      <OrikiAppBar />
      
      {/* Embedding the YouTube video */}
      <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0', marginTop: 100 }}>
        <div id="youtube-player"></div> {/* Use a div to hold the YouTube player */}
      </div>
      <OrikiFooter />
    </div>
  );
}

export default OrikiHomePage;