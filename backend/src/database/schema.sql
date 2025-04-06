-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Engineering Disciplines (top-level categories)
CREATE TABLE engineering_disciplines (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    icon_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Primary Categories (e.g., Software Developer, DevOps, etc.)
CREATE TABLE primary_categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    discipline_id UUID REFERENCES engineering_disciplines(id),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    icon_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Subcategories (e.g., JavaScript Developer, Python Developer, etc.)
CREATE TABLE subcategories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    primary_category_id UUID REFERENCES primary_categories(id),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    type VARCHAR(50) NOT NULL, -- 'language', 'role', 'domain', etc.
    icon_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Engineers table with enhanced categorization
CREATE TABLE engineers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    primary_category_id UUID REFERENCES primary_categories(id),
    years_of_experience INTEGER,
    seniority_level VARCHAR(50), -- junior, mid, senior, lead, etc.
    hourly_rate DECIMAL(10, 2),
    availability_status VARCHAR(50),
    profile_image_url TEXT,
    video_url TEXT,
    github_url TEXT,
    linkedin_url TEXT,
    portfolio_url TEXT,
    bio TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Engineer Skills (many-to-many relationship)
CREATE TABLE engineer_skills (
    engineer_id UUID REFERENCES engineers(id),
    skill_name VARCHAR(255),
    proficiency_level INTEGER CHECK (proficiency_level BETWEEN 1 AND 5),
    years_of_experience DECIMAL(4, 1),
    PRIMARY KEY (engineer_id, skill_name)
);

-- Engineer Subcategories (many-to-many relationship)
CREATE TABLE engineer_subcategories (
    engineer_id UUID REFERENCES engineers(id),
    subcategory_id UUID REFERENCES subcategories(id),
    is_primary BOOLEAN DEFAULT false,
    PRIMARY KEY (engineer_id, subcategory_id)
);

-- Insert initial engineering discipline
INSERT INTO engineering_disciplines (name, description) VALUES
('Software Engineering', 'All software-related engineering roles');

-- Insert primary categories
INSERT INTO primary_categories (discipline_id, name, description) VALUES
((SELECT id FROM engineering_disciplines WHERE name = 'Software Engineering'), 'Software Developer', 'Develops software applications and systems'),
((SELECT id FROM engineering_disciplines WHERE name = 'Software Engineering'), 'DevOps Engineer', 'Manages deployment, scaling, and operations of applications'),
((SELECT id FROM engineering_disciplines WHERE name = 'Software Engineering'), 'QA Engineer', 'Ensures software quality through testing and automation'),
((SELECT id FROM engineering_disciplines WHERE name = 'Software Engineering'), 'Data Engineer', 'Designs and maintains data processing systems'),
((SELECT id FROM engineering_disciplines WHERE name = 'Software Engineering'), 'AI/ML Engineer', 'Develops machine learning and AI solutions');

-- Insert subcategories for Software Developers
INSERT INTO subcategories (primary_category_id, name, description, type) VALUES
-- By Language
((SELECT id FROM primary_categories WHERE name = 'Software Developer'), 'JavaScript Developer', 'Specializes in JavaScript and its ecosystem', 'language'),
((SELECT id FROM primary_categories WHERE name = 'Software Developer'), 'Python Developer', 'Specializes in Python development', 'language'),
((SELECT id FROM primary_categories WHERE name = 'Software Developer'), 'Java Developer', 'Specializes in Java development', 'language'),
((SELECT id FROM primary_categories WHERE name = 'Software Developer'), 'Go Developer', 'Specializes in Go development', 'language'),
((SELECT id FROM primary_categories WHERE name = 'Software Developer'), 'Ruby Developer', 'Specializes in Ruby development', 'language'),

-- By Role
((SELECT id FROM primary_categories WHERE name = 'Software Developer'), 'Frontend Developer', 'Specializes in client-side development', 'role'),
((SELECT id FROM primary_categories WHERE name = 'Software Developer'), 'Backend Developer', 'Specializes in server-side development', 'role'),
((SELECT id FROM primary_categories WHERE name = 'Software Developer'), 'Full-Stack Developer', 'Capable of end-to-end development', 'role'),
((SELECT id FROM primary_categories WHERE name = 'Software Developer'), 'Mobile Developer', 'Specializes in mobile app development', 'role'),
((SELECT id FROM primary_categories WHERE name = 'Software Developer'), 'Systems Developer', 'Specializes in systems programming', 'role'),

-- By Domain
((SELECT id FROM primary_categories WHERE name = 'Software Developer'), 'Web Developer', 'Specializes in web applications', 'domain'),
((SELECT id FROM primary_categories WHERE name = 'Software Developer'), 'Cloud Developer', 'Specializes in cloud-native applications', 'domain'),
((SELECT id FROM primary_categories WHERE name = 'Software Developer'), 'Game Developer', 'Specializes in game development', 'domain'),
((SELECT id FROM primary_categories WHERE name = 'Software Developer'), 'Embedded Developer', 'Specializes in embedded systems', 'domain'),
((SELECT id FROM primary_categories WHERE name = 'Software Developer'), 'Security Developer', 'Specializes in security applications', 'domain');

-- Create indexes for better query performance
CREATE INDEX idx_engineers_primary_category ON engineers(primary_category_id);
CREATE INDEX idx_subcategories_primary_category ON subcategories(primary_category_id);
CREATE INDEX idx_engineer_subcategories_engineer ON engineer_subcategories(engineer_id);
CREATE INDEX idx_engineer_skills_engineer ON engineer_skills(engineer_id); 