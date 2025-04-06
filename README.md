# EngineerFlix

A platform for categorizing and managing engineering talent.

## Environment Setup

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Supabase account and project

### Environment Variables

1. Copy the example environment file:
```bash
cp .env.example .env
```

2. Update the `.env` file with your Supabase credentials:
- `SUPABASE_PROJECT_ID`: Your Supabase project ID
- `SUPABASE_URL`: Your Supabase project URL
- `SUPABASE_DB_PASSWORD`: Your database password
- `SUPABASE_ANON_KEY`: Your anon/public key
- `SUPABASE_SERVICE_ROLE_KEY`: Your service role key

3. Frontend and backend will automatically use these values from the root `.env` file.

### Development

1. Install dependencies:
```bash
# Install root dependencies
npm install

# Install frontend dependencies
cd frontend && npm install

# Install backend dependencies
cd backend && npm install
```

2. Start the development servers:
```bash
# Start frontend (from frontend directory)
npm run dev

# Start backend (from backend directory)
npm run dev
```

The frontend will be available at `http://localhost:3000` and the backend at `http://localhost:3001`.

## Project Structure

```
engineerflix/
├── .env                 # Main environment file (gitignored)
├── .env.example        # Environment template
├── frontend/           # Next.js frontend
│   └── .env.local     # Frontend-specific variables
└── backend/           # NestJS backend
    └── .env          # Backend-specific variables
```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT 