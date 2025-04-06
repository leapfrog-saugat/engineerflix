-- First, ensure we have the Software Engineering discipline
INSERT INTO engineering_disciplines (name, description)
VALUES ('Software Engineering', 'Development of software systems and applications')
ON CONFLICT (name) DO NOTHING;

-- Then, get the Software Engineering discipline ID
WITH software_eng AS (
    SELECT id FROM engineering_disciplines WHERE name = 'Software Engineering'
)
-- Insert primary categories if they don't exist
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
) AS categories(category_name, category_description)
ON CONFLICT (discipline_id, name) DO NOTHING; 