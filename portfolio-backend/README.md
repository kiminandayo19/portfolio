# Portfolio Backend API

Backend API for dynamic portfolio content management using Express.js and Supabase.

## 🚀 Features

- RESTful API for portfolio content management
- CRUD operations for Profile, Experiences, Projects, and Skills
- Supabase (PostgreSQL) database integration
- Input validation and sanitization
- Error handling with safe error messages
- CORS and security headers (Helmet)
- TypeScript support
- Unit testing with Jest

## 📋 Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account and project

## 🛠️ Installation

1. Clone the repository and navigate to the backend folder:
   ```bash
   cd portfolio-backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create environment file:
   ```bash
   cp .env.example .env
   ```

4. Update `.env` with your Supabase credentials:
   ```env
   PORT=3001
   NODE_ENV=development
   SUPABASE_URL=https://your-project.supabase.co
   SUPABASE_ANON_KEY=your-anon-key
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
   CORS_ORIGIN=http://localhost:3000
   ```

5. Create database tables in Supabase:
   - Go to your Supabase project SQL Editor
   - Run the contents of `supabase-schema.sql`

## 🏃 Running the Server

### Development
```bash
npm run dev
```

### Production
```bash
npm run build
npm start
```

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests with watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## 📚 API Endpoints

### Profile
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/profile` | Get profile data |
| PUT | `/api/profile` | Update profile data |

### Experiences
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/experiences` | List all experiences |
| GET | `/api/experiences/:id` | Get single experience |
| POST | `/api/experiences` | Create experience |
| PUT | `/api/experiences/:id` | Update experience |
| DELETE | `/api/experiences/:id` | Delete experience |

### Projects
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/projects` | List all projects |
| GET | `/api/projects/:id` | Get single project |
| POST | `/api/projects` | Create project |
| PUT | `/api/projects/:id` | Update project |
| DELETE | `/api/projects/:id` | Delete project |

### Skills
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/skills` | List all skill categories |
| GET | `/api/skills/:id` | Get single skill category |
| POST | `/api/skills` | Create skill category |
| PUT | `/api/skills/:id` | Update skill category |
| DELETE | `/api/skills/:id` | Delete skill category |

### Health Check
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | API health status |

## 📁 Project Structure

```
portfolio-backend/
├── src/
│   ├── config/           # Configuration files
│   ├── controllers/      # Request handlers
│   ├── middlewares/      # Express middlewares
│   ├── routes/           # API route definitions
│   ├── services/         # Business logic
│   ├── types/            # TypeScript interfaces
│   ├── utils/            # Utility functions
│   └── app.ts            # Express app entry
├── tests/                # Unit tests
├── .env.example          # Environment template
├── supabase-schema.sql   # Database schema
└── package.json
```

## 🔐 Security

- All secrets stored in environment variables
- Input validation on all endpoints
- Error messages don't leak internal details in production
- CORS configured for specific origins
- Helmet security headers enabled
- Row Level Security (RLS) enabled in Supabase

## 📝 License

ISC
