'use client';

import React, { useEffect, useState } from 'react';
import EngineerStream from '@/components/EngineerStream';
import NavigationBar from '@/components/NavigationBar';
import HeroSection from '@/components/HeroSection';
import FilterPanel from '@/components/FilterPanel';
import { getEngineers, getDisciplines, getPrimaryCategories } from '@/lib/supabase';
import { Engineer } from '@/types/engineer';
import { preloadAllImages } from '@/utils/imageLoader';
import { EngineerFilters, defaultFilters } from '@/types/filters';
import { filterEngineers } from '@/utils/filterEngineers';

interface CategoryEngineers {
  categoryName: string;
  engineers: Engineer[];
}

export default function Home() {
  const [engineersByCategory, setEngineersByCategory] = useState<CategoryEngineers[]>([]);
  const [filters, setFilters] = useState<EngineerFilters>(defaultFilters);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Preload all images immediately
    preloadAllImages();

    async function fetchData() {
      try {
        // Get software engineering discipline
        const disciplines = await getDisciplines();
        const softwareDiscipline = disciplines.find(d => d.name === 'Software Engineering');
        
        if (!softwareDiscipline) {
          setError('Software Engineering discipline not found');
          setIsLoading(false);
          return;
        }

        // Get primary categories
        const primaryCategories = await getPrimaryCategories(softwareDiscipline.id);
        
        if (!primaryCategories.length) {
          setError('No primary categories found');
          setIsLoading(false);
          return;
        }

        // Fetch engineers for each category
        const categorizedEngineers: CategoryEngineers[] = [];
        for (const category of primaryCategories) {
          const categoryEngineers = await getEngineers(category.id);
          if (categoryEngineers.length > 0) {
            categorizedEngineers.push({
              categoryName: category.name,
              engineers: categoryEngineers
            });
          }
        }

        if (categorizedEngineers.length === 0) {
          setError('No engineers found');
          setIsLoading(false);
          return;
        }

        setEngineersByCategory(categorizedEngineers);
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

  // Get all engineers for hero section and available skills
  const allEngineers = engineersByCategory.flatMap(category => category.engineers);
  const availableSkills = Array.from(new Set(
    allEngineers.flatMap(engineer => 
      engineer.skills.map(skill => skill.skill_name)
    )
  )).sort();

  // Apply filters to each category
  const filteredEngineersByCategory = engineersByCategory.map(category => ({
    ...category,
    engineers: filterEngineers(category.engineers, filters)
  })).filter(category => category.engineers.length > 0);

  return (
    <main className="min-h-screen bg-[#0B0F17] relative">
      <NavigationBar />
      {allEngineers.length > 0 && (
        <HeroSection engineer={allEngineers[0]} />
      )}
      <div className="relative z-10 max-w-[1400px] mx-auto px-8 py-6 space-y-12">
        <div className="pt-4">
          <FilterPanel
            onFiltersChange={setFilters}
            availableSkills={availableSkills}
            loading={isLoading}
          />
        </div>
        {filteredEngineersByCategory.map(category => (
          <EngineerStream 
            key={category.categoryName}
            engineers={category.engineers}
            title={category.categoryName}
            showFilters={false}
          />
        ))}
      </div>
    </main>
  );
}
