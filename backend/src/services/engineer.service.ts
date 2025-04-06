import { supabase } from '../lib/supabase';
import { Engineer, EngineerSkill } from '../types/engineer.types';

export class EngineerService {
  async getEngineers(filters?: {
    primaryCategoryId?: string;
    subcategoryId?: string;
    skill?: string;
    seniorityLevel?: string;
    availabilityStatus?: string;
  }): Promise<Engineer[]> {
    let query = supabase
      .from('engineers')
      .select(`
        *,
        skills:engineer_skills(*),
        subcategories:engineer_subcategories(
          id,
          isPrimary,
          subcategory:subcategories(*)
        )
      `);

    if (filters) {
      if (filters.primaryCategoryId) {
        query = query.eq('primaryCategoryId', filters.primaryCategoryId);
      }
      if (filters.subcategoryId) {
        query = query.eq('engineer_subcategories.subcategoryId', filters.subcategoryId);
      }
      if (filters.skill) {
        query = query.eq('engineer_skills.skillName', filters.skill);
      }
      if (filters.seniorityLevel) {
        query = query.eq('seniorityLevel', filters.seniorityLevel);
      }
      if (filters.availabilityStatus) {
        query = query.eq('availabilityStatus', filters.availabilityStatus);
      }
    }

    const { data, error } = await query.order('name');
    if (error) throw error;
    return data;
  }

  async getEngineerById(id: string): Promise<Engineer | null> {
    const { data, error } = await supabase
      .from('engineers')
      .select(`
        *,
        skills:engineer_skills(*),
        subcategories:engineer_subcategories(
          id,
          isPrimary,
          subcategory:subcategories(*)
        )
      `)
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  }

  async createEngineer(
    engineer: Omit<Engineer, 'id' | 'createdAt' | 'updatedAt'>,
    skills: Omit<EngineerSkill, 'engineerId'>[],
    subcategoryIds: Array<{ id: string; isPrimary: boolean }>
  ): Promise<Engineer> {
    const { data: newEngineer, error: engineerError } = await supabase
      .from('engineers')
      .insert([{
        name: engineer.name,
        email: engineer.email,
        primaryCategoryId: engineer.primaryCategoryId,
        yearsOfExperience: engineer.yearsOfExperience,
        seniorityLevel: engineer.seniorityLevel,
        hourlyRate: engineer.hourlyRate,
        availabilityStatus: engineer.availabilityStatus,
        profileImageUrl: engineer.profileImageUrl,
        videoUrl: engineer.videoUrl,
        githubUrl: engineer.githubUrl,
        linkedinUrl: engineer.linkedinUrl,
        portfolioUrl: engineer.portfolioUrl,
        bio: engineer.bio
      }])
      .select()
      .single();

    if (engineerError) throw engineerError;

    // Add skills
    if (skills.length > 0) {
      const { error: skillsError } = await supabase
        .from('engineer_skills')
        .insert(
          skills.map(skill => ({
            engineerId: newEngineer.id,
            ...skill
          }))
        );

      if (skillsError) throw skillsError;
    }

    // Add subcategories
    if (subcategoryIds.length > 0) {
      const { error: subcategoriesError } = await supabase
        .from('engineer_subcategories')
        .insert(
          subcategoryIds.map(sub => ({
            engineerId: newEngineer.id,
            subcategoryId: sub.id,
            isPrimary: sub.isPrimary
          }))
        );

      if (subcategoriesError) throw subcategoriesError;
    }

    return this.getEngineerById(newEngineer.id) as Promise<Engineer>;
  }

  async updateEngineer(
    id: string,
    updates: Partial<Engineer>,
    skills?: Omit<EngineerSkill, 'engineerId'>[],
    subcategoryIds?: Array<{ id: string; isPrimary: boolean }>
  ): Promise<Engineer> {
    const { error: engineerError } = await supabase
      .from('engineers')
      .update(updates)
      .eq('id', id);

    if (engineerError) throw engineerError;

    if (skills) {
      // Delete existing skills
      await supabase
        .from('engineer_skills')
        .delete()
        .eq('engineerId', id);

      // Add new skills
      if (skills.length > 0) {
        const { error: skillsError } = await supabase
          .from('engineer_skills')
          .insert(
            skills.map(skill => ({
              engineerId: id,
              ...skill
            }))
          );

        if (skillsError) throw skillsError;
      }
    }

    if (subcategoryIds) {
      // Delete existing subcategories
      await supabase
        .from('engineer_subcategories')
        .delete()
        .eq('engineerId', id);

      // Add new subcategories
      if (subcategoryIds.length > 0) {
        const { error: subcategoriesError } = await supabase
          .from('engineer_subcategories')
          .insert(
            subcategoryIds.map(sub => ({
              engineerId: id,
              subcategoryId: sub.id,
              isPrimary: sub.isPrimary
            }))
          );

        if (subcategoriesError) throw subcategoriesError;
      }
    }

    return this.getEngineerById(id) as Promise<Engineer>;
  }

  async deleteEngineer(id: string): Promise<void> {
    const { error } = await supabase
      .from('engineers')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }
} 