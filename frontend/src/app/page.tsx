'use client';

import React, { useEffect, useState } from 'react';
import EngineerStream from '@/components/EngineerStream';
import NavigationBar from '@/components/NavigationBar';
import FeaturedCarousel from '@/components/FeaturedCarousel';
import { getEngineers, Engineer } from '@/lib/supabase';
import { preloadAllImages } from '@/utils/imageLoader';

export default function Home() {
  const [engineers, setEngineers] = useState<{
    software: Engineer[];
    mechanical: Engineer[];
  }>({
    software: [],
    mechanical: [],
  });
  const [featuredEngineers, setFeaturedEngineers] = useState<Engineer[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Preload all images immediately
    preloadAllImages();

    async function fetchEngineers() {
      try {
        const [softwareEngineers, mechanicalEngineers] = await Promise.all([
          getEngineers('Software Engineer'),
          getEngineers('Mechanical Engineer'),
        ]);

        setEngineers({
          software: softwareEngineers,
          mechanical: mechanicalEngineers,
        });

        // Set featured engineers (up to 5 from each category)
        const featured = [
          ...softwareEngineers.slice(0, 5),
          ...mechanicalEngineers.slice(0, 5)
        ];
        
        // Shuffle the featured engineers for variety
        const shuffled = [...featured].sort(() => Math.random() - 0.5);
        setFeaturedEngineers(shuffled);
      } catch (error) {
        console.error('Error fetching engineers:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchEngineers();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-900">
      <NavigationBar />
      
      {featuredEngineers.length > 0 && (
        <FeaturedCarousel engineers={featuredEngineers} />
      )}
      
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-white mb-6">EngineerFlix</h2>
        
        <EngineerStream
          category="Software Engineers"
          engineers={engineers.software}
        />
        
        <EngineerStream
          category="Mechanical Engineers"
          engineers={engineers.mechanical}
        />
      </div>
    </main>
  );
}
