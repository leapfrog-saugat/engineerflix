import React, { useState, useEffect } from 'react';
import { Engineer } from '@/lib/supabase';
import { loadImageProgressively, getImageSetForEngineer, getRandomImageForCategory } from '@/utils/imageLoader';

interface EngineerCardProps {
  engineer: Engineer | undefined;
}

export default function EngineerCard({ engineer }: EngineerCardProps) {
  const [currentQuality, setCurrentQuality] = useState<'placeholder' | 'thumbnail' | 'original'>('placeholder');
  const [currentImage, setCurrentImage] = useState<string>('');
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    if (engineer) {
      const imageUrl = imageError || !engineer.profile_image_url 
        ? getRandomImageForCategory()
        : engineer.profile_image_url;

      const imageSet = getImageSetForEngineer(imageUrl);
      const img = loadImageProgressively(imageSet, (quality) => {
        setCurrentQuality(quality);
        if (quality === 'original') {
          setCurrentImage(imageSet.original);
        } else if (quality === 'thumbnail') {
          setCurrentImage(imageSet.thumbnail);
        }
      });

      if (img instanceof HTMLImageElement) {
        setCurrentImage(img.src);
      } else {
        setCurrentImage(imageSet.placeholder);
      }
    }
  }, [engineer, imageError]);

  if (!engineer) {
    return (
      <div className="group relative w-[200px] aspect-[2/3] rounded-md overflow-hidden bg-gray-800 animate-pulse">
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="h-6 bg-gray-700 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-700 rounded w-1/2 mb-4"></div>
          <div className="flex gap-2">
            <div className="h-4 bg-gray-700 rounded w-16"></div>
            <div className="h-4 bg-gray-700 rounded w-16"></div>
          </div>
        </div>
      </div>
    );
  }

  // Get primary subcategory if available
  const primarySubcategory = engineer.subcategories?.find(sub => sub.is_primary)?.subcategory;

  return (
    <div 
      className="group relative w-[200px] aspect-[2/3] rounded-md overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105 hover:z-10 hover:shadow-xl"
    >
      {/* Base dark background to prevent white flash */}
      <div className="absolute inset-0 bg-gray-900" />
      
      {/* Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-all duration-500"
        style={{ 
          backgroundImage: `url(${currentImage})`,
          filter: currentQuality === 'placeholder' ? 'blur(10px)' : 'none'
        }}
        onError={() => setImageError(true)}
      />

      {/* Static Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-90" />

      {/* Hover Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-0 transition-transform duration-300">
        <h3 className="text-lg font-bold text-white mb-1 drop-shadow-lg group-hover:text-red-500 transition-colors duration-300">
          {engineer.name}
        </h3>
        <p className="text-sm font-medium text-gray-300 mb-3 opacity-90">
          {primarySubcategory?.name || 'Engineer'}
        </p>
        
        {/* Skills */}
        <div className="flex flex-wrap gap-1.5 transition-opacity duration-300 opacity-0 group-hover:opacity-100">
          {engineer.skills?.slice(0, 3).map((skill, index) => (
            <span
              key={index}
              className="px-2 py-0.5 bg-red-600 text-white text-[11px] font-medium rounded-sm"
            >
              {skill.skill_name}
            </span>
          ))}
          {engineer.skills?.length > 3 && (
            <span className="px-2 py-0.5 bg-gray-700 text-white text-[11px] font-medium rounded-sm">
              +{engineer.skills.length - 3}
            </span>
          )}
        </div>
      </div>
    </div>
  );
} 