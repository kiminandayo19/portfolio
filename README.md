# Portfolio Project Ecosystem

This repository contains the complete ecosystem for the personal portfolio project, consisting of a public-facing website, a content management system (CMS), and a robust backend API.

## Project Structure

The codebase is organized into three main directories, each serving a distinct purpose:

### 1. **Portfolio Website** (`/portfolio`)
The main public-facing portfolio website designed to showcase skills, projects, and experience.
*   **Tech Stack**: Next.js 16 (App Router), React 19, Material UI (MUI) v6, Framer Motion.
*   **Key Features**:
    *   Modern macOS-inspired UI ("Tahoe" aesthetic).
    *   Glassmorphism effects.
    *   Dark mode support (System preference detection).
    *   Scroll animations and interactive elements.

### 2. **Portfolio CMS** (`/portfolio-cms`)
An internal dashboard for managing portfolio content dynamically without code changes.
*   **Tech Stack**: Next.js 16, React 19, Material UI, React Hook Form, Zod.
*   **Key Features**:
    *   Data management for Profiles, Experiences, Projects, and Skills.
    *   Secure integration with the backend API.
    *   Form validation and error handling.

### 3. **Backend API** (`/portfolio-backend`)
The data layer serving both the frontend and CMS.
*   **Tech Stack**: Express.js, TypeScript, Supabase.
*   **Key Features**:
    *   RESTful API endpoints.
    *   Supabase integration for database and authentication.
    *   Security middleware (Helmet, CORS).
    *   Unit testing with Jest (>80% coverage).

---

## Getting Started

### Prerequisites
*   Node.js (v20+ recommended)
*   npm or yarn

### Installation & Running

#### Portfolio Website
```bash
cd portfolio
npm install
npm run dev
# Runs on localhost:4000
```

#### Portfolio CMS
```bash
cd portfolio-cms
npm install
npm run dev
# Runs on localhost:3000
```

#### Backend API
```bash
cd portfolio-backend
npm install
npm run dev
# Runs on localhost:5000 (default)
```

---

## Architecture & Standards

### Software Architecture
The project follows a strict layered architecture to ensure scalability and maintainability.
*   **Frontend**: Atomic Design (Atoms, Molecules, Organisms) within `src/components`.
*   **Backend**: 3-Layer Architecture (Controllers -> Services -> Models).

### Engineering Rules
1.  **Pure Functional Programming**: Immutability, pure functions, and no side effects.
2.  **DRY (Don't Repeat Yourself)**: Shared logic is abstracted into utilities or hooks.
3.  **Code Quality**:
    *   **Testing**: Mandatory unit tests with >80% coverage (Jest).
    *   **Linting**: Strict TypeScript and ESLint configurations.
    *   **Security**: Input sanitization, validation (Zod), and secure headers.
    *   **UI/UX**: Minimalist aesthetic with high attention to detail (spacing, typography, animations).

---

## Documentation
Refer to the following files for detailed guidelines:
*   `architecture.md` - Folder structure and architectural patterns.
*   `backend-architecture.md` - Backend specific guidelines.
*   `code-style.md` - Coding standards and functional programming rules.
*   `integration-dev.md` - API integration and Server Actions guidelines.
*   `security-rules.md` - Security checklist and vulnerability prevention.
*   `testing-rules.md` - Testing protocols and coverage requirements.
*   `ui-design.md` - UI/UX design system and palettes.
*   `workflow.md` - Developer SOP and change management.
*   `change-log.md` - History of changes and updates.

---

## License
[ISC](https://opensource.org/licenses/ISC)
