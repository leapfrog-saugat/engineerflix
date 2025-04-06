import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Engineer {
  id: string;
  name: string;
  specialty: string;
  skills: string[];
  rate: string;
  availability: string;
  videoUrl: string;
  imageUrl: string;
  created_at: string;
  description: string;
}

export async function getEngineers(category: string): Promise<Engineer[]> {
  const { data, error } = await supabase
    .from('engineers')
    .select('*')
    .eq('specialty', category);

  if (error) {
    console.error('Error fetching engineers:', error);
    return [];
  }

  return data || [];
} 