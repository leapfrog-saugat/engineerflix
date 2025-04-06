import { IsString, IsEmail, IsNumber, IsEnum, IsOptional, IsArray, ValidateNested, Min, Max, IsBoolean } from 'class-validator';
import { Type } from 'class-transformer';

class SkillDto {
  @IsString()
  skill_name: string;

  @IsNumber()
  @Min(1)
  @Max(10)
  proficiency_level: number;

  @IsNumber()
  @Min(0)
  years_of_experience: number;
}

class SubcategoryDto {
  @IsString()
  id: string;

  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsEnum(['language', 'role', 'domain'])
  type: 'language' | 'role' | 'domain';

  @IsString()
  @IsOptional()
  iconUrl?: string;
}

class EngineerSubcategoryDto {
  @IsString()
  id: string;

  @IsBoolean()
  is_primary: boolean;

  @ValidateNested()
  @Type(() => SubcategoryDto)
  subcategory: SubcategoryDto;
}

export class CreateEngineerDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  primary_category_id: string;

  @IsNumber()
  @Min(0)
  years_of_experience: number;

  @IsEnum(['junior', 'mid', 'senior', 'lead', 'principal'])
  seniority_level: 'junior' | 'mid' | 'senior' | 'lead' | 'principal';

  @IsNumber()
  @IsOptional()
  hourly_rate?: number;

  @IsEnum(['available', 'unavailable', 'part-time'])
  availability_status: 'available' | 'unavailable' | 'part-time';

  @IsString()
  @IsOptional()
  profile_image_url?: string;

  @IsString()
  @IsOptional()
  profile_video_url?: string;

  @IsNumber()
  @IsOptional()
  @Min(0)
  @Max(5)
  rating?: number;

  @IsString()
  @IsOptional()
  github_url?: string;

  @IsString()
  @IsOptional()
  linkedin_url?: string;

  @IsString()
  @IsOptional()
  portfolio_url?: string;

  @IsString()
  @IsOptional()
  bio?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SkillDto)
  skills: SkillDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => EngineerSubcategoryDto)
  subcategories: EngineerSubcategoryDto[];
} 