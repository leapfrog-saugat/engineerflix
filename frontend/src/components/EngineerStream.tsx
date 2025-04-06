import React, { useRef, useState } from 'react';
import Link from 'next/link';
import EngineerCard from './EngineerCard';
import LazyLoad from './LazyLoad';
import { Engineer } from '../types/engineer';

interface EngineerStreamProps {
  category: string;
  engineers: Engineer[];
}

export default function EngineerStream({ category, engineers }: EngineerStreamProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    setShowLeftArrow(scrollLeft > 0);
    setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
  };

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;
    
    const scrollAmount = direction === 'left' ? -400 : 400;
    scrollContainerRef.current.scrollBy({
      left: scrollAmount,
      behavior: 'smooth'
    });
  };

  return (
    <div className="w-full py-8">
      {/* Header with See All link */}
      <div className="flex justify-between items-center mb-4 px-4">
        <h2 className="text-2xl font-bold text-white">{category}</h2>
        <Link 
          href={`/category/${encodeURIComponent(category.toLowerCase())}`}
          className="text-red-500 hover:text-red-400 transition-colors duration-200 text-sm font-medium"
        >
          See All
        </Link>
      </div>

      {/* Scroll Container */}
      <div className="relative group">
        <div 
          ref={scrollContainerRef}
          className="flex overflow-x-auto gap-4 px-4 pb-4 scrollbar-hide scroll-smooth"
          onScroll={handleScroll}
        >
          {engineers.map((engineer) => (
            <div
              key={engineer.id}
              className="flex-none w-64"
            >
              <LazyLoad>
                <EngineerCard engineer={engineer} />
              </LazyLoad>
            </div>
          ))}
        </div>

        {/* Scroll Arrows */}
        {showLeftArrow && (
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-black/80 hover:bg-black/90 text-white p-2 rounded-r-lg transition-all duration-200 backdrop-blur-sm z-10"
            aria-label="Scroll left"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}
        {showRightArrow && (
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-black/80 hover:bg-black/90 text-white p-2 rounded-l-lg transition-all duration-200 backdrop-blur-sm z-10"
            aria-label="Scroll right"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}

        {/* Gradient Overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-gray-900 to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-gray-900 to-transparent pointer-events-none" />
      </div>
    </div>
  );
} 