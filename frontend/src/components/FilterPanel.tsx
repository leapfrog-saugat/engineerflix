import React, { useState, useEffect } from 'react';
import { EngineerFilters, ExperienceLevel, AvailabilityStatus, defaultFilters } from '../types/filters';
import { debounce } from 'lodash';
import { MagnifyingGlassIcon, XMarkIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline';
import * as Slider from '@radix-ui/react-slider';
import { Combobox } from '@headlessui/react';
import { cn } from '@/utils/cn';

interface FilterPanelProps {
  onFiltersChange: (filters: EngineerFilters) => void;
  availableSkills: string[];
  loading?: boolean;
}

const experienceLevels: ExperienceLevel[] = ['all', 'junior', 'mid', 'senior', 'lead'];
const availabilityOptions: AvailabilityStatus[] = ['all', 'available', 'unavailable'];

export const FilterPanel: React.FC<FilterPanelProps> = ({
  onFiltersChange,
  availableSkills,
  loading = false
}) => {
  const [filters, setFilters] = useState<EngineerFilters>(defaultFilters);
  const [skillInput, setSkillInput] = useState('');

  // Debounced filter update
  const debouncedFiltersChange = debounce((newFilters: EngineerFilters) => {
    onFiltersChange(newFilters);
  }, 300);

  // Update filters when any value changes
  useEffect(() => {
    debouncedFiltersChange(filters);
    return () => {
      debouncedFiltersChange.cancel();
    };
  }, [filters]);

  const handleExperienceChange = (level: ExperienceLevel) => {
    setFilters(prev => ({ ...prev, experienceLevel: level }));
  };

  const handleSkillAdd = (skill: string) => {
    if (!filters.skills.includes(skill)) {
      setFilters(prev => ({
        ...prev,
        skills: [...prev.skills, skill]
      }));
    }
    setSkillInput('');
  };

  const handleSkillRemove = (skill: string) => {
    setFilters(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s !== skill)
    }));
  };

  const handleRateRangeChange = (values: number[]) => {
    setFilters(prev => ({
      ...prev,
      rateRange: {
        min: values[0],
        max: values[1]
      }
    }));
  };

  const handleAvailabilityChange = (status: AvailabilityStatus) => {
    setFilters(prev => ({ ...prev, availability: status }));
  };

  const filteredSkills = availableSkills.filter(skill =>
    skill.toLowerCase().includes(skillInput.toLowerCase()) &&
    !filters.skills.includes(skill)
  );

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="relative">
        <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search engineers..."
          className="w-full pl-10 pr-4 py-2.5 bg-[#1C2333]/50 text-white rounded-lg focus:ring-1 focus:ring-red-500 focus:outline-none placeholder-gray-400 text-sm"
          value={filters.searchQuery}
          onChange={e => setFilters(prev => ({ ...prev, searchQuery: e.target.value }))}
        />
      </div>

      {/* Experience Level */}
      <div>
        <h3 className="text-white text-sm font-medium mb-3">Experience Level</h3>
        <div className="flex flex-wrap gap-2">
          {experienceLevels.map(level => (
            <button
              key={level}
              onClick={() => handleExperienceChange(level)}
              className={cn(
                "px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200",
                filters.experienceLevel === level
                  ? "bg-red-500 text-white"
                  : "bg-[#1C2333]/50 text-gray-300 hover:bg-[#1C2333]/70"
              )}
            >
              {level.charAt(0).toUpperCase() + level.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Skills */}
      <div>
        <h3 className="text-white text-sm font-medium mb-3">Skills</h3>
        <div className="space-y-2">
          <div className="flex flex-wrap gap-2">
            {filters.skills.map(skill => (
              <span
                key={skill}
                className="bg-red-500/10 text-red-500 px-3 py-1.5 rounded-full text-sm font-medium flex items-center gap-1"
              >
                {skill}
                <button
                  onClick={() => handleSkillRemove(skill)}
                  className="hover:text-red-400"
                >
                  <XMarkIcon className="w-4 h-4" />
                </button>
              </span>
            ))}
          </div>
          <Combobox
            as="div"
            value={skillInput}
            onChange={handleSkillAdd}
            className="relative"
          >
            <Combobox.Input
              className="w-full px-4 py-2.5 bg-[#1C2333]/50 text-white rounded-lg focus:ring-1 focus:ring-red-500 focus:outline-none placeholder-gray-400 text-sm"
              placeholder="Add skills..."
              onChange={e => setSkillInput(e.target.value)}
            />
            {skillInput && filteredSkills.length > 0 && (
              <Combobox.Options className="absolute z-10 w-full mt-1 bg-[#1C2333]/90 backdrop-blur-sm rounded-lg shadow-xl max-h-48 overflow-y-auto py-1">
                {filteredSkills.map(skill => (
                  <Combobox.Option
                    key={skill}
                    value={skill}
                    className={({ active }) =>
                      cn(
                        "cursor-pointer select-none px-4 py-2 text-sm",
                        active ? "bg-[#2C3444]/50 text-white" : "text-gray-300"
                      )
                    }
                  >
                    {skill}
                  </Combobox.Option>
                ))}
              </Combobox.Options>
            )}
          </Combobox>
        </div>
      </div>

      {/* Rate Range */}
      <div>
        <h3 className="text-white text-sm font-medium mb-3">Hourly Rate (USD)</h3>
        <div className="px-2 pt-2">
          <Slider.Root
            className="relative flex items-center select-none touch-none w-full h-5"
            value={[filters.rateRange.min, filters.rateRange.max]}
            onValueChange={handleRateRangeChange}
            min={0}
            max={500}
            step={10}
            minStepsBetweenThumbs={1}
          >
            <Slider.Track className="bg-[#1C2333]/50 relative grow rounded-full h-[3px]">
              <Slider.Range className="absolute bg-red-500 rounded-full h-full" />
            </Slider.Track>
            <Slider.Thumb
              className="block w-5 h-5 bg-white rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              aria-label="Minimum rate"
            />
            <Slider.Thumb
              className="block w-5 h-5 bg-white rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              aria-label="Maximum rate"
            />
          </Slider.Root>
          <div className="flex justify-between mt-2 text-sm text-gray-400">
            <span>${filters.rateRange.min}</span>
            <span>${filters.rateRange.max}</span>
          </div>
        </div>
      </div>

      {/* Availability */}
      <div>
        <h3 className="text-white text-sm font-medium mb-3">Availability</h3>
        <div className="flex flex-wrap gap-2">
          {availabilityOptions.map(status => (
            <button
              key={status}
              onClick={() => handleAvailabilityChange(status)}
              className={cn(
                "px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200",
                filters.availability === status
                  ? "bg-red-500 text-white"
                  : "bg-[#1C2333]/50 text-gray-300 hover:bg-[#1C2333]/70"
              )}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="absolute inset-0 bg-[#0B0F17]/50 backdrop-blur-sm flex items-center justify-center rounded-lg">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500" />
        </div>
      )}
    </div>
  );
};

export default FilterPanel; 