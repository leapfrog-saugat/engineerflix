import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import EngineerCard from '../EngineerCard';

const mockEngineer = {
  id: 1,
  name: 'Test Engineer',
  profile_image_url: 'https://example.com/image.jpg',
  years_of_experience: 5,
  availability_status: 'available',
  rating: 4.5,
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

describe('EngineerCard', () => {
  // Test existing functionality
  it('renders engineer information correctly', () => {
    render(<EngineerCard engineer={mockEngineer} />);
    expect(screen.getByText('Test Engineer')).toBeInTheDocument();
    expect(screen.getByText('Frontend Development')).toBeInTheDocument();
  });

  it('shows loading state when engineer is undefined', () => {
    render(<EngineerCard engineer={undefined} />);
    expect(screen.getByTestId('engineer-card-loading')).toBeInTheDocument();
  });

  it('shows skills on hover', () => {
    render(<EngineerCard engineer={mockEngineer} />);
    const card = screen.getByTestId('engineer-card');
    
    // Initial state - skills should be hidden
    const skillsContainer = screen.getByTestId('skills-container');
    expect(skillsContainer).toHaveClass('opacity-0');
    
    // Hover state - skills should be visible
    fireEvent.mouseEnter(card);
    expect(skillsContainer).toHaveClass('opacity-100');
    
    // Remove hover - skills should be hidden again
    fireEvent.mouseLeave(card);
    expect(skillsContainer).toHaveClass('opacity-0');
  });

  // Test new functionality
  it('displays years of experience badge', () => {
    render(<EngineerCard engineer={mockEngineer} />);
    expect(screen.getByText('5 YOE')).toBeInTheDocument();
  });

  it('shows availability status', () => {
    render(<EngineerCard engineer={mockEngineer} />);
    expect(screen.getByTestId('availability-status')).toHaveClass('bg-green-500');
  });

  it('displays rating correctly', () => {
    render(<EngineerCard engineer={mockEngineer} />);
    expect(screen.getByText('4.5')).toBeInTheDocument();
  });

  it('shows quick action buttons on hover', () => {
    render(<EngineerCard engineer={mockEngineer} />);
    const card = screen.getByTestId('engineer-card');
    
    // Initial state - action buttons should be hidden
    const actionButtons = screen.getByTestId('action-buttons');
    expect(actionButtons).toHaveClass('opacity-0');
    
    // Hover state - action buttons should be visible
    fireEvent.mouseEnter(card);
    expect(actionButtons).toHaveClass('opacity-100');
  });
}); 