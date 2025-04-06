import { supabase } from '../lib/supabase';
import { EngineeringDiscipline, PrimaryCategory, Subcategory } from '../types/engineer.types';
import { CategoryStats, SubcategoryCount, SeniorityCount, SkillCount } from '../types/category.types';

export class CategoryService {
  async getDisciplines(): Promise<EngineeringDiscipline[]> {
    const { data, error } = await supabase
      .from('engineering_disciplines')
      .select('*')
      .order('name');
    
    if (error) throw error;
    return data;
  }

  async getPrimaryCategories(disciplineId: string): Promise<PrimaryCategory[]> {
    const { data, error } = await supabase
      .from('primary_categories')
      .select('*, engineering_disciplines!inner(*)')
      .eq('disciplineId', disciplineId)
      .order('name');
    
    if (error) throw error;
    return data;
  }

  async getSubcategories(primaryCategoryId: string): Promise<Subcategory[]> {
    const { data, error } = await supabase
      .from('subcategories')
      .select('*')
      .eq('primaryCategoryId', primaryCategoryId)
      .order('type', { ascending: true })
      .order('name', { ascending: true });
    
    if (error) throw error;
    return data;
  }

  async getCategoryStats(primaryCategoryId: string): Promise<CategoryStats> {
    // Get total engineers in the category
    const { count: totalEngineers, error: countError } = await supabase
      .from('engineers')
      .select('*', { count: 'exact' })
      .eq('primaryCategoryId', primaryCategoryId);

    if (countError) throw countError;

    // Get counts by subcategory
    const { data: subcategoryCounts, error: subError } = await supabase
      .rpc('get_subcategory_counts', { category_id: primaryCategoryId });

    if (subError) throw subError;

    // Get counts by seniority level
    const { data: seniorityCount, error: seniorityError } = await supabase
      .rpc('get_seniority_counts', { category_id: primaryCategoryId });

    if (seniorityError) throw seniorityError;

    // Get counts by skill
    const { data: skillCounts, error: skillError } = await supabase
      .rpc('get_skill_counts', { category_id: primaryCategoryId });

    if (skillError) throw skillError;

    // Format the stats
    const stats: CategoryStats = {
      totalEngineers: totalEngineers || 0,
      byPrimaryCategory: { [primaryCategoryId]: totalEngineers || 0 },
      bySubcategory: Object.fromEntries(
        (subcategoryCounts as SubcategoryCount[]).map(sc => [sc.id, sc.count])
      ),
      bySkill: Object.fromEntries(
        (skillCounts as SkillCount[]).map(sc => [sc.skill_name, sc.count])
      ),
      bySeniority: Object.fromEntries(
        (seniorityCount as SeniorityCount[]).map(sc => [sc.seniority_level, sc.count])
      )
    };

    return stats;
  }

  async createSubcategory(subcategory: Omit<Subcategory, 'id' | 'createdAt' | 'updatedAt'>): Promise<Subcategory> {
    const { data, error } = await supabase
      .from('subcategories')
      .insert([subcategory])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  async updateSubcategory(id: string, updates: Partial<Subcategory>): Promise<Subcategory> {
    const { data, error } = await supabase
      .from('subcategories')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  async deleteSubcategory(id: string): Promise<void> {
    const { error } = await supabase
      .from('subcategories')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }
} 