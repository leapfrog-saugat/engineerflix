'use client';

import { EngineeringDiscipline, PrimaryCategory } from '@/lib/supabase';

// Cache for preloaded images and videos
const imageCache = new Map<string, HTMLImageElement>();
const videoCache = new Map<string, HTMLVideoElement>();
const thumbnailCache = new Map<string, string>();

interface ImageSet {
  original: string;
  thumbnail: string;
  placeholder: string;
}

export interface VideoSet {
  url: string;
  thumbnail: string;
  duration: string;
}

// Default image sets for when no specific image is available
const DEFAULT_IMAGE_SETS: ImageSet[] = [
  {
    original: 'https://images.unsplash.com/photo-1580927752452-89d86da3fa0a',
    thumbnail: 'https://images.unsplash.com/photo-1580927752452-89d86da3fa0a?w=200&q=60',
    placeholder: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQtJSEkLzYvLy0vLi44QjhAOEA4Qi4tMkYwRjlDREVPUlVXXF5kaGRoQ0f/2wBDARUXFyAeIB4cHh4oISEmKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAb/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k='
  },
  {
    original: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
    thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=200&q=60',
    placeholder: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQtJSEkLzYvLy0vLi44QjhAOEA4Qi4tMkYwRjlDREVPUlVXXF5kaGRoQ0f/2wBDARUXFyAeIB4cHh4oISEmKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAb/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k='
  }
];

// Default video sets for when no specific video is available
const DEFAULT_VIDEO_SETS: VideoSet[] = [
  {
    url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1580927752452-89d86da3fa0a',
    duration: '0:30'
  },
  {
    url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
    duration: '0:45'
  }
];

export const loadImageProgressively = (
  imageSet: ImageSet,
  onLoad?: (quality: 'placeholder' | 'thumbnail' | 'original') => void
) => {
  // Return cached image if available
  if (imageCache.has(imageSet.original)) {
    onLoad?.('original');
    return imageCache.get(imageSet.original)!;
  }

  // Create new image element
  const img = new Image();
  
  // Load placeholder first
  img.src = imageSet.placeholder;
  onLoad?.('placeholder');

  // Then load thumbnail
  const thumbnailImg = new Image();
  thumbnailImg.onload = () => {
    img.src = imageSet.thumbnail;
    onLoad?.('thumbnail');
  };
  thumbnailImg.src = imageSet.thumbnail;

  // Finally load original
  const originalImg = new Image();
  originalImg.onload = () => {
    img.src = imageSet.original;
    onLoad?.('original');
    imageCache.set(imageSet.original, img);
  };
  originalImg.src = imageSet.original;

  return img;
};

export const getRandomImage = (): ImageSet => {
  const randomIndex = Math.floor(Math.random() * DEFAULT_IMAGE_SETS.length);
  return DEFAULT_IMAGE_SETS[randomIndex];
};

export const getRandomVideo = (engineer?: any): VideoSet => {
  if (engineer?.video_url) {
    return {
      url: engineer.video_url,
      thumbnail: engineer.profile_image_url || DEFAULT_VIDEO_SETS[0].thumbnail,
      duration: '0:30' // Default duration since we don't store it
    };
  }
  const randomIndex = Math.floor(Math.random() * DEFAULT_VIDEO_SETS.length);
  return DEFAULT_VIDEO_SETS[randomIndex];
};

export const preloadAllImages = () => {
  DEFAULT_IMAGE_SETS.forEach(imageSet => {
    loadImageProgressively(imageSet);
  });
};

export const preloadVideoThumbnails = () => {
  DEFAULT_VIDEO_SETS.forEach(videoSet => {
    const img = new Image();
    img.src = videoSet.thumbnail;
    thumbnailCache.set(videoSet.thumbnail, videoSet.thumbnail);
  });
};

export const clearCaches = () => {
  imageCache.clear();
  videoCache.clear();
  thumbnailCache.clear();
};

export const getFallbackImage = (): ImageSet => {
  return DEFAULT_IMAGE_SETS[0];
};

export const getRandomImageForCategory = (): string => {
  return getRandomImage().original;
};

export const getImageSetForEngineer = (imageUrl: string | undefined): ImageSet => {
  if (!imageUrl) {
    return getRandomImage();
  }

  return {
    original: imageUrl,
    thumbnail: imageUrl,
    placeholder: imageUrl
  };
}; 