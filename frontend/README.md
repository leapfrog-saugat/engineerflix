# EngineerFlix Frontend

A Netflix-style platform for discovering engineering talent, built with Next.js and TypeScript.

## Features

- Netflix-style UI/UX
- Video player with autoplay and controls
- Engineer profiles and portfolios
- Responsive design
- Real-time search and filtering

## Tech Stack

- Next.js 14
- TypeScript
- Tailwind CSS
- Supabase Client

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/engineerflix-frontend.git
cd engineerflix-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
# Edit .env.local with your Supabase credentials
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

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
- `npm run lint`: Run ESLint
- `npm run test`: Run tests

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT
