'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Engineer } from '../types/engineer';
import HeroSection from './HeroSection';
import { loadImageProgressively } from '@/utils/imageLoader';

interface FeaturedCarouselProps {
  engineers: Engineer[];
}

const FeaturedCarousel: React.FC<FeaturedCarouselProps> = ({ engineers }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentQuality, setCurrentQuality] = useState<'placeholder' | 'thumbnail' | 'original'>('placeholder');
  const [currentImage, setCurrentImage] = useState<string>('');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-advance carousel
  useEffect(() => {
    if (isPlaying && !isHovered && engineers.length > 1) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % engineers.length);
      }, 10000); // Change every 10 seconds
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, isHovered, engineers.length]);

  useEffect(() => {
    if (engineers[currentIndex]?.profile_image_url) {
      const imageSet = {
        original: engineers[currentIndex].profile_image_url,
        thumbnail: `${engineers[currentIndex].profile_image_url}?w=200&q=60`,
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
      if (initialImage instanceof HTMLImageElement) {
        setCurrentImage(initialImage.src);
      } else {
        setCurrentImage(imageSet.placeholder);
      }
    }
  }, [engineers, currentIndex]);

  const handleNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % engineers.length);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const handlePrev = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + engineers.length) % engineers.length);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const handleDotClick = (index: number) => {
    if (isTransitioning || index === currentIndex) return;
    setIsTransitioning(true);
    setCurrentIndex(index);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  if (engineers.length === 0) {
    return null;
  }

  const currentEngineer = engineers[currentIndex];

  return (
    <div 
      className="relative w-full h-[85vh] overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <HeroSection engineer={currentEngineer} />

      {/* Navigation Buttons */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-4">
        <button
          onClick={handlePrev}
          className="px-6 py-3 bg-white/10 backdrop-blur-sm text-white rounded hover:bg-white/20 transition-colors flex items-center gap-2 font-medium"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Previous
        </button>
        <button
          onClick={handleNext}
          className="px-6 py-3 bg-white/10 backdrop-blur-sm text-white rounded hover:bg-white/20 transition-colors flex items-center gap-2 font-medium"
        >
          Next
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
        {engineers.map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex ? 'bg-white w-4' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default FeaturedCarousel; 