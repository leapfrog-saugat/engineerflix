import React, { useEffect, useRef, useState } from 'react';
import { videoService, VideoMetadata } from '../services/videoService';
import styles from './OptimizedVideo.module.css';

interface OptimizedVideoProps {
  src: string;
  poster?: string;
  className?: string;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
  playsInline?: boolean;
  controls?: boolean;
  quality?: 'low' | 'medium' | 'high';
  onLoad?: () => void;
  onError?: (error: Error) => void;
}

const OptimizedVideo: React.FC<OptimizedVideoProps> = ({
  src,
  poster,
  className = '',
  autoPlay = false,
  muted = true,
  loop = true,
  playsInline = true,
  controls = false,
  quality = 'medium',
  onLoad,
  onError
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [metadata, setMetadata] = useState<VideoMetadata | null>(null);
  const [optimizedSrc, setOptimizedSrc] = useState<string>('');
  const [generatedPoster, setGeneratedPoster] = useState<string>('');
  const [dataUsage, setDataUsage] = useState<number>(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const initializeVideo = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Get video metadata
        const videoMetadata = await videoService.getVideoMetadata(src);
        setMetadata(videoMetadata);

        // Calculate data usage
        const usage = videoService.calculateDataUsage(videoMetadata.duration, quality);
        setDataUsage(usage);

        // Generate thumbnail if no poster is provided
        if (!poster) {
          const thumbnail = await videoService.generateThumbnail(src);
          setGeneratedPoster(thumbnail);
        }

        // Optimize video URL
        const optimized = await videoService.optimizeVideo(src, { quality });
        setOptimizedSrc(optimized);

        setIsLoading(false);
        onLoad?.();
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Failed to initialize video');
        setError(error);
        onError?.(error);
        setIsLoading(false);
      }
    };

    initializeVideo();
  }, [src, quality, poster, onLoad, onError]);

  if (!isVisible) {
    return (
      <div className={`${styles['video-placeholder']} ${className}`}>
        <div className={styles['loading-spinner']} />
      </div>
    );
  }

  if (error) {
    return (
      <div className={`${styles['video-error']} ${className}`}>
        <p>Error loading video: {error.message}</p>
        <button onClick={() => setError(null)}>Retry</button>
      </div>
    );
  }

  return (
    <div className={`${styles['video-container']} ${className}`}>
      {isLoading && (
        <div className={styles['loading-overlay']}>
          <div className={styles['loading-spinner']} />
          <p>Loading video...</p>
        </div>
      )}
      <video
        ref={videoRef}
        src={optimizedSrc || src}
        poster={poster || generatedPoster}
        className={`${styles['video-player']} ${isLoading ? styles.loading : ''}`}
        autoPlay={autoPlay}
        muted={muted}
        loop={loop}
        playsInline={playsInline}
        controls={controls}
        onError={(e) => {
          const error = new Error('Video playback error');
          setError(error);
          onError?.(error);
        }}
      />
      {dataUsage > 0 && (
        <div className={styles['data-usage']}>
          Estimated data usage: {dataUsage}MB
        </div>
      )}
    </div>
  );
};

export default OptimizedVideo; 