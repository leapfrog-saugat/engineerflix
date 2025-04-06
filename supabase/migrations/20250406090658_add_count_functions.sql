-- Function to get subcategory counts
CREATE OR REPLACE FUNCTION get_subcategory_counts(category_id UUID)
RETURNS TABLE (
  id UUID,
  name TEXT,
  count BIGINT
) LANGUAGE sql AS $$
  SELECT 
    s.id,
    s.name,
    COUNT(*) as count
  FROM engineer_subcategories es
  INNER JOIN subcategories s ON es.subcategory_id = s.id
  INNER JOIN engineers e ON es.engineer_id = e.id
  WHERE e.primary_category_id = category_id
  GROUP BY s.id, s.name;
$$;

-- Function to get seniority level counts
CREATE OR REPLACE FUNCTION get_seniority_counts(category_id UUID)
RETURNS TABLE (
  seniority_level TEXT,
  count BIGINT
) LANGUAGE sql AS $$
  SELECT 
    seniority_level,
    COUNT(*) as count
  FROM engineers
  WHERE primary_category_id = category_id
  GROUP BY seniority_level;
$$;

-- Function to get skill counts
CREATE OR REPLACE FUNCTION get_skill_counts(category_id UUID)
RETURNS TABLE (
  skill_name TEXT,
  count BIGINT
) LANGUAGE sql AS $$
  SELECT 
    skill_name,
    COUNT(*) as count
  FROM engineer_skills es
  INNER JOIN engineers e ON es.engineer_id = e.id
  WHERE e.primary_category_id = category_id
  GROUP BY skill_name;
$$; 