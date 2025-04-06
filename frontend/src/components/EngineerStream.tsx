import React, { useState, useEffect } from 'react';
import { Engineer } from '../types/engineer';
import { EngineerFilters, defaultFilters } from '../types/filters';
import EngineerCard from './EngineerCard';
import FilterPanel from './FilterPanel';
import { filterEngineers } from '../utils/filterEngineers';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

interface EngineerStreamProps {
  engineers: Engineer[];
  title?: string;
  showFilters?: boolean;
  onContactEngineer?: (engineer: Engineer, type: 'email' | 'phone' | 'calendar') => void;
}

const EngineerStream: React.FC<EngineerStreamProps> = ({
  engineers,
  title = 'Engineers',
  showFilters = true,
  onContactEngineer
}) => {
  const [filters, setFilters] = useState<EngineerFilters>(defaultFilters);
  const [filteredEngineers, setFilteredEngineers] = useState<Engineer[]>(engineers);
  const [loading, setLoading] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  // Get all unique skills from engineers
  const availableSkills = Array.from(new Set(
    engineers.flatMap(engineer => 
      engineer.skills.map(skill => skill.skill_name)
    )
  )).sort();

  // Apply filters when they change
  useEffect(() => {
    setLoading(true);
    // Simulate network delay for smooth loading state
    const timeoutId = setTimeout(() => {
      const filtered = filterEngineers(engineers, filters);
      setFilteredEngineers(filtered);
      setLoading(false);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [filters, engineers]);

  const handleScroll = (direction: 'left' | 'right') => {
    const container = document.getElementById('engineer-stream');
    if (container) {
      const scrollAmount = direction === 'left' ? -400 : 400;
      const newPosition = scrollPosition + scrollAmount;
      container.scrollTo({
        left: newPosition,
        behavior: 'smooth'
      });
      setScrollPosition(newPosition);
    }
  };

  const handleContactEngineer = (engineer: Engineer, type: 'email' | 'phone' | 'calendar') => {
    onContactEngineer?.(engineer, type);
  };

  return (
    <div className="space-y-6">
      {/* Header and Navigation */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">{title}</h2>
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleScroll('left')}
            className="p-2 rounded-full bg-gray-800/50 text-white hover:bg-gray-700/50 transition-colors"
            aria-label="Scroll left"
          >
            <ChevronLeftIcon className="w-5 h-5" />
          </button>
          <button
            onClick={() => handleScroll('right')}
            className="p-2 rounded-full bg-gray-800/50 text-white hover:bg-gray-700/50 transition-colors"
            aria-label="Scroll right"
          >
            <ChevronRightIcon className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Filter Panel */}
      {showFilters && (
        <FilterPanel
          onFiltersChange={setFilters}
          availableSkills={availableSkills}
          loading={loading}
        />
      )}

      {/* Engineers Grid */}
      <div
        id="engineer-stream"
        className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scroll-smooth hide-scrollbar"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          WebkitOverflowScrolling: 'touch'
        }}
      >
        {filteredEngineers.map(engineer => (
          <div key={engineer.id} className="snap-start">
            <EngineerCard
              engineer={engineer}
              onContact={type => handleContactEngineer(engineer, type)}
            />
          </div>
        ))}
        {filteredEngineers.length === 0 && !loading && (
          <div className="flex items-center justify-center w-full min-h-[300px] text-gray-400">
            No engineers found matching your criteria
          </div>
        )}
      </div>
    </div>
  );
};

export default EngineerStream; 