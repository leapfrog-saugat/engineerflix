# EngineerFlix Backend

Backend API service for EngineerFlix, built with Node.js and Supabase.

## Features

- RESTful API endpoints
- Engineer profile management
- Authentication and authorization
- File upload handling
- Real-time updates

## Tech Stack

- Node.js
- TypeScript
- Supabase
- PostgreSQL
- Express.js

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/engineerflix-backend.git
cd engineerflix-backend
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your database and Supabase credentials
```

4. Start the development server:
```bash
npm run dev
```

The API will be available at `http://localhost:3001`.

## API Documentation

### Engineers

```typescript
GET /api/engineers - List all engineers
GET /api/engineers/:id - Get engineer by ID
POST /api/engineers - Create new engineer
PUT /api/engineers/:id - Update engineer
DELETE /api/engineers/:id - Delete engineer
```

### Authentication

```typescript
POST /api/auth/register - Register new user
POST /api/auth/login - Login user
POST /api/auth/logout - Logout user
GET /api/auth/me - Get current user
```

## Development Workflow

We follow the GitFlow branching model:

- `main`: Production-ready code
- `develop`: Development branch
- `feature/*`: New features
- `release/*`: Release preparation
- `hotfix/*`: Production fixes

### Creating a new feature:
```bash
git checkout develop
git pull origin develop
git checkout -b feature/your-feature-name
# Make your changes
git commit -m "feat: your changes"
git push origin feature/your-feature-name
```

## Available Scripts

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run start`: Start production server
- `npm run test`: Run tests
- `npm run lint`: Run ESLint
- `npm run migrate`: Run database migrations

## Database Schema

```sql
-- Engineers table
CREATE TABLE engineers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  specialty VARCHAR(255) NOT NULL,
  skills TEXT[] NOT NULL,
  rate VARCHAR(255),
  availability VARCHAR(255),
  video_url TEXT,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT
