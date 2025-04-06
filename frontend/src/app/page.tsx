'use client';

import React, { useEffect, useState } from 'react';
import EngineerStream from '@/components/EngineerStream';
import NavigationBar from '@/components/NavigationBar';
import FeaturedCarousel from '@/components/FeaturedCarousel';
import { getEngineers, getDisciplines, getPrimaryCategories, PrimaryCategory } from '@/lib/supabase';
import { Engineer } from '@/types/engineer';
import { preloadAllImages } from '@/utils/imageLoader';

export default function Home() {
  const [engineers, setEngineers] = useState<{
    [key: string]: Engineer[];
  }>({});
  const [featuredEngineers, setFeaturedEngineers] = useState<Engineer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState<PrimaryCategory[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Preload all images immediately
    preloadAllImages();

    async function fetchData() {
      try {
        // Get software engineering discipline
        const disciplines = await getDisciplines();
        console.log('Fetched disciplines:', disciplines);
        
        const softwareDiscipline = disciplines.find(d => d.name === 'Software Engineering');
        
        if (!softwareDiscipline) {
          setError('Software Engineering discipline not found');
          setIsLoading(false);
          return;
        }

        console.log('Found software discipline:', softwareDiscipline);

        // Get primary categories
        const primaryCategories = await getPrimaryCategories(softwareDiscipline.id);
        console.log('Fetched primary categories:', primaryCategories);
        
        if (!primaryCategories.length) {
          setError('No primary categories found');
          setIsLoading(false);
          return;
        }

        // Remove any duplicate categories (by name)
        const uniqueCategories = primaryCategories.filter((category, index, self) =>
          index === self.findIndex((c) => c.name === category.name)
        );
        
        setCategories(uniqueCategories);

        // Fetch engineers for each category
        const engineersByCategory: { [key: string]: Engineer[] } = {};
        const allEngineers: Engineer[] = [];

        for (const category of uniqueCategories) {
          console.log('Fetching engineers for category:', category.name);
          const categoryEngineers = await getEngineers(category.id);
          console.log(`Found ${categoryEngineers.length} engineers for ${category.name}`);
          engineersByCategory[category.name] = categoryEngineers;
          allEngineers.push(...categoryEngineers);
        }

        if (!allEngineers.length) {
          setError('No engineers found');
          setIsLoading(false);
          return;
        }

        setEngineers(engineersByCategory);

        // Set featured engineers (up to 5 from each category)
        const featured = allEngineers
          .sort(() => Math.random() - 0.5)
          .slice(0, 10);
        
        setFeaturedEngineers(featured);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to load data');
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">{error}</div>
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
        
        {categories.map(category => (
          <EngineerStream
            key={category.id}
            category={category.name}
            engineers={engineers[category.name] || []}
          />
        ))}
      </div>
    </main>
  );
}
