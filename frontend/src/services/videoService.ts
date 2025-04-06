import { createClient } from '@supabase/supabase-js';

// Check if we're in a browser environment and if the environment variables are available
const supabaseUrl = typeof window !== 'undefined' ? process.env.NEXT_PUBLIC_SUPABASE_URL || '' : '';
const supabaseAnonKey = typeof window !== 'undefined' ? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '' : '';

// Only create the client if we have the required environment variables
const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export interface VideoMetadata {
  duration: number;
  width: number;
  height: number;
  bitrate: number;
  format: string;
}

export interface VideoOptimizationOptions {
  maxWidth?: number;
  maxHeight?: number;
  quality?: 'low' | 'medium' | 'high';
  format?: 'mp4' | 'webm';
}

export const videoService = {
  /**
   * Generate a thumbnail from a video
   */
  async generateThumbnail(videoUrl: string, timeInSeconds: number = 1): Promise<string> {
    try {
      // Check if we're in a browser environment
      if (typeof window === 'undefined') {
        console.warn('Thumbnail generation is only available in browser environments');
        return '';
      }

      // Check if Supabase is available
      if (!supabase) {
        console.warn('Supabase client is not available');
        return '';
      }

      // Create a video element to capture the frame
      const video = document.createElement('video');
      video.crossOrigin = 'anonymous';
      video.src = videoUrl;
      
      // Wait for the video to load
      await new Promise((resolve, reject) => {
        const timeout = setTimeout(() => {
          reject(new Error('Video load timeout'));
        }, 10000); // 10 second timeout
        
        video.onloadeddata = () => {
          clearTimeout(timeout);
          resolve(true);
        };
        video.onerror = (error) => {
          clearTimeout(timeout);
          reject(error);
        };
      });
      
      // Seek to the specified time
      video.currentTime = timeInSeconds;
      
      // Wait for the seek to complete
      await new Promise((resolve, reject) => {
        const timeout = setTimeout(() => {
          reject(new Error('Video seek timeout'));
        }, 5000); // 5 second timeout
        
        video.onseeked = () => {
          clearTimeout(timeout);
          resolve(true);
        };
        video.onerror = (error) => {
          clearTimeout(timeout);
          reject(error);
        };
      });
      
      // Create a canvas to draw the frame
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      // Draw the frame
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        throw new Error('Could not get canvas context');
      }
      
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      
      // Convert to base64
      const thumbnailUrl = canvas.toDataURL('image/jpeg', 0.8);
      
      // Upload to Supabase Storage
      const fileName = `thumbnails/${Date.now()}.jpg`;
      const { data, error } = await supabase.storage
        .from('videos')
        .upload(fileName, thumbnailUrl, {
          contentType: 'image/jpeg',
          upsert: true
        });
        
      if (error) throw error;
      
      // Get the public URL
      const { data: { publicUrl } } = supabase.storage
        .from('videos')
        .getPublicUrl(fileName);
        
      return publicUrl;
    } catch (error) {
      console.error('Error generating thumbnail:', error);
      // Return a default thumbnail URL or empty string
      return '';
    }
  },

  /**
   * Get video metadata
   */
  async getVideoMetadata(videoUrl: string): Promise<VideoMetadata> {
    return new Promise((resolve, reject) => {
      // Check if we're in a browser environment
      if (typeof window === 'undefined') {
        resolve({
          duration: 0,
          width: 0,
          height: 0,
          bitrate: 0,
          format: 'mp4'
        });
        return;
      }
      
      const video = document.createElement('video');
      video.src = videoUrl;
      
      const timeout = setTimeout(() => {
        reject(new Error('Video metadata load timeout'));
      }, 10000); // 10 second timeout
      
      video.onloadedmetadata = () => {
        clearTimeout(timeout);
        resolve({
          duration: video.duration,
          width: video.videoWidth,
          height: video.videoHeight,
          bitrate: 0, // This requires additional processing
          format: videoUrl.split('.').pop() || 'mp4'
        });
      };
      
      video.onerror = (error) => {
        clearTimeout(timeout);
        reject(error);
      };
    });
  },

  /**
   * Optimize video for different qualities
   */
  async optimizeVideo(
    videoUrl: string,
    options: VideoOptimizationOptions = {}
  ): Promise<string> {
    const {
      maxWidth = 1920,
      maxHeight = 1080,
      quality = 'high',
      format = 'mp4'
    } = options;

    // In a real implementation, this would use a video processing service
    // For now, we'll return the original URL with quality parameters
    const baseUrl = videoUrl.split('?')[0];
    return `${baseUrl}?quality=${quality}&format=${format}&maxWidth=${maxWidth}&maxHeight=${maxHeight}`;
  },

  /**
   * Calculate estimated data usage
   */
  calculateDataUsage(duration: number, quality: 'low' | 'medium' | 'high'): number {
    // Approximate bitrates in Mbps
    const bitrates = {
      low: 0.5,
      medium: 1.5,
      high: 4
    };
    
    // Convert duration to hours and calculate data usage in MB
    const hours = duration / 3600;
    const dataUsageMB = (bitrates[quality] * 1000 * hours) / 8;
    
    return Math.round(dataUsageMB);
  }
}; 