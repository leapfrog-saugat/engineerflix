-- Drop existing tables if they exist
DROP TABLE IF EXISTS engineer_skills;
DROP TABLE IF EXISTS engineer_subcategories;
DROP TABLE IF EXISTS engineers;
DROP TABLE IF EXISTS subcategories;
DROP TABLE IF EXISTS primary_categories;
DROP TABLE IF EXISTS engineering_disciplines;

-- Create engineering_disciplines table
CREATE TABLE IF NOT EXISTS engineering_disciplines (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL UNIQUE,
    description TEXT,
    icon_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create primary_categories table
CREATE TABLE IF NOT EXISTS primary_categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    discipline_id UUID NOT NULL REFERENCES engineering_disciplines(id),
    name TEXT NOT NULL,
    description TEXT,
    icon_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(discipline_id, name)
);

-- Create subcategories table
CREATE TABLE IF NOT EXISTS subcategories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    description TEXT,
    type TEXT CHECK (type IN ('language', 'role', 'domain')),
    icon_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create engineers table
CREATE TABLE IF NOT EXISTS engineers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    primary_category_id UUID NOT NULL REFERENCES primary_categories(id),
    years_of_experience INTEGER NOT NULL,
    seniority_level TEXT CHECK (seniority_level IN ('junior', 'mid', 'senior', 'lead', 'principal')),
    hourly_rate DECIMAL,
    availability_status TEXT CHECK (availability_status IN ('available', 'unavailable', 'part-time')),
    profile_image_url TEXT,
    video_url TEXT,
    github_url TEXT,
    linkedin_url TEXT,
    portfolio_url TEXT,
    bio TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create engineer_skills table
CREATE TABLE IF NOT EXISTS engineer_skills (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    engineer_id UUID NOT NULL REFERENCES engineers(id),
    skill_name TEXT NOT NULL,
    proficiency_level INTEGER CHECK (proficiency_level BETWEEN 1 AND 5),
    years_of_experience INTEGER NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create engineer_subcategories table
CREATE TABLE IF NOT EXISTS engineer_subcategories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    engineer_id UUID NOT NULL REFERENCES engineers(id),
    subcategory_id UUID NOT NULL REFERENCES subcategories(id),
    is_primary BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(engineer_id, subcategory_id)
);

-- Create an update_updated_at function
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for all tables to update updated_at
DROP TRIGGER IF EXISTS update_engineering_disciplines_updated_at ON engineering_disciplines;
CREATE TRIGGER update_engineering_disciplines_updated_at
    BEFORE UPDATE ON engineering_disciplines
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at();

DROP TRIGGER IF EXISTS update_primary_categories_updated_at ON primary_categories;
CREATE TRIGGER update_primary_categories_updated_at
    BEFORE UPDATE ON primary_categories
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at();

DROP TRIGGER IF EXISTS update_subcategories_updated_at ON subcategories;
CREATE TRIGGER update_subcategories_updated_at
    BEFORE UPDATE ON subcategories
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at();

DROP TRIGGER IF EXISTS update_engineers_updated_at ON engineers;
CREATE TRIGGER update_engineers_updated_at
    BEFORE UPDATE ON engineers
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at();

DROP TRIGGER IF EXISTS update_engineer_skills_updated_at ON engineer_skills;
CREATE TRIGGER update_engineer_skills_updated_at
    BEFORE UPDATE ON engineer_skills
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at();

DROP TRIGGER IF EXISTS update_engineer_subcategories_updated_at ON engineer_subcategories;
CREATE TRIGGER update_engineer_subcategories_updated_at
    BEFORE UPDATE ON engineer_subcategories
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at();
