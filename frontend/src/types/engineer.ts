import { Subcategory } from '../lib/supabase';

export interface Engineer {
  id: string;
  name: string;
  email: string;
  primary_category_id: string;
  years_of_experience: number;
  seniority_level: 'junior' | 'mid' | 'senior' | 'lead' | 'principal';
  hourly_rate?: number;
  availability_status: 'available' | 'unavailable' | 'part-time';
  profile_image_url?: string;
  profile_video_url?: string;
  rating?: number;
  github_url?: string;
  linkedin_url?: string;
  portfolio_url?: string;
  bio?: string;
  skills: Array<{
    skill_name: string;
    proficiency_level: number;
    years_of_experience: number;
  }>;
  subcategories: Array<{
    id: string;
    is_primary: boolean;
    subcategory: Subcategory;
  }>;
  created_at: string;
  updated_at: string;
} 