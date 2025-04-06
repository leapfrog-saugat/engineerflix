-- Clear existing data
DELETE FROM engineer_skills;
DELETE FROM engineer_subcategories;
DELETE FROM engineers;

-- Insert test engineers
WITH primary_cat_ids AS (
  SELECT id, name FROM primary_categories
)
INSERT INTO engineers (
  name,
  email,
  primary_category_id,
  years_of_experience,
  seniority_level,
  hourly_rate,
  availability_status,
  profile_image_url,
  video_url,
  github_url,
  linkedin_url,
  portfolio_url,
  bio,
  created_at,
  updated_at
)
SELECT 
  e.name,
  e.email,
  pc.id,
  e.years_of_experience,
  e.seniority_level,
  e.hourly_rate,
  e.availability_status,
  e.profile_image_url,
  e.video_url,
  e.github_url,
  e.linkedin_url,
  e.portfolio_url,
  e.bio,
  NOW(),
  NOW()
FROM (
  VALUES 
    (
      'Sarah Johnson',
      'sarah.johnson@example.com',
      'Frontend Development',
      5,
      'senior',
      120,
      'available',
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
      'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      'https://github.com/sarahjohnson',
      'https://linkedin.com/in/sarahjohnson',
      'https://sarahjohnson.dev',
      'Senior Frontend Engineer specializing in React and TypeScript with a passion for creating beautiful, accessible user interfaces.'
    ),
    (
      'Michael Chen',
      'michael.chen@example.com',
      'Frontend Development',
      3,
      'mid',
      90,
      'available',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
      'https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
      'https://github.com/michaelchen',
      'https://linkedin.com/in/michaelchen',
      'https://michaelchen.dev',
      'Mid-level Frontend Developer with expertise in Vue.js and modern CSS frameworks.'
    ),
    (
      'David Rodriguez',
      'david.rodriguez@example.com',
      'Backend Development',
      8,
      'lead',
      150,
      'part-time',
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
      'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      'https://github.com/davidrodriguez',
      'https://linkedin.com/in/davidrodriguez',
      'https://davidrodriguez.dev',
      'Lead Backend Engineer with extensive experience in Node.js, Python, and cloud architecture.'
    ),
    (
      'Emily Kim',
      'emily.kim@example.com',
      'Backend Development',
      4,
      'mid',
      95,
      'available',
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
      'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
      'https://github.com/emilykim',
      'https://linkedin.com/in/emilykim',
      'https://emilykim.dev',
      'Backend Developer specializing in Go and microservices architecture.'
    ),
    (
      'James Wilson',
      'james.wilson@example.com',
      'Full Stack Development',
      6,
      'senior',
      130,
      'available',
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
      'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
      'https://github.com/jameswilson',
      'https://linkedin.com/in/jameswilson',
      'https://jameswilson.dev',
      'Full Stack Developer with expertise in React, Node.js, and AWS.'
    ),
    (
      'Lisa Patel',
      'lisa.patel@example.com',
      'Full Stack Development',
      2,
      'junior',
      70,
      'available',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop',
      'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
      'https://github.com/lisapatel',
      'https://linkedin.com/in/lisapatel',
      'https://lisapatel.dev',
      'Junior Full Stack Developer with a strong foundation in JavaScript and Python.'
    ),
    (
      'Robert Taylor',
      'robert.taylor@example.com',
      'DevOps Engineering',
      7,
      'senior',
      140,
      'available',
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop',
      'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
      'https://github.com/roberttaylor',
      'https://linkedin.com/in/roberttaylor',
      'https://roberttaylor.dev',
      'DevOps Engineer specializing in Kubernetes, AWS, and CI/CD pipelines.'
    ),
    (
      'Sophia Lee',
      'sophia.lee@example.com',
      'DevOps Engineering',
      3,
      'mid',
      85,
      'unavailable',
      'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&h=400&fit=crop',
      'https://storage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4',
      'https://github.com/sophialee',
      'https://linkedin.com/in/sophialee',
      'https://sophialee.dev',
      'DevOps Engineer with expertise in Docker, Terraform, and monitoring solutions.'
    )
) AS e(name, email, category_name, years_of_experience, seniority_level, hourly_rate, availability_status, profile_image_url, video_url, github_url, linkedin_url, portfolio_url, bio)
JOIN primary_cat_ids pc ON pc.name = e.category_name;

-- Insert engineer skills
WITH engineer_ids AS (
  SELECT id, email FROM engineers
)
INSERT INTO engineer_skills (
  engineer_id,
  skill_name,
  proficiency_level,
  years_of_experience
)
SELECT 
  e.id,
  s.skill_name,
  s.proficiency_level,
  s.years_of_experience
FROM engineer_ids e,
(VALUES 
  ('sarah.johnson@example.com', 'JavaScript', 5, 5),
  ('sarah.johnson@example.com', 'TypeScript', 5, 4),
  ('sarah.johnson@example.com', 'React', 5, 4),
  ('sarah.johnson@example.com', 'Next.js', 4, 3),
  ('sarah.johnson@example.com', 'CSS', 5, 5),
  ('sarah.johnson@example.com', 'HTML', 5, 5),
  
  ('michael.chen@example.com', 'JavaScript', 4, 3),
  ('michael.chen@example.com', 'Vue.js', 4, 2),
  ('michael.chen@example.com', 'CSS', 4, 3),
  ('michael.chen@example.com', 'HTML', 4, 3),
  ('michael.chen@example.com', 'Tailwind CSS', 4, 2),
  
  ('david.rodriguez@example.com', 'Node.js', 5, 7),
  ('david.rodriguez@example.com', 'Python', 5, 6),
  ('david.rodriguez@example.com', 'AWS', 5, 5),
  ('david.rodriguez@example.com', 'Docker', 5, 5),
  ('david.rodriguez@example.com', 'PostgreSQL', 5, 6),
  ('david.rodriguez@example.com', 'MongoDB', 4, 4),
  
  ('emily.kim@example.com', 'Go', 4, 3),
  ('emily.kim@example.com', 'Docker', 4, 3),
  ('emily.kim@example.com', 'Kubernetes', 3, 2),
  ('emily.kim@example.com', 'gRPC', 4, 2),
  ('emily.kim@example.com', 'PostgreSQL', 4, 3),
  
  ('james.wilson@example.com', 'JavaScript', 5, 5),
  ('james.wilson@example.com', 'React', 5, 4),
  ('james.wilson@example.com', 'Node.js', 5, 5),
  ('james.wilson@example.com', 'AWS', 4, 3),
  ('james.wilson@example.com', 'Docker', 4, 3),
  ('james.wilson@example.com', 'PostgreSQL', 4, 4),
  
  ('lisa.patel@example.com', 'JavaScript', 3, 2),
  ('lisa.patel@example.com', 'React', 3, 1),
  ('lisa.patel@example.com', 'Node.js', 3, 1),
  ('lisa.patel@example.com', 'Python', 3, 2),
  ('lisa.patel@example.com', 'HTML', 4, 2),
  ('lisa.patel@example.com', 'CSS', 4, 2),
  
  ('robert.taylor@example.com', 'Kubernetes', 5, 5),
  ('robert.taylor@example.com', 'AWS', 5, 6),
  ('robert.taylor@example.com', 'Docker', 5, 5),
  ('robert.taylor@example.com', 'Terraform', 5, 4),
  ('robert.taylor@example.com', 'Jenkins', 5, 4),
  ('robert.taylor@example.com', 'Prometheus', 4, 3),
  
  ('sophia.lee@example.com', 'Docker', 4, 3),
  ('sophia.lee@example.com', 'Terraform', 4, 2),
  ('sophia.lee@example.com', 'AWS', 4, 2),
  ('sophia.lee@example.com', 'Grafana', 4, 2),
  ('sophia.lee@example.com', 'ELK Stack', 3, 2)
) AS s(email, skill_name, proficiency_level, years_of_experience)
WHERE e.email = s.email;

-- Insert engineer subcategories
WITH engineer_ids AS (
  SELECT id, email FROM engineers
)
INSERT INTO engineer_subcategories (
  engineer_id,
  subcategory_id,
  is_primary
)
SELECT 
  e.id,
  s.id,
  true
FROM engineer_ids e
CROSS JOIN LATERAL (
  SELECT id FROM subcategories 
  WHERE name IN (
    CASE e.email
      WHEN 'sarah.johnson@example.com' THEN 'Frontend Developer'
      WHEN 'michael.chen@example.com' THEN 'Frontend Developer'
      WHEN 'david.rodriguez@example.com' THEN 'Backend Developer'
      WHEN 'emily.kim@example.com' THEN 'Backend Developer'
      WHEN 'james.wilson@example.com' THEN 'Full Stack Developer'
      WHEN 'lisa.patel@example.com' THEN 'Full Stack Developer'
      WHEN 'robert.taylor@example.com' THEN 'DevOps Engineer'
      WHEN 'sophia.lee@example.com' THEN 'DevOps Engineer'
    END
  )
) s; 