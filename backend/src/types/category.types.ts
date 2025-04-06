export interface SubcategoryCount {
  id: string;
  name: string;
  count: number;
}

export interface SeniorityCount {
  seniority_level: string;
  count: number;
}

export interface SkillCount {
  skill_name: string;
  count: number;
}

export interface CategoryStats {
  totalEngineers: number;
  byPrimaryCategory: { [key: string]: number };
  bySubcategory: { [key: string]: number };
  bySkill: { [key: string]: number };
  bySeniority: { [key: string]: number };
} 