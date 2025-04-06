import { Engineer } from '../types/engineer';
import { EngineerFilters } from '../types/filters';

const getExperienceLevel = (yearsOfExperience: number) => {
  if (yearsOfExperience < 3) return 'junior';
  if (yearsOfExperience < 5) return 'mid';
  if (yearsOfExperience < 8) return 'senior';
  return 'lead';
};

export const filterEngineers = (engineers: Engineer[], filters: EngineerFilters): Engineer[] => {
  return engineers.filter(engineer => {
    // Experience Level Filter
    if (filters.experienceLevel !== 'all') {
      const level = getExperienceLevel(engineer.years_of_experience);
      if (level !== filters.experienceLevel) return false;
    }

    // Skills Filter
    if (filters.skills.length > 0) {
      const engineerSkills = engineer.skills.map(s => s.skill_name.toLowerCase());
      const requiredSkills = filters.skills.map(s => s.toLowerCase());
      if (!requiredSkills.every(skill => engineerSkills.includes(skill))) {
        return false;
      }
    }

    // Rate Range Filter
    const rate = engineer.hourly_rate || 0;
    if (rate < filters.rateRange.min || rate > filters.rateRange.max) {
      return false;
    }

    // Availability Filter
    if (filters.availability !== 'all' && engineer.availability_status !== filters.availability) {
      return false;
    }

    // Search Query Filter
    if (filters.searchQuery) {
      const searchLower = filters.searchQuery.toLowerCase();
      const searchableText = [
        engineer.name,
        engineer.subcategories.map(sub => sub.subcategory.name).join(' '),
        engineer.skills.map(s => s.skill_name).join(' ')
      ].join(' ').toLowerCase();

      if (!searchableText.includes(searchLower)) {
        return false;
      }
    }

    return true;
  });
}; 