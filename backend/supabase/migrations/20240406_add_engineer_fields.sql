-- Add new columns to engineers table
ALTER TABLE engineers
ADD COLUMN IF NOT EXISTS profile_video_url TEXT,
ADD COLUMN IF NOT EXISTS rating DECIMAL(3,2) CHECK (rating >= 0 AND rating <= 5);

-- Update existing engineers with default values if needed
UPDATE engineers 
SET rating = 4.5 
WHERE rating IS NULL;

-- Add comments for documentation
COMMENT ON COLUMN engineers.profile_video_url IS 'URL to the engineer''s profile video';
COMMENT ON COLUMN engineers.rating IS 'Engineer''s rating from 0 to 5'; 