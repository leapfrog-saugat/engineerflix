export type ExperienceLevel = 'junior' | 'mid' | 'senior' | 'lead' | 'all';
export type AvailabilityStatus = 'available' | 'unavailable' | 'all';

export interface RateRange {
  min: number;
  max: number;
}

export interface LocationFilter {
  timezone?: string;
  country?: string;
  region?: string;
}

export interface EngineerFilters {
  experienceLevel: ExperienceLevel;
  skills: string[];
  location: LocationFilter;
  rateRange: RateRange;
  availability: AvailabilityStatus;
  searchQuery: string;
}

export const defaultFilters: EngineerFilters = {
  experienceLevel: 'all',
  skills: [],
  location: {},
  rateRange: { min: 0, max: 500 },
  availability: 'all',
  searchQuery: ''
}; 