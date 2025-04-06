# EngineerCard Component

A reusable card component for displaying engineer profiles with hover interactions and video preview functionality.

## Features

- Thumbnail image/video preview
- Name and primary skill display
- Years of experience badge
- Availability status indicator
- Rating display
- Quick action buttons
- Hover state expansion
- Video autoplay on hover
- Lazy loading support
- Accessibility compliant

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| engineer | Engineer | Yes | Engineer data object containing profile information |

## Engineer Object Structure

```typescript
interface Engineer {
  id: string;
  name: string;
  email: string;
  profile_image_url: string;
  profile_video_url?: string;
  years_of_experience: number;
  availability_status: 'available' | 'unavailable';
  rating?: number;
  skills: { skill_name: string }[];
  subcategories: {
    is_primary: boolean;
    subcategory: {
      name: string;
    };
  }[];
}
```

## Usage

```tsx
import EngineerCard from './EngineerCard';

const MyComponent = () => {
  const engineer = {
    // ... engineer data
  };

  return <EngineerCard engineer={engineer} />;
};
```

## Testing

The component includes:
- Unit tests with Jest and React Testing Library
- UI tests with Playwright
- Visual regression tests
- Accessibility tests with axe-core

Run tests:
```bash
# Unit tests
npm test

# UI tests
npm run test:e2e

# Visual regression tests
npm run test:visual
```

## Storybook

View component variations in Storybook:
```bash
npm run storybook
```

Available stories:
- Default
- Loading
- With Video
- Unavailable
- High Rating
- Junior Engineer

## Accessibility

The component follows WCAG 2.1 guidelines and includes:
- ARIA labels for interactive elements
- Keyboard navigation support
- Color contrast compliance
- Screen reader friendly content

## Performance

- Lazy loaded images and videos
- Optimized hover interactions
- Bundle size optimized
- Minimal re-renders

## Contributing

1. Ensure all tests pass
2. Add stories for new features
3. Update documentation
4. Follow the project's code style
5. Submit a pull request 