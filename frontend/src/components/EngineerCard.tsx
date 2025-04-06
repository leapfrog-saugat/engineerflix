import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Engineer } from '../types/engineer';
import OptimizedVideo from './OptimizedVideo';
import { videoService } from '../services/videoService';
import { StarIcon, BriefcaseIcon, EnvelopeIcon, PhoneIcon, CalendarIcon, UserCircleIcon } from '@heroicons/react/24/solid';

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
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const generateThumbnail = async () => {
      if (engineer.profile_video_url) {
        try {
          const thumbnailUrl = await videoService.generateThumbnail(engineer.profile_video_url);
          setThumbnail(thumbnailUrl);

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

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

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

  const primarySubcategory = engineer.subcategories.find((sub) => sub.is_primary)?.subcategory;
  const visibleSkills = engineer.skills?.slice(0, 3) || [];
  const remainingSkills = Math.max(0, (engineer.skills?.length || 0) - 3);

  return (
    <div
      className="relative w-[200px] aspect-[2/3] rounded-md overflow-hidden cursor-pointer bg-gray-900 hover:z-10"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      data-testid="engineer-card"
    >
      {/* Card scaling wrapper */}
      <div className={`absolute inset-0 transition-transform duration-500 ease-out ${isHovered ? 'scale-[1.03]' : 'scale-100'}`}>
        {/* Image or Video Container */}
        <div className="relative h-48 w-full bg-gray-800">
          {engineer.profile_video_url ? (
            <OptimizedVideo
              src={engineer.profile_video_url}
              poster={thumbnail || engineer.profile_image_url}
              className="w-full h-full object-cover"
              autoPlay={isHovered}
              muted
              controls={false}
            />
          ) : (
            <div className="relative w-full h-full">
              {!imageError && engineer.profile_image_url ? (
                <>
                  {/* Loading placeholder */}
                  {!imageLoaded && (
                    <div className="absolute inset-0 bg-gray-800 flex items-center justify-center">
                      <UserCircleIcon className="w-12 h-12 text-gray-400 animate-pulse" />
                    </div>
                  )}
                  <Image
                    src={engineer.profile_image_url}
                    alt={engineer.name}
                    fill
                    sizes="200px"
                    className={`object-cover transition-all duration-700 ease-out ${
                      imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
                    }`}
                    onError={() => setImageError(true)}
                    onLoad={() => setImageLoaded(true)}
                    priority={false}
                  />
                </>
              ) : (
                <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                  <UserCircleIcon className="w-16 h-16 text-gray-400" />
                </div>
              )}
            </div>
          )}
        </div>

        {/* Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-75" />
        <div 
          className={`absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent transition-opacity duration-500 ease-out ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* Experience Badge */}
        <div 
          className="absolute top-2 left-2 px-2 py-1 bg-black/60 backdrop-blur-sm rounded-full text-white text-xs font-medium flex items-center gap-1 shadow-lg"
          data-testid="experience-badge"
        >
          <BriefcaseIcon className="w-3 h-3" />
          {engineer.years_of_experience} YOE
        </div>

        {/* Availability Status */}
        <div 
          className={`absolute top-2 right-2 w-3 h-3 rounded-full shadow-lg transition-transform duration-500 ease-out ${
            engineer.availability_status === 'available' ? 'bg-green-500' : 'bg-red-500'
          } ${isHovered ? 'scale-110' : 'scale-100'}`}
          title={`${engineer.availability_status === 'available' ? 'Available' : 'Not Available'}`}
          data-testid="availability-status"
        />

        {/* Rating */}
        {engineer.rating && (
          <div 
            className="absolute top-8 left-2 px-2 py-1 bg-black/60 backdrop-blur-sm rounded-full text-white text-xs font-medium flex items-center gap-1 shadow-lg"
            data-testid="rating"
          >
            <StarIcon className="w-3 h-3 text-yellow-400" />
            {engineer.rating.toFixed(1)}
          </div>
        )}

        {/* Content Container - Fixed Height */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          {/* Fixed Height Content Section */}
          <div className="h-[140px]">
            {/* Name and Title - Fixed Position */}
            <div className="mb-3">
              <h3 className={`text-lg font-bold text-white mb-1 drop-shadow-lg transition-colors duration-500 ease-out ${
                isHovered ? 'text-red-500' : ''
              }`}>
                {engineer.name}
              </h3>
              <p className="text-sm font-medium text-gray-300">
                {primarySubcategory?.name || 'Engineer'}
              </p>
            </div>

            {/* Skills Container - Fixed Height */}
            <div className="h-[72px]">
              <div className="flex flex-wrap gap-1.5 transition-all duration-500 ease-out">
                {visibleSkills.map((skill, index) => (
                  <span
                    key={index}
                    className={`px-2 py-0.5 text-white text-[11px] font-medium rounded-sm backdrop-blur-sm shadow-lg transition-all duration-500 ease-out ${
                      isHovered ? 'bg-red-600/80' : 'bg-red-600/60'
                    }`}
                  >
                    {skill.skill_name}
                  </span>
                ))}
                {remainingSkills > 0 && (
                  <span 
                    className={`px-2 py-0.5 text-white text-[11px] font-medium rounded-sm backdrop-blur-sm shadow-lg transition-all duration-500 ease-out ${
                      isHovered ? 'bg-gray-700/80' : 'bg-gray-700/60'
                    }`}
                  >
                    +{remainingSkills}
                  </span>
                )}
              </div>

              {/* Data Usage Info */}
              {dataUsage && isHovered && (
                <p className="text-xs text-gray-400 mt-2 transition-opacity duration-500 ease-out">
                  Est. data: {dataUsage}MB
                </p>
              )}
            </div>
          </div>

          {/* Quick Action Buttons - Absolute Position */}
          <div 
            className={`absolute left-4 right-4 flex gap-2 transition-all duration-500 ease-out ${
              isHovered ? 'bottom-4 opacity-100' : '-bottom-12 opacity-0'
            }`}
            data-testid="action-buttons"
          >
            <button
              onClick={() => onContact?.('email')}
              className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-all duration-300 shadow-lg hover:scale-110"
              aria-label="Contact via email"
            >
              <EnvelopeIcon className="w-4 h-4 text-white" />
            </button>
            <button
              onClick={() => onContact?.('phone')}
              className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-all duration-300 shadow-lg hover:scale-110"
              aria-label="Contact via phone"
            >
              <PhoneIcon className="w-4 h-4 text-white" />
            </button>
            <button
              onClick={() => onContact?.('calendar')}
              className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-all duration-300 shadow-lg hover:scale-110"
              aria-label="Schedule a meeting"
            >
              <CalendarIcon className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EngineerCard; 