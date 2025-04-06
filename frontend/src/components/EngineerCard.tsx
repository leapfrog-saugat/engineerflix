import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Engineer } from '../types/engineer';
import OptimizedVideo from './OptimizedVideo';
import { videoService } from '../services/videoService';
import { StarIcon, BriefcaseIcon, EnvelopeIcon, PhoneIcon, CalendarIcon } from '@heroicons/react/24/solid';

interface EngineerCardProps {
  engineer: Engineer;
  onContact?: (type: 'email' | 'phone' | 'calendar') => void;
}

const EngineerCard: React.FC<EngineerCardProps> = ({
  engineer,
  onContact,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [thumbnail, setThumbnail] = useState<string | null>(null);
  const [dataUsage, setDataUsage] = useState<number | null>(null);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const generateThumbnail = async () => {
      if (engineer.profile_video_url) {
        try {
          // Generate thumbnail if not already available
          const thumbnailUrl = await videoService.generateThumbnail(engineer.profile_video_url);
          setThumbnail(thumbnailUrl);

          // Calculate estimated data usage
          const metadata = await videoService.getVideoMetadata(engineer.profile_video_url);
          const usage = videoService.calculateDataUsage(metadata.duration, 'high');
          setDataUsage(usage);
        } catch (error) {
          console.error('Error generating thumbnail:', error);
        }
      }
    };

    generateThumbnail();
  }, [engineer.profile_video_url]);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  if (!engineer) {
    return (
      <div className="relative w-[200px] aspect-[2/3] rounded-md overflow-hidden bg-gray-800 animate-pulse" data-testid="engineer-card-loading">
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
  const primarySubcategory = engineer.subcategories.find((sub) => sub.is_primary)?.subcategory;

  return (
    <div
      className={`relative w-[200px] aspect-[2/3] rounded-md overflow-hidden cursor-pointer transition-all duration-300 ${isHovered ? 'scale-105 z-10 shadow-xl' : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      data-testid="engineer-card"
    >
      {/* Base dark background to prevent white flash */}
      <div className="absolute inset-0 bg-gray-900" />
      
      {/* Image or Video */}
      <div className="relative h-48 w-full">
        {engineer.profile_video_url ? (
          <OptimizedVideo
            src={engineer.profile_video_url}
            poster={thumbnail || undefined}
            className="w-full h-full object-cover"
            autoPlay={isHovered}
            muted
            controls={false}
          />
        ) : (
          <div className="relative w-full h-full">
            {!imageError && engineer.profile_image_url ? (
              <Image
                src={engineer.profile_image_url}
                alt={engineer.name}
                fill
                className="object-cover"
                onError={() => setImageError(true)}
                priority={false}
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500 text-sm">No image available</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Static Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-75" />

      {/* Hover Gradient */}
      <div 
        className={`absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Experience Badge */}
      <div 
        className="absolute top-2 left-2 px-2 py-1 bg-black/60 backdrop-blur-sm rounded-full text-white text-xs font-medium flex items-center gap-1"
        data-testid="experience-badge"
      >
        <BriefcaseIcon className="w-3 h-3" />
        {engineer.years_of_experience} YOE
      </div>

      {/* Availability Status */}
      <div 
        className={`absolute top-2 right-2 w-3 h-3 rounded-full ${
          engineer.availability_status === 'available' ? 'bg-green-500' : 'bg-red-500'
        }`}
        data-testid="availability-status"
      />

      {/* Rating */}
      {engineer.rating && (
        <div 
          className="absolute top-8 left-2 px-2 py-1 bg-black/60 backdrop-blur-sm rounded-full text-white text-xs font-medium flex items-center gap-1"
          data-testid="rating"
        >
          <StarIcon className="w-3 h-3 text-yellow-400" />
          {engineer.rating.toFixed(1)}
        </div>
      )}

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-0 transition-transform duration-300">
        <h3 className={`text-lg font-bold text-white mb-1 drop-shadow-lg transition-colors duration-300 ${
          isHovered ? 'text-red-500' : ''
        }`}>
          {engineer.name}
        </h3>
        <p className="text-sm font-medium text-gray-300 mb-3 opacity-90">
          {primarySubcategory?.name || 'Engineer'}
        </p>
        
        {dataUsage && (
          <p className="text-xs text-gray-500 mt-1">
            Estimated data usage: {dataUsage}MB
          </p>
        )}

        {/* Skills */}
        <div 
          className={`flex flex-wrap gap-1.5 transition-opacity duration-300 mb-4 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
          data-testid="skills-container"
        >
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

        {/* Quick Action Buttons */}
        <div 
          className={`flex gap-2 transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
          data-testid="action-buttons"
        >
          <button
            onClick={() => onContact?.('email')}
            className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors duration-200"
            aria-label="Contact via email"
          >
            <EnvelopeIcon className="w-4 h-4 text-white" />
          </button>
          <button
            onClick={() => onContact?.('phone')}
            className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors duration-200"
            aria-label="Contact via phone"
          >
            <PhoneIcon className="w-4 h-4 text-white" />
          </button>
          <button
            onClick={() => onContact?.('calendar')}
            className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors duration-200"
            aria-label="Schedule a meeting"
          >
            <CalendarIcon className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default EngineerCard; 