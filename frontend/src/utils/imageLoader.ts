'use client';

// Map of professional categories to image collections with multiple resolutions
const IMAGE_COLLECTIONS = {
  'Software Engineer': [
    {
      original: 'https://images.unsplash.com/photo-1580927752452-89d86da3fa0a',
      thumbnail: 'https://images.unsplash.com/photo-1580927752452-89d86da3fa0a?w=200&q=60',
      placeholder: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQtJSEkLzYvLy0vLi44QjhAOEA4Qi4tMkYwRjlDREVPUlVXXF5kaGRoQ0f/2wBDARUXFyAeIB4cHh4oISEmKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAb/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k='
    },
    {
      original: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
      thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=200&q=60',
      placeholder: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQtJSEkLzYvLy0vLi44QjhAOEA4Qi4tMkYwRjlDREVPUlVXXF5kaGRoQ0f/2wBDARUXFyAeIB4cHh4oISEmKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAb/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k='
    },
    {
      original: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2',
      thumbnail: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&q=60',
      placeholder: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQtJSEkLzYvLy0vLi44QjhAOEA4Qi4tMkYwRjlDREVPUlVXXF5kaGRoQ0f/2wBDARUXFyAeIB4cHh4oISEmKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAb/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k='
    },
    {
      original: 'https://images.unsplash.com/photo-1581092921461-eab62e97a780',
      thumbnail: 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=200&q=60',
      placeholder: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQtJSEkLzYvLy0vLi44QjhAOEA4Qi4tMkYwRjlDREVPUlVXXF5kaGRoQ0f/2wBDARUXFyAeIB4cHh4oISEmKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAb/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k='
    },
    {
      original: 'https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2',
      thumbnail: 'https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?w=200&q=60',
      placeholder: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQtJSEkLzYvLy0vLi44QjhAOEA4Qi4tMkYwRjlDREVPUlVXXF5kaGRoQ0f/2wBDARUXFyAeIB4cHh4oISEmKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAb/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k='
    }
  ],
  'Mechanical Engineer': [
    {
      original: 'https://images.unsplash.com/photo-1537462715879-360eeb61a0ad',
      thumbnail: 'https://images.unsplash.com/photo-1537462715879-360eeb61a0ad?w=200&q=60',
      placeholder: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQtJSEkLzYvLy0vLi44QjhAOEA4Qi4tMkYwRjlDREVPUlVXXF5kaGRoQ0f/2wBDARUXFyAeIB4cHh4oISEmKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAb/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k='
    },
    {
      original: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789',
      thumbnail: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=200&q=60',
      placeholder: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQtJSEkLzYvLy0vLi44QjhAOEA4Qi4tMkYwRjlDREVPUlVXXF5kaGRoQ0f/2wBDARUXFyAeIB4cHh4oISEmKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAb/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k='
    },
    {
      original: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837',
      thumbnail: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=200&q=60',
      placeholder: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQtJSEkLzYvLy0vLi44QjhAOEA4Qi4tMkYwRjlDREVPUlVXXF5kaGRoQ0f/2wBDARUXFyAeIB4cHh4oISEmKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAb/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k='
    },
    {
      original: 'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952',
      thumbnail: 'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=200&q=60',
      placeholder: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQtJSEkLzYvLy0vLi44QjhAOEA4Qi4tMkYwRjlDREVPUlVXXF5kaGRoQ0f/2wBDARUXFyAeIB4cHh4oISEmKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAb/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k='
    },
    {
      original: 'https://images.unsplash.com/photo-1581092009941-2500d7a4a1ad',
      thumbnail: 'https://images.unsplash.com/photo-1581092009941-2500d7a4a1ad?w=200&q=60',
      placeholder: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQtJSEkLzYvLy0vLi44QjhAOEA4Qi4tMkYwRjlDREVPUlVXXF5kaGRoQ0f/2wBDARUXFyAeIB4cHh4oISEmKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAb/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k='
    }
  ]
};

// Video URLs for each category with thumbnails
const VIDEO_COLLECTIONS = {
  'Software Engineer': [
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
  ],
  'Mechanical Engineer': [
    {
      url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
      thumbnail: 'https://images.unsplash.com/photo-1537462715879-360eeb61a0ad',
      duration: '0:30'
    },
    {
      url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
      thumbnail: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789',
      duration: '0:45'
    }
  ]
};

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

// Progressive image loading helper
export const loadImageProgressively = (
  imageSet: ImageSet,
  onLoad?: (quality: 'placeholder' | 'thumbnail' | 'original') => void
) => {
  // Start with placeholder
  if (onLoad) onLoad('placeholder');

  // Load thumbnail
  const thumbnailImg = new Image();
  thumbnailImg.onload = () => {
    if (onLoad) onLoad('thumbnail');
    imageCache.set(imageSet.thumbnail, thumbnailImg);

    // Load full image
    const fullImg = new Image();
    fullImg.onload = () => {
      if (onLoad) onLoad('original');
      imageCache.set(imageSet.original, fullImg);
    };
    fullImg.src = `${imageSet.original}?auto=format&fit=crop&w=1920&q=80`;
  };
  thumbnailImg.src = imageSet.thumbnail;

  return imageSet.placeholder; // Return placeholder immediately
};

// Get random image with progressive loading
export const getRandomImage = (category: string): ImageSet => {
  const collection = IMAGE_COLLECTIONS[category as keyof typeof IMAGE_COLLECTIONS];
  if (!collection) return IMAGE_COLLECTIONS['Software Engineer'][0];
  
  const randomIndex = Math.floor(Math.random() * collection.length);
  return collection[randomIndex];
};

// Get random video with thumbnail
export const getRandomVideo = (category: string): VideoSet => {
  const collection = VIDEO_COLLECTIONS[category as keyof typeof VIDEO_COLLECTIONS];
  if (!collection) return VIDEO_COLLECTIONS['Software Engineer'][0];
  
  const randomIndex = Math.floor(Math.random() * collection.length);
  const videoSet = collection[randomIndex];
  
  if (!videoCache.has(videoSet.url)) {
    // Prefetch video metadata and thumbnail
    const video = document.createElement('video');
    video.preload = 'metadata';
    video.src = videoSet.url;
    videoCache.set(videoSet.url, video);

    const thumbnailImg = new Image();
    thumbnailImg.src = videoSet.thumbnail;
    thumbnailCache.set(videoSet.url, videoSet.thumbnail);
  }
  
  return videoSet;
};

// Function to preload all images
export const preloadAllImages = () => {
  Object.values(IMAGE_COLLECTIONS).flat().forEach(imageSet => {
    loadImageProgressively(imageSet);
  });
};

// Function to preload video thumbnails
export const preloadVideoThumbnails = () => {
  Object.values(VIDEO_COLLECTIONS).flat().forEach(videoSet => {
    if (!thumbnailCache.has(videoSet.url)) {
      const img = new Image();
      img.src = videoSet.thumbnail;
      thumbnailCache.set(videoSet.url, videoSet.thumbnail);
    }
  });
};

// Function to clear all caches
export const clearCaches = () => {
  imageCache.clear();
  videoCache.clear();
  thumbnailCache.clear();
};

// Function to get a fallback image if loading fails
export const getFallbackImage = (category: string): ImageSet => {
  return {
    original: 'https://images.unsplash.com/photo-1580927752452-89d86da3fa0a',
    thumbnail: 'https://images.unsplash.com/photo-1580927752452-89d86da3fa0a?w=200&q=60',
    placeholder: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQtJSEkLzYvLy0vLi44QjhAOEA4Qi4tMkYwRjlDREVPUlVXXF5kaGRoQ0f/2wBDARUXFyAeIB4cHh4oISEmKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAb/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k='
  };
};

// Get a random image URL for a category
export const getRandomImageForCategory = (category: string): string => {
  const collection = IMAGE_COLLECTIONS[category as keyof typeof IMAGE_COLLECTIONS];
  if (!collection) return IMAGE_COLLECTIONS['Software Engineer'][0].original;
  const randomIndex = Math.floor(Math.random() * collection.length);
  return collection[randomIndex].original;
};

// Function to get image set for an engineer
export const getImageSetForEngineer = (imageUrl: string): ImageSet => {
  return {
    original: imageUrl,
    thumbnail: `${imageUrl}?w=200&q=60`,
    placeholder: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQtJSEkLzYvLy0vLi44QjhAOEA4Qi4tMkYwRjlDREVPUlVXXF5kaGRoQ0f/2wBDARUXFyAeIB4cHh4oISEmKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAb/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k='
  };
}; 