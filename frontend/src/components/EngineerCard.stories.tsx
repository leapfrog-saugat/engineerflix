import type { Meta, StoryObj } from '@storybook/react';
import EngineerCard from './EngineerCard';

const meta = {
  title: 'Components/EngineerCard',
  component: EngineerCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof EngineerCard>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockEngineer = {
  id: 1,
  name: 'Jane Smith',
  email: 'jane.smith@example.com',
  profile_image_url: 'https://example.com/image.jpg',
  years_of_experience: 5,
  availability_status: 'available',
  rating: 4.5,
  primary_category_id: 1,
  seniority_level: 'senior',
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
  skills: [
    { skill_name: 'React' },
    { skill_name: 'TypeScript' },
    { skill_name: 'Node.js' },
    { skill_name: 'Python' }
  ],
  subcategories: [
    {
      is_primary: true,
      subcategory: {
        name: 'Frontend Development'
      }
    }
  ]
};

export const Default: Story = {
  args: {
    engineer: mockEngineer,
  },
};

export const Loading: Story = {
  args: {
    engineer: undefined,
  },
};

export const WithVideo: Story = {
  args: {
    engineer: {
      ...mockEngineer,
      profile_video_url: 'https://example.com/video.mp4',
    },
  },
};

export const Unavailable: Story = {
  args: {
    engineer: {
      ...mockEngineer,
      availability_status: 'unavailable',
    },
  },
};

export const HighRating: Story = {
  args: {
    engineer: {
      ...mockEngineer,
      rating: 5.0,
    },
  },
};

export const JuniorEngineer: Story = {
  args: {
    engineer: {
      ...mockEngineer,
      years_of_experience: 1,
      seniority_level: 'junior',
    },
  },
}; 