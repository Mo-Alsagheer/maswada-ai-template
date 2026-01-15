# Maswada AI | تطبيق مسودة الذكي للإنتاجية

AI-powered note-taking application with bilingual support (English/Arabic) and RTL/LTR capabilities.

## Project Overview

Maswada AI is a modern note-taking application that leverages AI to enhance productivity. Users can create, edit, and organize notes with intelligent features like summarization, rewriting, and translation between English and Arabic.

### Key Features

- 🔐 **Secure Authentication** - Clerk-based user authentication
- 📝 **Notes Management** - Full CRUD operations for notes
- 🤖 **AI Features** (GPT-5-mini):
  - **Summarize** - Generate intelligent summaries
  - **Rewrite** - Improve text clarity, length, tone (4 modes: clearer, shorter, formal, casual)
  - **Translate** - Translate between English and Arabic
  - **💾 Save to Note** - Apply AI results directly to your note with one click
- 🌍 **Bilingual** - Full support for English and Arabic with react-intl
- ↔️ **RTL/LTR** - Automatic text direction switching based on language
- 🔍 **Auto Language Detection** - Automatically detects note language from content
- 🎨 **Modern UI** - Clean, responsive interface with Tailwind CSS v4
- 🔄 **Language Switcher** - Toggle UI language between English and Arabic

## Tech Stack

### Backend
- **Runtime**: Node.js + TypeScript
- **Framework**: Express.js
- **Database**: SQLite with Sequelize ORM
- **Authentication**: Clerk (token verification)
- **Validation**: Zod
- **AI**: OpenAI GPT-5-mini

### Frontend
- **Framework**: React 19 + TypeScript
- **Build Tool**: Vite
- **Routing**: React Router v7
- **Authentication**: Clerk
- **Styling**: Tailwind CSS v4
- **i18n**: react-intl with RTL support

## Project Structure

```
maswada-ai/
├── backend/           # Express.js API server
│   ├── src/
│   │   ├── config/    # Environment configuration
│   │   ├── db/        # Database setup and sync
│   │   ├── models/    # Sequelize models
│   │   ├── middlewares/ # Auth, error handling
│   │   ├── routes/    # API endpoints
│   │   ├── services/  # Business logic (notes, ai, openai)
│   │   ├── validators/ # Zod schemas
│   │   ├── app.ts     # Express app setup
│   │   └── server.ts  # Server entry point
│   └── package.json
│
├── frontend/          # React application
│   ├── src/
│   │   ├── components/ # Reusable components
│   │   ├── pages/     # Page components
│   │   ├── contexts/  # React contexts
│   │   ├── lib/       # API client, utilities
│   │   ├── i18n/      # Translation messages
│   │   ├── config/    # Frontend config
│   │   └── main.tsx   # Entry point
│   └── package.json
│
└── README.md          # This file
```

## Quick Start

### Prerequisites

- Node.js 18+ and npm
- Clerk account (free tier works)

### Backend Setup

1. Navigate to backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment:
   ```bash
   cp .env.example .env
   # Edit .env and add your CLERK_SECRET_KEY
   ```

4. Initialize database:
   ```bash
   npm run db:sync
   ```

5. Start development server:
   ```bash
   npm run dev
   ```

Backend will run on `http://localhost:3001`

### Frontend Setup

1. Navigate to frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment:
   ```bash
   cp .env.example .env
   # Edit .env and add your VITE_CLERK_PUBLISHABLE_KEY
   ```

4. Start development server:
   ```bash
   npm run dev
   ```

Frontend will run on `http://localhost:5173`

## Implementation Plan

The project is scaffolded with a phased implementation approach. Each phase builds upon the previous one.

### ✅ Phase A: Backend Foundation
**Status**: COMPLETED ✓

- [x] Express.js setup with TypeScript
- [x] Environment configuration (Clerk + OpenAI)
- [x] Sequelize + SQLite setup
- [x] Database models (Note)
- [x] Error handling middleware
- [x] CORS configuration
- [x] Database sync script ready

**Files**: `backend/src/{app.ts, server.ts, config/, db/, middlewares/errorHandler.ts}`

---

### ✅ Phase B: Authentication Middleware
**Status**: COMPLETED ✓

- [x] Clerk SDK installed
- [x] Auth middleware structure
- [x] Token verification implementation with Clerk SDK
- [x] Extract userId from JWT
- [x] Protect routes with auth middleware
- [x] Handle auth errors (401/403, expired tokens)
- [x] Test endpoint (`GET /api/auth/me`)

**Files**: `backend/src/middlewares/auth.ts`, `backend/src/routes/auth-test.ts`

**Completed**: Real JWT verification using `clerkClient.verifyToken()`. All protected routes now require valid Clerk authentication.

---

### ✅ Phase C: Notes CRUD + Validation
**Status**: COMPLETED ✓ (Ready for Testing with Frontend)

- [x] Zod validation schemas
- [x] Notes service layer
- [x] Notes routes (GET, POST, PATCH, DELETE)
- [x] userId scoping implemented in service layer
- [x] All endpoints protected by auth middleware

**Files**: `backend/src/{routes/notes.ts, services/notes.service.ts, validators/notes.schema.ts}`

**Testing Guide**: See `backend/TESTING.md` for API testing instructions.

---

### ✅ Phase D: AI Endpoints + OpenAI Integration
**Status**: COMPLETED ✓

- [x] OpenAI service with GPT-5-mini
- [x] AI service layer
- [x] AI routes (summarize, rewrite, translate)
- [x] Zod validation for AI requests
- [x] Direct OpenAI SDK integration (no abstraction needed)

**Files**: `backend/src/{routes/ai.ts, services/ai.service.ts, services/openai.service.ts, validators/ai.schema.ts}`

**Completed**: Using GPT-5-mini for all AI features. Ready to test once auth is implemented.

---

### ✅ Phase E: Frontend Routing + Clerk Integration
**Status**: COMPLETED ✓

- [x] Vite + React setup
- [x] Tailwind CSS v4 configuration
- [x] React Router v7 setup with routes
- [x] Clerk provider integration
- [x] Protected routes implementation
- [x] Layout components with navigation
- [x] Sign-in/sign-out buttons

**Files**: `frontend/src/{App.tsx, components/layouts/, components/auth/}`

---

### ✅ Phase F: Notes UI + API Integration
**Status**: COMPLETED ✓

- [x] API client with Clerk token integration
- [x] NotesPage with list, delete functionality
- [x] CreateNotePage with form validation
- [x] NoteDetailPage with edit capability
- [x] AI features integration (summarize, translate)
- [x] Loading and error states throughout

**Files**: `frontend/src/{lib/api-client.ts, hooks/useApiClient.ts, pages/}`

---

### ✅ Phase G: Internationalization (i18n) + RTL
**Status**: COMPLETED ✓

- [x] LocaleContext setup
- [x] Message structure (EN/AR)
- [x] Comprehensive translation messages for all UI text
- [x] Integrate react-intl
- [x] Language switcher component in header
- [x] RTL/LTR styling with `dir` attribute
- [x] All pages translated (Home, Notes, Create, Detail)
- [x] FormattedMessage components throughout

**Files**: `frontend/src/{contexts/LocaleContext.tsx, i18n/messages.ts, components/LanguageSwitcher.tsx}`

---

### ✅ Phase H: AI Features UI + Polish
**Status**: COMPLETED ✓

- [x] AI feature buttons in note detail page
- [x] Summarize note UI with translated button
- [x] Rewrite note with 4 mode selection (clearer, shorter, formal, casual)
- [x] Translate note between EN/AR
- [x] Display AI results with styled containers
- [x] Handle AI errors gracefully
- [x] Loading states for AI operations
- [x] Responsive design with flex-wrap
- [x] Dropdown menu for rewrite modes
- [x] Fully translated UI

**Files**: `frontend/src/pages/NoteDetailPage.tsx`

---

## API Documentation

### Public Endpoints

- `GET /health` - Health check

### Protected Endpoints (require Bearer token)

#### Notes
- `GET /api/notes` - List all notes for user
- `POST /api/notes` - Create new note
- `GET /api/notes/:id` - Get single note
- `PATCH /api/notes/:id` - Update note
- `DELETE /api/notes/:id` - Delete note

#### AI Features
- `POST /api/ai/summarize` - Summarize text or note
  ```json
  { "noteId": "uuid" | "text": "content", "language": "en" | "ar" }
  ```

- `POST /api/ai/rewrite` - Rewrite text in different style
  ```json
  { 
    "noteId": "uuid" | "text": "content",
    "mode": "shorter" | "clearer" | "formal" | "casual",
    "language": "en" | "ar"
  }
  ```

- `POST /api/ai/translate` - Translate between EN/AR
  ```json
  { 
    "noteId": "uuid" | "text": "content",
    "target": "en" | "ar"
  }
  ```

## Data Model

### Note
```typescript
{
  id: string;           // UUID
  userId: string;       // Clerk user ID
  title: string;
  content: string;
  language: 'en' | 'ar';
  summary: string | null;
  createdAt: Date;
  updatedAt: Date;
}
```

## Development Guidelines

### Backend
- All routes must verify Clerk tokens
- All database queries must filter by `userId`
- Use Zod for request validation
- Centralized error handling
- Keep business logic in service layer

### Frontend
- Use TypeScript strictly
- All API calls through `apiClient`
- Protected routes require authentication
- Support both EN/AR in all UI
- Responsive design (mobile-first)
- Accessible components

## Environment Variables

### Backend (.env)
```
PORT=3001
NODE_ENV=development
FRONTEND_ORIGIN=http://localhost:5173
CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
SQLITE_PATH=./data/maswada.db
OPENAI_API_KEY=sk-...
OPENAI_ORGANIZATION_ID=org-...  # Optional
```

### Frontend (.env)
```
VITE_CLERK_PUBLISHABLE_KEY=pk_test_...
VITE_API_BASE_URL=http://localhost:3001
```

## Production Deployment

### Backend
1. Build TypeScript: `npm run build`
2. Set production environment variables
3. Run database sync: `npm run db:sync`
4. Start server: `npm start`

### Frontend
1. Build for production: `npm run build`
2. Serve `dist/` directory with static file server
3. Ensure environment variables are set at build time

## Contributing

This is a capstone project. Follow the phased implementation plan and mark TODOs as you complete them.

## License

MIT

---

**Current Status**: 
- ✅ Phase A (Backend Foundation) - COMPLETE
- ✅ Phase B (Authentication) - COMPLETE  
- ✅ Phase C (Notes CRUD) - COMPLETE
- ✅ Phase D (AI Integration GPT-5-mini) - COMPLETE
- ✅ Phase E (Frontend Routing + Clerk) - COMPLETE
- ✅ Phase F (Notes UI + API Integration) - COMPLETE
- ✅ Phase G (i18n/RTL with react-intl) - COMPLETE
- ✅ Phase H (AI Features UI with Rewrite + Polish) - COMPLETE

**🎉 100% COMPLETE - ALL PHASES DONE! 🎉**

**Features**:
- ✅ Full CRUD for notes with Clerk authentication
- ✅ AI features: Summarize, Rewrite (4 modes), Translate
- ✅ Bilingual UI (English/Arabic) with language switcher
- ✅ RTL/LTR automatic text direction
- ✅ Responsive, accessible, modern design
- ✅ Both backend and frontend fully implemented and functional!
