import { Injectable } from '@nestjs/common';
import { Engineer } from './entities/engineer.entity';
import { createClient } from '@supabase/supabase-js';

@Injectable()
export class EngineersService {
  private supabase;

  constructor() {
    if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_KEY) {
      throw new Error('Missing Supabase credentials');
    }
    this.supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_KEY,
    );
  }

  async findAll(): Promise<Engineer[]> {
    const { data, error } = await this.supabase
      .from('engineers')
      .select('*');

    if (error) {
      throw error;
    }

    return data;
  }

  async findBySpecialty(specialty: string): Promise<Engineer[]> {
    const { data, error } = await this.supabase
      .from('engineers')
      .select('*')
      .eq('specialty', specialty);

    if (error) {
      throw error;
    }

    return data;
  }

  async findOne(id: string): Promise<Engineer> {
    const { data, error } = await this.supabase
      .from('engineers')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      throw error;
    }

    return data;
  }

  async create(engineer: Partial<Engineer>): Promise<Engineer> {
    const { data, error } = await this.supabase
      .from('engineers')
      .insert([engineer])
      .select()
      .single();

    if (error) {
      throw error;
    }

    return data;
  }

  async update(id: string, engineer: Partial<Engineer>): Promise<Engineer> {
    const { data, error } = await this.supabase
      .from('engineers')
      .update(engineer)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      throw error;
    }

    return data;
  }

  async remove(id: string): Promise<void> {
    const { error } = await this.supabase
      .from('engineers')
      .delete()
      .eq('id', id);

    if (error) {
      throw error;
    }
  }
} 