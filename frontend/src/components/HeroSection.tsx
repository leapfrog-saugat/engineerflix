'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Engineer } from '@/lib/supabase';
import { loadImageProgressively, getRandomVideo, VideoSet } from '@/utils/imageLoader';

interface HeroSectionProps {
  engineer: Engineer;
}

export default function HeroSection({ engineer }: HeroSectionProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [currentQuality, setCurrentQuality] = useState<'placeholder' | 'thumbnail' | 'original'>('placeholder');
  const [videoData, setVideoData] = useState<VideoSet | null>(null);
  const [currentImage, setCurrentImage] = useState<string>('');
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    setHasError(false);
    
    // Load video data
    try {
      const video = getRandomVideo(engineer.specialty);
      console.log('Loading video:', video.url); // Debug log
      
      // Preload video
      const videoElement = document.createElement('video');
      videoElement.src = video.url;
      videoElement.preload = 'auto';
      
      videoElement.addEventListener('loadedmetadata', () => {
        console.log('Video metadata loaded');
        setVideoData(video);
      });
      
      videoElement.addEventListener('error', (e) => {
        console.error('Error preloading video:', e);
        setHasError(true);
      });
      
    } catch (error) {
      console.error('Error loading video:', error);
      setHasError(true);
    }

    // Load image progressively for fallback/thumbnail
    if (engineer.imageUrl) {
      const imageSet = {
        original: engineer.imageUrl,
        thumbnail: `${engineer.imageUrl}?w=200&q=60`,
        placeholder: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQtJSEkLzYvLy0vLi44QjhAOEA4Qi4tMkYwRjlDREVPUlVXXF5kaGRoQ0f/2wBDARUXFyAeIB4cHh4oISEmKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAb/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k='
      };
      const initialImage = loadImageProgressively(imageSet, (quality) => {
        setCurrentQuality(quality);
        if (quality === 'original') {
          setCurrentImage(imageSet.original);
        } else if (quality === 'thumbnail') {
          setCurrentImage(imageSet.thumbnail);
        }
      });
      setCurrentImage(initialImage);
    }

    return () => {
      // Cleanup video element on unmount
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.removeAttribute('src');
        videoRef.current.load();
      }
    };
  }, [engineer]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleVideoLoad = () => {
    console.log('Video loaded successfully'); // Debug log
    setIsLoading(false);
  };

  const handleVideoError = (e: any) => {
    console.error('Video loading error:', e); // Debug log with error details
    setHasError(true);
    setIsLoading(false);
  };

  // Add video play event listener
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handlePlay = () => {
      console.log('Video started playing'); // Debug log
    };

    const handlePause = () => {
      console.log('Video paused'); // Debug log
    };

    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);

    return () => {
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
    };
  }, [videoRef.current]);

  return (
    <div className="relative h-[85vh] w-full overflow-hidden">
      {/* Video or Image Background */}
      {videoData && (
        <div className="absolute inset-0 bg-gray-900">
          {/* Loading Spinner */}
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-20">
              <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
          
          <video
            ref={videoRef}
            className="absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-500"
            src={videoData.url}
            autoPlay
            playsInline
            muted={isMuted}
            loop
            preload="auto"
            crossOrigin="anonymous"
            poster={videoData.thumbnail}
            style={{ opacity: isPlaying && !hasError ? 1 : 0 }}
            onLoadedData={handleVideoLoad}
            onError={handleVideoError}
            onLoadStart={() => console.log('Video load started')}
            onWaiting={() => console.log('Video is waiting/buffering')}
            onPlaying={() => console.log('Video is playing')}
            onStalled={() => console.log('Video has stalled')}
          />
          <div 
            className="absolute inset-0 bg-cover bg-center transition-opacity duration-500"
            style={{ 
              backgroundImage: `url(${currentImage || videoData.thumbnail})`,
              opacity: !isPlaying || hasError ? 1 : 0
            }}
          />
        </div>
      )}

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

      {/* Content */}
      <div className="absolute bottom-[15%] left-0 w-full px-8 md:px-12 z-10">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
            {engineer.name}
          </h1>
          <p className="text-xl text-gray-200 mb-6 max-w-2xl drop-shadow-md">
            {engineer.description}
          </p>
          
          {/* Skills */}
          <div className="flex flex-wrap gap-2 mb-8">
            {engineer.skills?.map((skill, index) => (
              <span
                key={index}
                className="px-4 py-1 bg-red-600 text-white rounded-full text-sm font-medium hover:bg-red-700 transition-colors"
              >
                {skill}
              </span>
            ))}
          </div>

          {/* Video Controls */}
          <div className="flex gap-4">
            <button
              onClick={togglePlay}
              className="px-6 py-3 bg-white text-black rounded hover:bg-gray-200 transition-colors flex items-center gap-2 font-medium"
              disabled={hasError}
            >
              {isPlaying ? (
                <>
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Pause
                </>
              ) : (
                <>
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Play
                </>
              )}
            </button>
            
            {/* Mute/Unmute Button */}
            <button
              onClick={toggleMute}
              className="px-6 py-3 bg-white/10 backdrop-blur-sm text-white rounded hover:bg-white/20 transition-colors flex items-center gap-2 font-medium"
              disabled={hasError}
            >
              {isMuted ? (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                </svg>
              )}
            </button>

            <button className="px-6 py-3 bg-gray-800 text-white rounded hover:bg-gray-700 transition-colors flex items-center gap-2 font-medium">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Save Profile
            </button>
          </div>
        </div>
      </div>

      {/* Video Duration and Error Message */}
      {videoData && (
        <div className="absolute bottom-4 right-4 flex items-center gap-4">
          {hasError && (
            <div className="bg-red-600/70 px-3 py-1 rounded text-white text-sm">
              Video unavailable
            </div>
          )}
          <div className="bg-black/70 px-2 py-1 rounded text-white text-sm">
            {videoData.duration}
          </div>
        </div>
      )}
    </div>
  );
} 