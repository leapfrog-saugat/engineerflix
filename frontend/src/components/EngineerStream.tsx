import React, { useState, useEffect } from 'react';
import EngineerCard from './EngineerCard';
import { Engineer } from '@/lib/supabase';

interface EngineerStreamProps {
  category: string;
  engineers: Engineer[];
}

export default function EngineerStream({ category, engineers }: EngineerStreamProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % engineers.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isHovered, engineers.length]);

  return (
    <div className="w-full py-8">
      <h2 className="text-2xl font-bold text-white mb-4 px-4">{category}</h2>
      <div className="relative group">
        <div className="flex overflow-x-auto gap-4 px-4 pb-4 scrollbar-hide">
          {engineers.map((engineer, index) => (
            <div
              key={engineer.id}
              className={`flex-none w-64 transition-transform duration-300 ${
                index === activeIndex ? 'scale-110' : 'scale-100'
              }`}
              onMouseEnter={() => {
                setIsHovered(true);
                setActiveIndex(index);
              }}
              onMouseLeave={() => setIsHovered(false)}
            >
              <EngineerCard engineer={engineer} />
            </div>
          ))}
        </div>
        <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-gray-900 to-transparent" />
        <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-gray-900 to-transparent" />
      </div>
    </div>
  );
} 