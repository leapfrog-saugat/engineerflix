export interface EngineeringDiscipline {
  id: string;
  name: string;
  description?: string;
  iconUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface PrimaryCategory {
  id: string;
  disciplineId: string;
  name: string;
  description?: string;
  iconUrl?: string;
  engineerCount?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Subcategory {
  id: string;
  primaryCategoryId: string;
  name: string;
  description?: string;
  type: 'language' | 'role' | 'domain';
  iconUrl?: string;
  engineerCount?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface EngineerSkill {
  engineerId: string;
  skillName: string;
  proficiencyLevel: number;
  yearsOfExperience: number;
}

export interface Engineer {
  id: string;
  name: string;
  email: string;
  primaryCategoryId: string;
  yearsOfExperience: number;
  seniorityLevel: 'junior' | 'mid' | 'senior' | 'lead' | 'principal';
  hourlyRate?: number;
  availabilityStatus: 'available' | 'unavailable' | 'part-time';
  profileImageUrl?: string;
  videoUrl?: string;
  githubUrl?: string;
  linkedinUrl?: string;
  portfolioUrl?: string;
  bio?: string;
  skills: EngineerSkill[];
  subcategories: Array<{
    id: string;
    isPrimary: boolean;
  }>;
  createdAt: Date;
  updatedAt: Date;
}

export interface CategoryStats {
  totalEngineers: number;
  byPrimaryCategory: {
    [key: string]: number;
  };
  bySubcategory: {
    [key: string]: number;
  };
  bySkill: {
    [key: string]: number;
  };
  bySeniority: {
    [key: string]: number;
  };
} 