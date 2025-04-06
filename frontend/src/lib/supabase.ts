import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface EngineeringDiscipline {
  id: string;
  name: string;
  description?: string;
  iconUrl?: string;
}

export interface PrimaryCategory {
  id: string;
  discipline_id: string;
  name: string;
  description?: string;
  icon_url?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Subcategory {
  id: string;
  name: string;
  description?: string;
  type: 'language' | 'role' | 'domain';
  iconUrl?: string;
}

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
  video_url?: string;
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

export async function getDisciplines(): Promise<EngineeringDiscipline[]> {
  const { data, error } = await supabase
    .from('engineering_disciplines')
    .select('*')
    .order('name');

  if (error) {
    console.error('Error fetching disciplines:', error.message);
    console.error('Error details:', error);
    return [];
  }

  if (!data) {
    console.error('No data returned from disciplines query');
    return [];
  }

  console.log('Fetched disciplines:', data);
  return data;
}

export async function getPrimaryCategories(disciplineId: string): Promise<PrimaryCategory[]> {
  const { data, error } = await supabase
    .from('primary_categories')
    .select('*')
    .eq('discipline_id', disciplineId)
    .order('name');

  if (error) {
    console.error('Error fetching primary categories:', error);
    return [];
  }

  if (!data) {
    console.error('No data returned from primary categories query');
    return [];
  }

  console.log('Fetched primary categories:', data);
  return data;
}

export async function getEngineers(categoryId: string): Promise<Engineer[]> {
  const { data, error } = await supabase
    .from('engineers')
    .select(`
      *,
      skills:engineer_skills(*),
      subcategories:engineer_subcategories(
        id,
        is_primary,
        subcategory:subcategories(*)
      )
    `)
    .eq('primary_category_id', categoryId);

  if (error) {
    console.error('Error fetching engineers:', error);
    console.error('Error details:', error);
    return [];
  }

  if (!data) {
    console.error('No data returned from engineers query');
    return [];
  }

  console.log('Fetched engineers:', data);
  return data;
} 