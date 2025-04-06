-- Frontend Development Engineers
DO $$
DECLARE
    frontend_id UUID;
    engineer_id UUID;
BEGIN
    SELECT id INTO frontend_id FROM primary_categories WHERE name = 'Frontend Development';

    -- Frontend Engineers
    INSERT INTO engineers (name, email, primary_category_id, years_of_experience, seniority_level, hourly_rate, availability_status, bio)
    VALUES
    ('Alex Thompson', 'alex.t.frontend@example.com', frontend_id, 8, 'senior', 120, 'available', 'Senior frontend engineer specializing in React and modern JavaScript. Expert in building scalable web applications with focus on performance and accessibility.'),
    ('Nina Rodriguez', 'nina.r.frontend@example.com', frontend_id, 3, 'mid', 85, 'available', 'Frontend developer with strong UI/UX background. Passionate about creating beautiful, responsive web interfaces.'),
    ('Marcus Chen', 'marcus.c.frontend@example.com', frontend_id, 12, 'lead', 150, 'part-time', 'Lead frontend engineer with extensive experience in enterprise applications. Expert in Angular and TypeScript.'),
    ('Sophia Patel', 'sophia.p.frontend@example.com', frontend_id, 2, 'junior', 60, 'available', 'Junior frontend developer with a keen eye for design. Proficient in modern CSS and JavaScript frameworks.'),
    ('Lucas Kim', 'lucas.k.frontend@example.com', frontend_id, 6, 'senior', 110, 'available', 'Senior frontend engineer focused on web performance optimization and progressive web apps.'),
    ('Emma Wilson', 'emma.w.frontend@example.com', frontend_id, 4, 'mid', 90, 'available', 'Frontend specialist with expertise in Vue.js and state management. Strong advocate for clean code practices.'),
    ('Raj Sharma', 'raj.s.frontend@example.com', frontend_id, 15, 'principal', 180, 'part-time', 'Principal frontend architect with extensive experience in large-scale applications and team leadership.'),
    ('Isabella Martinez', 'isabella.m.frontend@example.com', frontend_id, 1, 'junior', 55, 'available', 'Frontend developer specializing in modern JavaScript and CSS frameworks. Passionate about web accessibility.'),
    ('Thomas Anderson', 'thomas.a.frontend@example.com', frontend_id, 7, 'senior', 125, 'unavailable', 'Senior frontend engineer with expertise in WebGL and 3D visualizations.'),
    ('Hannah Lee', 'hannah.l.frontend@example.com', frontend_id, 5, 'mid', 95, 'available', 'Frontend developer specializing in React Native and cross-platform development.');

    -- Add skills for each frontend engineer
    FOR engineer_id IN (SELECT id FROM engineers WHERE primary_category_id = frontend_id ORDER BY created_at DESC LIMIT 10)
    LOOP
        INSERT INTO engineer_skills (engineer_id, skill_name, proficiency_level, years_of_experience)
        SELECT engineer_id, skill_name, 
               CASE 
                   WHEN random() < 0.3 THEN floor(random() * 2 + 1)::int  -- 30% chance of 1-2
                   WHEN random() < 0.6 THEN floor(random() * 2 + 3)::int  -- 30% chance of 3-4
                   ELSE 5::int                                            -- 40% chance of 5
               END,
               CASE 
                   WHEN random() < 0.3 THEN floor(random() * 2 + 1)::int  -- 30% chance of 1-2
                   WHEN random() < 0.6 THEN floor(random() * 3 + 3)::int  -- 30% chance of 3-5
                   ELSE floor(random() * 5 + 6)::int                      -- 40% chance of 6-10
               END
        FROM (
            VALUES 
            ('JavaScript'),
            ('TypeScript'),
            ('React.js'),
            ('Vue.js'),
            ('Angular'),
            ('HTML5'),
            ('CSS3'),
            ('Sass/SCSS'),
            ('Webpack'),
            ('Jest'),
            ('Redux'),
            ('GraphQL'),
            ('Next.js'),
            ('Tailwind CSS')
        ) AS skills(skill_name)
        WHERE random() < 0.7;  -- 70% chance of having each skill
    END LOOP;
END $$;

-- Backend Development Engineers
DO $$
DECLARE
    backend_id UUID;
    engineer_id UUID;
BEGIN
    SELECT id INTO backend_id FROM primary_categories WHERE name = 'Backend Development';

    -- Backend Engineers
    INSERT INTO engineers (name, email, primary_category_id, years_of_experience, seniority_level, hourly_rate, availability_status, bio)
    VALUES
    ('David Zhang', 'david.z.backend@example.com', backend_id, 10, 'lead', 160, 'available', 'Lead backend engineer specializing in distributed systems and microservices architecture.'),
    ('Sarah Johnson', 'sarah.j.backend@example.com', backend_id, 4, 'mid', 95, 'available', 'Backend developer with strong focus on API design and database optimization.'),
    ('Miguel Torres', 'miguel.t.backend@example.com', backend_id, 8, 'senior', 130, 'part-time', 'Senior backend engineer experienced in high-load systems and real-time processing.'),
    ('Priya Patel', 'priya.p.backend@example.com', backend_id, 2, 'junior', 65, 'available', 'Backend developer passionate about clean architecture and test-driven development.'),
    ('James Wilson', 'james.w.backend@example.com', backend_id, 15, 'principal', 190, 'unavailable', 'Principal backend architect with expertise in cloud infrastructure and system design.'),
    ('Emily Brown', 'emily.b.backend@example.com', backend_id, 6, 'senior', 120, 'available', 'Senior backend engineer specializing in security and authentication systems.'),
    ('Liam O''Connor', 'liam.o.backend@example.com', backend_id, 3, 'mid', 85, 'available', 'Backend developer focused on building scalable REST APIs and microservices.'),
    ('Yuki Tanaka', 'yuki.t.backend@example.com', backend_id, 7, 'senior', 140, 'part-time', 'Senior backend engineer with expertise in performance optimization and caching strategies.'),
    ('Ana Silva', 'ana.s.backend@example.com', backend_id, 1, 'junior', 60, 'available', 'Backend developer with strong foundation in algorithms and data structures.'),
    ('Mohammed Ahmed', 'mohammed.a.backend@example.com', backend_id, 5, 'mid', 100, 'available', 'Backend engineer specializing in event-driven architectures and message queues.');

    -- Add skills for each backend engineer
    FOR engineer_id IN (SELECT id FROM engineers WHERE primary_category_id = backend_id ORDER BY created_at DESC LIMIT 10)
    LOOP
        INSERT INTO engineer_skills (engineer_id, skill_name, proficiency_level, years_of_experience)
        SELECT engineer_id, skill_name, 
               CASE 
                   WHEN random() < 0.3 THEN floor(random() * 2 + 1)::int
                   WHEN random() < 0.6 THEN floor(random() * 2 + 3)::int
                   ELSE 5::int
               END,
               CASE 
                   WHEN random() < 0.3 THEN floor(random() * 2 + 1)::int
                   WHEN random() < 0.6 THEN floor(random() * 3 + 3)::int
                   ELSE floor(random() * 5 + 6)::int
               END
        FROM (
            VALUES 
            ('Node.js'),
            ('Python'),
            ('Java'),
            ('Go'),
            ('PostgreSQL'),
            ('MongoDB'),
            ('Redis'),
            ('Docker'),
            ('Kubernetes'),
            ('AWS'),
            ('REST APIs'),
            ('GraphQL'),
            ('Microservices'),
            ('System Design')
        ) AS skills(skill_name)
        WHERE random() < 0.7;
    END LOOP;
END $$;

-- DevOps Engineers
DO $$
DECLARE
    devops_id UUID;
    engineer_id UUID;
BEGIN
    SELECT id INTO devops_id FROM primary_categories WHERE name = 'DevOps Engineering';

    -- DevOps Engineers
    INSERT INTO engineers (name, email, primary_category_id, years_of_experience, seniority_level, hourly_rate, availability_status, bio)
    VALUES
    ('Ryan Murphy', 'ryan.m.devops@example.com', devops_id, 9, 'lead', 155, 'available', 'Lead DevOps engineer with extensive experience in cloud infrastructure and automation.'),
    ('Lisa Chen', 'lisa.c.devops@example.com', devops_id, 5, 'mid', 110, 'available', 'DevOps engineer specializing in continuous integration and deployment pipelines.'),
    ('Daniel Kim', 'daniel.k.devops@example.com', devops_id, 7, 'senior', 135, 'part-time', 'Senior DevOps engineer focused on infrastructure as code and cloud security.'),
    ('Maria Garcia', 'maria.g.devops@example.com', devops_id, 2, 'junior', 70, 'available', 'DevOps engineer with strong Linux administration and scripting skills.'),
    ('Oliver Schmidt', 'oliver.s.devops@example.com', devops_id, 12, 'principal', 175, 'available', 'Principal DevOps architect specializing in large-scale cloud migrations.'),
    ('Aisha Patel', 'aisha.p.devops@example.com', devops_id, 4, 'mid', 95, 'available', 'DevOps engineer with expertise in monitoring and observability tools.'),
    ('Chris Anderson', 'chris.a.devops@example.com', devops_id, 8, 'senior', 145, 'unavailable', 'Senior DevOps engineer specializing in container orchestration and microservices.'),
    ('Sophie Martin', 'sophie.m.devops@example.com', devops_id, 3, 'mid', 90, 'available', 'DevOps engineer focused on site reliability and incident response.'),
    ('Kevin Lee', 'kevin.l.devops@example.com', devops_id, 6, 'senior', 130, 'part-time', 'Senior DevOps engineer with strong background in network security and compliance.'),
    ('Elena Popov', 'elena.p.devops@example.com', devops_id, 1, 'junior', 65, 'available', 'DevOps engineer passionate about automation and infrastructure optimization.');

    -- Add skills for each DevOps engineer
    FOR engineer_id IN (SELECT id FROM engineers WHERE primary_category_id = devops_id ORDER BY created_at DESC LIMIT 10)
    LOOP
        INSERT INTO engineer_skills (engineer_id, skill_name, proficiency_level, years_of_experience)
        SELECT engineer_id, skill_name, 
               CASE 
                   WHEN random() < 0.3 THEN floor(random() * 2 + 1)::int
                   WHEN random() < 0.6 THEN floor(random() * 2 + 3)::int
                   ELSE 5::int
               END,
               CASE 
                   WHEN random() < 0.3 THEN floor(random() * 2 + 1)::int
                   WHEN random() < 0.6 THEN floor(random() * 3 + 3)::int
                   ELSE floor(random() * 5 + 6)::int
               END
        FROM (
            VALUES 
            ('AWS'),
            ('Azure'),
            ('GCP'),
            ('Kubernetes'),
            ('Docker'),
            ('Terraform'),
            ('Ansible'),
            ('Jenkins'),
            ('GitLab CI'),
            ('Prometheus'),
            ('ELK Stack'),
            ('Python'),
            ('Bash'),
            ('Linux')
        ) AS skills(skill_name)
        WHERE random() < 0.7;
    END LOOP;
END $$;

-- Mobile Development Engineers
DO $$
DECLARE
    mobile_id UUID;
    engineer_id UUID;
BEGIN
    SELECT id INTO mobile_id FROM primary_categories WHERE name = 'Mobile Development';

    -- Mobile Engineers
    INSERT INTO engineers (name, email, primary_category_id, years_of_experience, seniority_level, hourly_rate, availability_status, bio)
    VALUES
    ('Jake Williams', 'jake.w.mobile@example.com', mobile_id, 8, 'lead', 150, 'available', 'Lead mobile engineer with extensive experience in both iOS and Android development.'),
    ('Mia Johnson', 'mia.j.mobile@example.com', mobile_id, 4, 'mid', 95, 'available', 'Mobile developer specializing in native iOS development and SwiftUI.'),
    ('Arun Patel', 'arun.p.mobile@example.com', mobile_id, 6, 'senior', 125, 'part-time', 'Senior Android developer focused on material design and app performance.'),
    ('Grace Liu', 'grace.l.mobile@example.com', mobile_id, 2, 'junior', 70, 'available', 'Mobile developer with experience in React Native and cross-platform development.'),
    ('Tom Anderson', 'tom.a.mobile@example.com', mobile_id, 10, 'principal', 170, 'unavailable', 'Principal mobile architect specializing in app architecture and team leadership.'),
    ('Sara Kim', 'sara.k.mobile@example.com', mobile_id, 5, 'mid', 100, 'available', 'Mobile engineer with expertise in Flutter and cross-platform solutions.'),
    ('Michael Brown', 'michael.b.mobile@example.com', mobile_id, 7, 'senior', 135, 'available', 'Senior iOS developer specializing in AR/VR applications.'),
    ('Julia Santos', 'julia.s.mobile@example.com', mobile_id, 3, 'mid', 85, 'available', 'Mobile developer focused on app optimization and user experience.'),
    ('Hassan Ahmed', 'hassan.a.mobile@example.com', mobile_id, 9, 'senior', 145, 'part-time', 'Senior Android developer with expertise in Kotlin and Jetpack Compose.'),
    ('Emma Wilson', 'emma.w.mobile@example.com', mobile_id, 1, 'junior', 65, 'available', 'Mobile developer passionate about creating engaging user interfaces.');

    -- Add skills for each mobile engineer
    FOR engineer_id IN (SELECT id FROM engineers WHERE primary_category_id = mobile_id ORDER BY created_at DESC LIMIT 10)
    LOOP
        INSERT INTO engineer_skills (engineer_id, skill_name, proficiency_level, years_of_experience)
        SELECT engineer_id, skill_name, 
               CASE 
                   WHEN random() < 0.3 THEN floor(random() * 2 + 1)::int
                   WHEN random() < 0.6 THEN floor(random() * 2 + 3)::int
                   ELSE 5::int
               END,
               CASE 
                   WHEN random() < 0.3 THEN floor(random() * 2 + 1)::int
                   WHEN random() < 0.6 THEN floor(random() * 3 + 3)::int
                   ELSE floor(random() * 5 + 6)::int
               END
        FROM (
            VALUES 
            ('Swift'),
            ('SwiftUI'),
            ('Objective-C'),
            ('Kotlin'),
            ('Java Android'),
            ('React Native'),
            ('Flutter'),
            ('Firebase'),
            ('iOS Development'),
            ('Android Development'),
            ('Mobile UI Design'),
            ('App Performance'),
            ('Mobile Security'),
            ('Mobile Testing')
        ) AS skills(skill_name)
        WHERE random() < 0.7;
    END LOOP;
END $$; 