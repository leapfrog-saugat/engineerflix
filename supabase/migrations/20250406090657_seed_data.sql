-- Insert initial data for engineering disciplines
INSERT INTO engineering_disciplines (name, description) VALUES
('Software Engineering', 'Development of software systems and applications'),
('Mechanical Engineering', 'Design and manufacturing of mechanical systems'),
('Electrical Engineering', 'Design and implementation of electrical systems');

-- Insert primary categories for Software Engineering
WITH software_eng AS (
    SELECT id FROM engineering_disciplines WHERE name = 'Software Engineering'
)
INSERT INTO primary_categories (discipline_id, name, description) 
SELECT 
    software_eng.id,
    category_name,
    category_description
FROM software_eng,
(VALUES 
    ('Frontend Development', 'Development of user interfaces and client-side applications'),
    ('Backend Development', 'Development of server-side applications and APIs'),
    ('Full Stack Development', 'End-to-end development of web applications'),
    ('Mobile Development', 'Development of mobile applications'),
    ('DevOps Engineering', 'Infrastructure and deployment automation'),
    ('Data Engineering', 'Data pipeline and infrastructure development'),
    ('Machine Learning Engineering', 'Development of machine learning systems'),
    ('Security Engineering', 'Development of secure systems and security tooling')
) AS categories(category_name, category_description);

-- Insert common subcategories
INSERT INTO subcategories (name, description, type) VALUES
-- Languages
('JavaScript', 'A programming language that enables interactive web pages', 'language'),
('TypeScript', 'A typed superset of JavaScript', 'language'),
('Python', 'A versatile programming language', 'language'),
('Java', 'A class-based, object-oriented programming language', 'language'),
('Go', 'A statically typed, compiled programming language', 'language'),
('Rust', 'A systems programming language', 'language'),

-- Roles
('Frontend Developer', 'Specializes in client-side development', 'role'),
('Backend Developer', 'Specializes in server-side development', 'role'),
('Full Stack Developer', 'Capable of end-to-end development', 'role'),
('DevOps Engineer', 'Specializes in deployment and infrastructure', 'role'),
('Data Engineer', 'Specializes in data infrastructure', 'role'),
('Machine Learning Engineer', 'Specializes in ML systems', 'role'),

-- Domains
('Web Development', 'Development of web applications', 'domain'),
('Mobile Development', 'Development of mobile applications', 'domain'),
('Cloud Computing', 'Development of cloud-based systems', 'domain'),
('Data Science', 'Analysis and modeling of data', 'domain'),
('Artificial Intelligence', 'Development of AI systems', 'domain'),
('Cybersecurity', 'Security of computer systems', 'domain');
